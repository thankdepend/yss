const {
    common
} = require('../lib/index');
const probApp = require('../reqApi/app/prob');
const prob = require('../reqApi/platfrom/prob');
const yssLogin = require('../project/help/base/yssLogin');
const provinceScoreLine = require('../reqApi/app/provinceScoreLine');



// 概率计算
class CalProb {
    constructor() {
        // 考生统考信息
        this.stuInfoMain = new StuInfoMain();
        // 考生校考信息
        this.schoolScoreList = new Array();
        // 院校专业统考主要信息
        this.schoolExamMain = new Object();
        // 分数线信息
        this.scoreLineMain = new ScoreLineMain();
        /** 替换公式 */
        this.formula = {
            S: '综合分',
            R: '文化分',
            W: '文化课满分',
            T: '考生校考专业课得分',
            P: '考生校考专业课满分',
            M: '考生校考专业考试合格线',
            U: '考生专业成绩',
            Q: '省统考满分',
            A: '普通类文科一批线',
            B: '普通类理科一批线',
            C: '普通类文科二批线',
            D: '普通类理科二批线',
            E: '英语成绩',
            F: '本批次相对最高分',
            G: '本批次合格线',
            I: '统考合格线',
            H: '文科-统考本科线',
            J: '文科-文化本科线',
            L: '文科-文化专科线',
            X: '文科-统考专科线',
            N: '理科-统考本科线',
            K: '理科-文化本科线',
            V: '理科-文化专科线',
            Y: '理科-统考专科线',
            Z: '专业分排名',
        }
    }

    // 计算校考概率
    async schoolCalculate () {
        // 替换公式为相应字段中的值
        await this.replaceFormula();
        let schoolFormulaRes;
        try {

            schoolFormulaRes = this.schoolExamMain.expression.replace(
                /[A-Z]/g,
                (...arg) => {
                    return this.formula[arg[0]]
                }
            )
        } catch (err) {
            throw new Error('投档或录取公式为空')
        }


        // 梯度志愿  (所有校考)

        // 如果录取公式是“综合分”
        if (this.schoolExamMain.enrollBasisType == 1) {
            // 如果录取最低分存在
            if (this.schoolExamMain.entrolScoreMin != '' || null) {
                console.log(1);
                const val = Number((0.4725 + Math.atan((eval(schoolFormulaRes) - this.schoolExamMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                return val;
            }
            // 如果预计录取最低分存在
            else if (this.schoolExamMain.preEnrollScoreMin != '' || null) {
                console.log(2);
                const val = Number((0.4725 + Math.atan((eval(schoolFormulaRes) - this.schoolExamMain.preEnrollScoreMin) / this.volDataMain.preEnrollScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                return val;
            } else {
                console.log('取上一年，这里不做计算');
            }
        }
        // 如果录取公式是"文化分"
        else if (this.schoolExamMain.enrollBasisType == 2) {
            // 如果录取最低分存在
            if (this.schoolExamMain.entrolScoreMin != '' || null) {
                console.log(3);
                const val = Number((0.4725 + Math.atan((eval(schoolFormulaRes) - this.schoolExamMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                return val;
            }
            // 如果预计录取最低分存在
            else if (this.schoolExamMain.preEnrollScoreMin != '' || null) {
                console.log(4);
                const val = Number((0.4725 + Math.atan((eval(schoolFormulaRes) - this.schoolExamMain.preEnrollScoreMin) / this.volDataMain.preEnrollScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                return val;
            } else {
                console.log('取上一年，这里不做计算');
            }
        }
        // 如果录取公式是"专业分"
        else if (this.schoolExamMain.enrollBasisType == 3) {
            // 如果录取最低分存在
            if (this.schoolExamMain.entrolScoreMin != '' || null) {
                console.log(5);
                const val = Number((0.4725 + Math.atan((eval(schoolFormulaRes) - this.schoolExamMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                return val;
            }
            // 如果预计录取最低分存在
            else if (this.schoolExamMain.preEnrollScoreMin != '' || null) {
                console.log(6);
                const val = Number((0.4725 + Math.atan((eval(schoolFormulaRes) - this.schoolExamMain.preEnrollScoreMin) / this.volDataMain.preEnrollScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                return val;
            } else {
                console.log('取上一年，这里不做计算');
            }
        }
        // 如果录取公式是"专业分排名"
        else if (this.schoolExamMain.enrollBasisType == 4) {
            // 如果录取最低位次存在
            if (this.volDataMain.entrolScoreMin != '' || null) {
                console.log(7);
                const val = Number((0.4725 - Math.atan((eval(schoolFormulaRes) - this.schoolExamMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                return val;
            }
            // 如果预计录取最低分存在
            else if (this.schoolExamMain.preEnrollScoreMin != '' || null) {
                console.log(8);
                const val = Number((0.4725 - Math.atan((eval(schoolFormulaRes) - this.schoolExamMain.preEnrollScoreMin) / this.volDataMain.preEnrollScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                return val;
            } else {
                console.log('取上一年，这里不做计算');
            }
        } else {
            console.log('其他计算方式');
        }


    }

    // 将注释替换成字段值(例如：U = collEntrExamScore = 10)
    async replaceFormula () {
        this.formula.R = this.stuInfoMain.collEntrExamScore;
        this.formula.U = this.stuInfoMain.jointExamScore;
        this.formula.Q = this.scoreLineMain.q;
        this.formula.W = this.scoreLineMain.w;
        this.formula.Z = this.stuInfoMain.jointRank;
        this.formula.T = this.schoolScoreList.find(obj => obj.expressionId == this.schoolExamMain.id).schoolExamScore
    }

    // 更新用户信息
    async updateUserInfo (params) {
        Object.assign(this.stuInfoMain, params.jointMain);
        console.log('aaaaaaaaaa', params.schoolScoreList);
        this.schoolScoreList = [...this.schoolScoreList, ...params.schoolScoreList]
    }

    // 更新志愿专业数据
    async updateProbInfo (params) {
        Object.assign(this.schoolExamMain, params.schoolExamMain);
    }

    // 更新分数线信息
    async updateScoreLine (params) {
        Object.assign(this.scoreLineMain, params);
    }
}

class VolDataMain {
    constructor() {
        /** 投档位次 */
        this.archiveRank = '';
        /** 投档规则 */
        this.archiveRule = 1; // 平行或非平行
        /** 投档方式 */
        this.archiveMode = 1; // 只取前4种其他的相对较少，[1:综合分,2:文化分,3:专业分,4:专业分排名]
        /** 投档公式 */
        this.archiveExpression = '';
        /** 投档最低分 */
        this.archiveMinScore = '';
        /** 录取最低分 */
        this.entrolScoreMin = '';
        /** 预计录取最低分 */
        this.preEnrollScoreMin = '';
        /** 预计录取投档分 */
        this.preArchiveScoreMin = '';
        /** 公式取值 */
        this.expression = 0;
        /** p4,修正录取概率 */
        this.competitionDegree = 0;
    }
}

// 考生信息
class StuInfoMain {
    constructor() {
        /** 用户id */
        this.userID = '';
        /** 考试类型 */
        this.profTypeStatus = ''; // 1为统考
        /** 统考专业分 */
        this.jointExamScore = '';
        /** 文化分*/
        this.collEntrExamScore = '';
        /** 省份id */
        this.provinceID = '';
        /** 省份名称 */
        this.provinceName = '';
        /** 文理科id */
        this.artsOrSciences = '';
        /** 统考专业id */
        this.jointProfTypeID = '';
        /** 统考专业名 */
        this.jointProfTypeName = '';
        /** 英语分 */
        this.englishScore = '';
        /** 语文分 */
        this.chineseScore = '';
        /** 文理科中文字符 */
        this.artsOrSciencesStr = '';
        /** 考试类型中文字符 */
        this.profTypeStatusStr = '';
        /** 省份简称 */
        this.simpleProvinceName = '';
        /** 统考位次 */
        this.jointRank = '';
        /** 综合分位次 */
        this.comprehensiveRank = '';

        /** 可以修改的统考分次数 */
        this.canModifyJointScoreNum = '';
        /** 可以修改的文化分次数 */
        this.canModifyCollEntrNum = '';
        /** probabilityCanModProvNum */
        this.probabilityCanModProvNum = '';
        /** 英语修改次数 */
        this.englishLeftNum = '';
        /** 语文修改次数 */
        this.chineseLeftNum = '';
    }
}

// 分数线主要信息
class ScoreLineMain {
    constructor() {
        /** 数据id */
        this.dataId = '';
        /** 数据年份 */
        this.dataYear = '';
        /** 省份id */
        this.provinceId = '';
        /** 省份名称 */
        this.provinceName = '';
        /** 统考类别id */
        this.jointCategoryId = '';
        /** 统考类别名称 */
        this.jointCategoryName = '';
        /** 文理科 */
        this.aos = '';
        /** 文理科名称 */
        this.aosName = '';
        /** 专业状态 */
        this.profTypeStatus = '';
        /** 专业状态名称 */
        this.profTypeStatusName = '';
        this.q = '';
        this.w = '';
        this.a = '';
        this.c = '';
        this.j = '';
        this.i = '';
        /** 分数描述 */
        this.scoreExpression = '';
        /** 专业描述 */
        this.probExpression = '';
        /** 等级使用状态 */
        this.rankUsingStatus = '';
        /** 统考类别id */
        this.jointProfTypeID = '';
        /** 统考类别名称 */
        this.jointProfTypeName = '';
    }
}

const calSchoolProbManage = module.exports = {};

// 初始化
calSchoolProbManage.setupCalProb = function () {
    return new CalProb();
}

calSchoolProbManage.userLogin = async function () {
    await yssLogin.clientLogin({
        loginName: 'yunbao3',
        password: 'Csk001'
    })
    const res = await probApp.getUser({
        ticket: TICKET
    });
    const exmaList = await probApp.schoolExamList({
        ticket: TICKET
    });
    const jointMain = res.result.datas.obj;
    const schoolScoreList = exmaList.result.datas.list;
    return { jointMain, schoolScoreList }
}

calSchoolProbManage.getProbInfo = async function () {
    await yssLogin.platfrom({
        userType: 'zyzg'
    });

    // 概率-志愿专业数据-业务表(校考计算公式)
    const schoolExamRes = await prob.getSchoolScoreExpressionList({
        id: 1671555, // 院校专业数据id
        ticket: PLAT_TICKET
    })

    const schoolExamMain = schoolExamRes.result.datas.page.dataList[0];
    return { schoolExamMain };
}

// 获取省份分数线
calSchoolProbManage.getProvinceScoreLine = async function (provinceId) {
    const res = await provinceScoreLine.getAosAndProfTypeList({
        data: {
            p: {
                provinceId: provinceId
            },
            m: ""
        }, ticket: TICKET
    });
    return res.result.datas.list[0].jointCategoryList[0];
}