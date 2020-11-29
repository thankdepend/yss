const base = require("../../reqApi/platfrom/base");
const stu = require("../../reqApi/app/stu");
const school = require('../../reqApi/platfrom/school')
const {
    common
} = require("../../lib/index");
const doc = require("../data/doc.json");
const account = require("../data/account");
const caps = require("../../data/caps");
const {
    apply
} = require("async");
const yysLogin = require('./yssLogin');
const {
    map
} = require("lodash");

class College {
    constructor() {

        /** 考试id*/
        this.kaoShiID = '';
        /** 考点id */
        this.kaoDianID = '';
        //（以上参数假设脚本只有1对多情况使用）

        /** 学校信息 */
        this.collegeMain = new CollegeMain();
        /** 学校map */
        this.collegeMap = new CollegeMap();
        /** 考试map */
        this.examMap = new Map()
    }

    /**
     * 保存院校（新增/修改）
     * @param {Object} params 外部参数
     */
    async saveCollege (params) {
        const saveCollegeInfo = await base.toAddCollege(params);
        let collParams = saveCollegeInfo.params;

        this.updateCollege(collParams);
        console.log("打印学校信息", saveCollegeInfo);
        return saveCollegeInfo;
    }

    /** 更新学校信息 */
    updateCollege (params) {
        common.update(this.schoolMain, params);
    }

    /** 查询院校列表 */
    async getCollegeList (params) {
        const res = await base.getCollegeList(params);
        console.log(res);
        return res;
    }

    /**
     * 搜索院校（考生）
     */
    async searchCollege (params = {}) {
        const searchContext = params.keyword || this.collegeMain.xueXiaoMC;
        const res = await stu.seekCollege({
            data: {
                m: "",
                p: {
                    keyword: searchContext,
                },
            },
            ticket: TICKET,
        }).then((res) => res.result.datas.list);
        const searchRes = res.find((obj) => obj.xueXiaoMC == searchContext);
        // console.log(searchRes);
        return searchRes;
    }

    /**
     * 搜索院校断言
     */
    async searchCollegeAssert () {
        const searshRes = await this.searchCollege();

        const searchExp = {
            xueXiaoID: searshRes.xueXiaoID,
            xueXiaoMC: searshRes.xueXiaoMC,
            schoolType: searshRes.schoolType, // 1为签约、2为非签约
            subscribeNum: searshRes.subscribeNum,
        };
        const searchActual = this.collegeMain;
        // console.log("期望值", searchExp);
        // console.log("实际值", searchActual);
        common.isApproximatelyEqualAssert(searchExp, searchActual);
    }

    /**
     * 保存院校专业
     */
    async saveBacthProfession () {
        await base.saveBacthProfession();
    }

    /**
     * 查询院校专业列表（考生用）
     */
    async getProfList (params) {
        const queryParams = Object.assign({
            data: {
                "m": "",
                "p": {
                    "xueXiaoID": this.collegeMain.xueXiaoID,
                    "baoKaoBZList": [1, 2, 3]
                    // 报考标志全填，展示所有
                }
            },
            ticket: TICKET
        }, params);
        const res = await stu.getProf(queryParams);
        console.log('专业', res);
    }

    /**
     * 查询考试（考生用）
     */
    async getProfList (params) {
        const queryExamSiteParams = Object.assign({
            data: {
                "m": "",
                "p": {
                    "xueXiaoID": this.collegeMain.xueXiaoID
                }
            },
            ticket: TICKET
        }, params);
        await stu.getExamSite(queryExamSiteParams);
    }



    /**
     * 查询考点（考生用）
     */
    async getSchoolSite (params) {
        const schoolSiteParams = Object.assign({
            data: {
                "m": "",
                "p": {
                    "xueXiaoID": this.collegeMain.xueXiaoID,
                    // "kaoShiId":
                }
            },
            ticket: TICKET
        }, params);
        await stu.getSchoolSite(schoolSiteParams);
    }


    /**
     * 院校常用专业库新增
     */
    async saveProfession () {
        const res = await base.saveBacthProfession();
        console.log(res);
    }

    /**
     * 查询院校常用专业库列表
     */
    async getProfessionInfoList (params) {
        const profList = await base.getprofessionInfoList(Object.assign({
            year: new Date().getFullYear(),
            currentFlag: 1,
            zhuanYeMC: '',
            curPage: 1,
            pageSize: 15,
            ticket: PLAT_TICKET,
        }, params));
        return profList;

    }


    /**
     * @alias (自动添加考试专业)
     * @alias 需要传考试，默认今年的考试
     * @alias 查询专业列表库
     * @alias 获取考试id/如果传递就不获取了
     * @alias 检查该考试有没有添加全部专业库为考试专业
     */
    async autoAddExamProf (kaoShiID) {
        let kaoShiId = kaoShiID || undefined, ksID;
        const pageRes = await this.getProfessionInfoList().then(res => res.result.datas);
        // 查询2次是为了获取全部专业
        const professionRes = await this.getProfessionInfoList({
            pageSize: pageRes.page.totalSize,
        }).then(res => res.result.datas.professionList);
        // console.log('列表',professionRes);

        if (kaoShiId != undefined) {
            ksID = kaoShiId
        } else {
            ksID = await school.getExamList({
                kaoShiND: new Date().getFullYear() + 1,
                ticket: PLAT_TICKET
            }).then(res => res.result.datas.page.dataList[0].kaoShiID)
            console.log(ksID);
        }
        for (let prof of professionRes) {
            // 查询考试专业列表
            let aExamProf = await school.getExamProfList({
                zhuanYeID: prof.zhuanYeID,
                kaoShiID: ksID,
                ticket: PLAT_TICKET
            });
            console.log(aExamProf.result.datas.page);
            if (aExamProf.result.datas.page.dataList.length == 0) {
                console.log(1);
                const examProf = await school.saveExamProfAdd({
                    kaoShiID: ksID, // 编辑要传
                    profType: 1,
                    profTypeId: 0,
                    zhuanYeID: prof.zhuanYeID,
                    ticket: PLAT_TICKET
                });
                console.log('保存考试专业', examProf);
            }
        }
        this.kaoShiID = ksID;
        await this._saveExamMap(ksID)

    }

    /**
     * 保存考试map
     * @alias 私有方法
     */
    async _saveExamMap (ksID) {
        // 加完考试专业的同时，我们需要把考试存起来
        const kaoShiDataList = await school.getExamList({
            kaoShiND: new Date().getFullYear() + 1,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList)
        let kaoShi = this.examMap.has(ksID) ? this.examMap.get(ksID) : new ExamMap();
        common.update(kaoShi, kaoShiDataList.find(obj => obj.kaoShiID == ksID))
        this.examMap.set(ksID, kaoShi)
        console.log('考试map', this.examMap);
    }

    /**
     * 查询考点
     */
    async getExamSite () {
        const res = await base.getsiteInfoList();
        return res
    }

    /**
     * 更新考点列表第一条为class的考点id
     */
    async updateExamSiteFirst () {
        const site = await this.getExamSite();
        this.kaoDianID = site.datas.page.dataList[0].kaoDianID
    }


    /**
     * @alias 自动添加报名时间
     * @alias 查询考试时间列表,没有就加一个,有就不加
     * @alias 自动添加报名时间
     * @alias 自动添加报名时间
     * @alias 自动添加报名时间
     * @alias 自动添加报名时间
     * @alias 自动添加报名时间
     */
    async autoAddApplyTime () {
        await this.updateExamSiteFirst();

        const siteList = await school.getsiteDataList({
            kaoShiID: this.kaoShiID,
            kaoDianID: this.kaoDianID,
            timeType: 0,
            timeState: 0,
            curPage: 1,
            pageSize: 15,
        })
        // 考点列表小于1个考点，新增一个考点，不然就不加
        if (siteList.datas.page.dataList.length < 1) {
            await school.saveExamSite();
        }

    }

    /**
     * 保存考试
     */
    async saveExam () {
        const monthArr = ['1-2月', '3-4月', '5-6月', '7-8月', '9-10月', '11-12月']
        const params = {
            kaoShiMC: `${new Date().getFullYear()}年本科招生`,
            kaoShiYF: `${monthArr[common.getRandomNum(1, monthArr.length)]}`,
            kaoShiND: new Date().getFullYear()
        };
        const res = await school.saveExam(Object.assign({
            // kaoShiID: , //编辑要传
            kaoShiMC: '2021年测试考试',
            kaoShiND: 2021, //  考试年度
            kaoShiYF: '1-2月', // 考试月份
            xianKaoZYS: 0, // 限考志愿数
            zhiYuanShu: 0, // 专业志愿限报数
            kaiTongBZ: 1, // 1为开通
            ticket: PLAT_TICKET
        }, params));
        console.log('保存考试', res);
    }
}

const collegeManage = module.exports = {};

/**
 * 初始化院校
 */
collegeManage.setupCollege = function () {
    return new College();
};

/** 
 * 初始化学校-列表已有数据
 */
collegeManage.setupCollegeByList = async function (params) {
    console.log('学校信息', params);
    let setupCollege = new College();
    let riChengMap = new Map();
    // 为初始化学校添加学校信息
    Object.assign(setupCollege.collegeMain, params)
    // 获取考点
    // const examSiteList = await stu.getExamSite(common.yssAppJson({
    //     xueXiaoID: setupCollege.collegeMain.xueXiaoID,
    // })).then(res => res.result.datas.list);

    // 获取日程
    const profList = await stu.getProf({
        data: {
            p: {
                xueXiaoID: setupCollege.collegeMain.xueXiaoID,
                baoKaoBZList: [1, 2, 3],
            },
            m: ""
        },
        ticket: TICKET,
    });

    // console.log('日程请求头', profList.params);
    // console.log('日程列表', profList);
    // console.log('日程列表响应', profList.result.datas.list);

    // 将日程存储起来（因为日程存在多个，所以用map存储）
    profList.result.datas.list.forEach(obj => {
        let riChengID = obj.riChengID;
        let riCheng = riChengMap.has(riChengID) ? riChengMap.get(riChengID) : new CollegeMap();
        common.update(riCheng, obj)
        riChengMap.set(riChengID, riCheng)
    })
    console.log(riChengMap);

    // 合并map
    let merged = new Map([...setupCollege.collegeMap, ...riChengMap]);
    // console.log('合并map', merged);
    setupCollege.collegeMap = merged;
    console.log('实例', setupCollege);
    return setupCollege;
};

/** 
 * 返回1个学校实例-列表查询结果
 * @param {Number} schoolID 学校id
 */
collegeManage.returnCollege = async function (schoolID) {
    let argv = require('yargs').argv,
        college;
    // 写死
    if (argv.envName == 'pre') {
        college = await base.getCollegeList({
            xueXiaoMH: schoolID ? schoolID : 45600,
            ticket: PLAT_TICKET,
        })
            .then((res) => res.result.datas.page);
    } else if (argv.envName == 'test') {
        // 查院校列表
        college = await base.getCollegeList({
            xueXiaoMH: schoolID ? schoolID : 13166,
            ticket: PLAT_TICKET,
        })
            .then((res) => res.result.datas.page);
    }

    // const num = common.getRandomNum(0, college.dataList.length - 1);
    // const newCollege = college.dataList[num];
    const newCollege = college.dataList[0];
    const data = await collegeManage.setupCollegeByList(newCollege);

    return data;
};

collegeManage.updateCollegeRiCheng = async function (RiChengID) {
    let college = getAsCollege.collegeMap.has(RiChengID) ? getAsCollege.collegeMap.get(RiChengID) : new CollegeMap();
};


/**
 * mock院校数据
 * @param {Object} params 覆盖参数
 */
collegeManage.collegeMockJson = function (params = {}) {
    const randomStr = common.getRandomStr(6),
        randomNum = common.getRandomNum(12000, 99999),
        randomImage = doc[caps.name].school[common.getRandomNum(0, doc.test.school.length)];

    let collegeJson = Object.assign({
        preSchoolType: 1,
        xueXiaoMH: randomNum, // 代号
        xueXiaoID: randomNum,
        xueXiaoMC: `中国美术学院-${randomStr}`,
        schoolType: 1, // 是否签约：1为签约，2为未签约
        hotFlag: 2, // 热门标签: 1为
        typeIds: 26,
        provChName: "浙江省",
        prov: 330000,
        cityChName: "杭州市",
        city: 330100,
        areaChName: "下城区",
        area: 330103,
        classId: 5,
        studentType: "1,2,3,4,5", // 学生类型
        initUser: "on", // 初始化用户，on为是
        // addr: ,
        // applyUrl: ,
        logo: `${randomImage}`,
        // subSystem: ,
        // sub: ,
        // orderNo: ,
        // mobileOrderNo: ,
        // siteConfirmType: ,
        ticket: PLAT_TICKET,
    },
        params
    );
    return collegeJson;
};

function CollegeMap () {
    /** 报考id */
    this.baoKaoID = '';
    /** 用户id */
    this.yongHuID = '';
    /** 考生id */
    this.kaoShengID = '';
    /** 证件类型 */
    this.zhengJianLX = '';
    /** 身份证号 */
    this.shenFenZH = '';
    /** 姓名 */
    this.xingMing = '';
    /** 准考证号 */
    this.zhunKaoZH = '';
    /** 学校id */
    this.xueXiaoID = '';
    /** 学校名称 */
    this.xueXiaoMC = '';
    /** 考试id */
    this.kaoShiID = '';
    /** 考试名称 */
    this.kaoShiMC = '';
    /** kaoDianID */
    this.kaoDianID = '';
    /** kaoDianMC */
    this.kaoDianMC = '';
    /** zhuanYeID */
    this.zhuanYeID = '';
    /** zhuanYeMC */
    this.zhuanYeMC = '';
    /** 日程id */
    this.riChengID = '';
    /** 考试日期 */
    this.kaoShiRQ = '';
    /** kaoShiRQSM */
    this.kaoShiRQSM = '';
    /** shenChaBTF */
    this.shenChaBTF = '';
    /** shengFenHao */
    this.shengFenHao = '';
    /** baoMingFei */
    this.baoMingFei = '';
    /** needQuestion */
    this.baoKaoBZ = '';
    /** queRenFS */
    this.queRenFS = '';
    /** queRenSJ */
    this.queRenSJ = '';
    /** zhiYuanShu */
    this.zhiYuanShu = '';
    /** xueXiaoMH */
    this.xueXiaoMH = '';
    /** shengFenMC */
    this.shengFenMC = '';
    /** xingBie */
    this.xingBie = '';
    /** tongXinDZ */
    this.tongXinDZ = '';
    /** tongXinYB */
    this.tongXinYB = '';
    /** shouJi */
    this.shouJi = '';
    /** kaoShengHao */
    this.kaoShengHao = '';
    /** examAppIndex */
    this.examAppIndex = '';
    /** mobileAuthFlag */
    this.mobileAuthFlag = '';
    /** wenLiKe */
    this.wenLiKe = '';
    /** videoCommitFlag */
    this.videoCommitFlag = '';
    /** platform */
    this.platform = '';
    /** year */
    this.year = '';
    /** stuMailFlag */
    this.stuMailFlag = '';
    /** examType */
    this.examType = '';
}

function ExamMap () {
    /** createdOn */
    this.createdOn = '';
    /** createdOnStr */
    this.createdOnStr = '';
    /** crossPiontStr */
    this.crossPiontStr = '';
    /** examSiteList */
    this.examSiteList = '';
    /** examTicketTitle */
    this.examTicketTitle = '';
    /** examType */
    this.examType = '';
    /** genOrgerNo */
    this.genOrgerNo = '';
    /** genOrgerNoStr */
    this.genOrgerNoStr = '';
    /** hideFlag */
    this.hideFlag = '';
    /** isCrossPiont */
    this.isCrossPiont = '';
    /** isGenOrderNo */
    this.isGenOrderNo = '';
    /** isLockFlag */
    this.isLockFlag = '';
    /** isProfReject */
    this.isProfReject = '';
    /** isSchedConflict */
    this.isSchedConflict = '';
    /** isUseRight */
    this.isUseRight = '';
    /** isnotLockFlag */
    this.isnotLockFlag = '';
    /** kaiTongBZ */
    this.kaiTongBZ = '';
    /** kaiTongBZStr */
    this.kaiTongBZStr = '';
    /** kaoShiID */
    this.kaoShiID = '';
    /** kaoShiMC */
    this.kaoShiMC = '';
    /** kaoShiND */
    this.kaoShiND = '';
    /** kaoShiYF */
    this.kaoShiYF = '';
    /** lockFlag */
    this.lockFlag = '';
    /** lockFlagStr */
    this.lockFlagStr = '';
    /** logo */
    this.logo = '';
    /** modifiedOn */
    this.modifiedOn = '';
    /** modifiedOnStr */
    this.modifiedOnStr = '';
    /** onScoreQuery */
    this.onScoreQuery = '';
    /** profRejectStr */
    this.profRejectStr = '';
    /** remark */
    this.remark = '';
    /** schedConflictStr */
    this.schedConflictStr = '';
    /** schoolType */
    this.schoolType = '';
    /** ticketNoticeRange */
    this.ticketNoticeRange = '';
    /** useRight */
    this.useRight = '';
    /** useRightStr */
    this.useRightStr = '';
    /** xianKaoZYS */
    this.xianKaoZYS = '';
    /** xianKaoZYSStr */
    this.xianKaoZYSStr = '';
    /** xueXiaoID */
    this.xueXiaoID = '';
    /** xueXiaoMC */
    this.xueXiaoMC = '';
    /** xueXiaoMH */
    this.xueXiaoMH = '';
    /** zhiYuanShu */
    this.zhiYuanShu = '';
    /** zhiYuanShuStr */
    this.zhiYuanShuStr = '';
    /** zhunKaoZZDY */
    this.zhunKaoZZDY = '';
    /** zhunKaoZZDYStr */
    this.zhunKaoZZDYStr = '';
}

class CollegeMain {
    constructor() {
        /** preSchoolType */
        this.preSchoolType = 0;
        /** 学校代号 */
        this.xueXiaoMH = 0;
        /** 学校id */
        this.xueXiaoID = 0;
        /** 学校名称 */
        this.xueXiaoMC = "";
        /** 签约标志 */
        this.schoolType = 0;
        /** 热门标签 */
        this.hotFlag = 0;
        /** 类型id */
        this.typeIds = 0;
        /** 省份名 */
        this.provChName = "";
        /** 省份编号 */
        this.prov = 0;
        /** 城市名称 */
        this.cityChName = "";
        /** 城市编号 */
        this.city = 0;
        /** 区名称 */
        this.areaChName = "";
        /** 区编号 */
        this.area = 0;
        /** 类别id */
        this.classId = 0;
        /** 学生类型 */
        this.studentType = "";
        /** 初始化用户标志 */
        this.initUser = "";
        /** 学校地址 */
        this.addr = "";
        /** 学校url */
        this.applyUrl = "";
        /** 学校logo */
        this.logo = "";
    }
}