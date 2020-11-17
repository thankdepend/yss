const base = require("../../reqApi/platfrom/base");
const stu = require("../../reqApi/app/stu");
const {
    common
} = require("../../lib/index");
const doc = require("../data/doc.json");
const account = require("../data/account");
const caps = require("../../data/caps");
const {
    apply
} = require("async");
const yysLogin = require('../help/yssLogin');
const {
    map
} = require("lodash");

class College {
    constructor() {
        // /** 商品id */
        // this.id = '';
        /** 学校信息 */
        this.collegeMain = new CollegeMain();
        /** collegeMap */
        this.collegeMap = new Map();
    }

    /**
     * 保存院校（新增/修改）
     * @param {*} params
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
        const res = await stu.getProf(params);
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
    async getprofessionInfoList () {
        const res = await base.getprofessionInfoList();
        return res;
    }
}

const collegeManage = module.exports = {};

collegeManage.setupCollege = function () {
    return new College();
};

/** 初始化学校-列表已有数据 */
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
 * @param schoolID 学校id
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

/**
 * mock院校数据
 * @param {*} params
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
    /** yongHuID */
    this.yongHuID = '';
    /** kaoShengID */
    this.kaoShengID = '';
    /** zhengJianLX */
    this.zhengJianLX = '';
    /** shenFenZH */
    this.shenFenZH = '';
    /** xingMing */
    this.xingMing = '';
    /** zhunKaoZH */
    this.zhunKaoZH = '';
    /** xueXiaoID */
    this.xueXiaoID = '';
    /** xueXiaoMC */
    this.xueXiaoMC = '';
    /** kaoShiID */
    this.kaoShiID = '';
    /** kaoShiMC */
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
    /** kaoShiRQ */
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

class CollegeMain {
    constructor() {
        /**  */
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
        /**  */
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
        /**  */
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