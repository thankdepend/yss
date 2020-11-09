const {
    common
} = require('../lib/index');
const probApp = require('../reqApi/app/prob');
const prob = require('../reqApi/platfrom/prob');
const yssLogin = require('../prob/help/yssLogin');



// 概率计算
class CalProb {
    constructor() {
        // 院校专业、线主要信息
        this.volDataMain = new VolDataMain();
        // 考生信息
        this.stuInfoMain = new StuInfoMain();
        /** 替换公式 */
        this.formula = {
            S: '综合分',
            R: '文化分',
            W: '文化课满分',
            T: '考生校考专业课得分',
            P: '考生校考专业课满分',
            M: '考生校考专业考试合格线',
            U: '考生联考专业成绩',
            Q: '省联考专业课满分',
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
            Y: '理科-统考专科线'
        }
    }

    // 计算统考概率
    async jointCalculate() {
        // 替换公式为相应字段中的值
        await this.replaceFormula();
        // 先处理没过线的情况
        if (this.stuInfoMain.jointExamScore - this.volDataMain.archiveMinScore) {
            return '统考专业分 没过线';
        }

        // 如果是平行志愿
        if (this.volDataMain.archiveRule == 1) {
            // 如果投档公式是“专业分”
            if (this.volDataMain.archiveMode == 3) {
                // 投档位次与用户统考位次同时存在
                if (this.stuInfoMain.jointRank != '' || null) {
                    if (this.volDataMain.archiveRank != '' || null) {
                        console.log(8);
                        const val = Number((0.4725 - Math.atan((this.stuInfoMain.jointRank - this.volDataMain.archiveRank) / this.volDataMain.archiveRank) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else {
                        let formulaRes = this.volDataMain.expression.replace(
                            /[A-Z]/g,
                            (...arg) => {
                                return this.formula[arg[0]]
                            }
                        )
                        if (this.volDataMain.archiveMinScore != '' || null) {
                            // 如果投档最低分存在
                            console.log(9);
                            const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.archiveMinScore) / this.volDataMain.archiveMinScore) * 5.1) * 100).toFixed(2) + '%';
                            return val;
                        } else if (this.volDataMain.entrolScoreMin != '' || null) {
                            // 如果录取最低分存在
                            console.log(10);
                            const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * 5.1) * 100).toFixed(2) + '%';
                            return val;
                        } else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                            // 如果预计录取最低分存在
                            console.log(11);
                            const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.preEnrollScoreMin) / this.volDataMain.preEnrollScoreMin) * 5.1) * 100).toFixed(2) + '%';
                            return val;
                        } else if (this.volDataMain.preArchiveScoreMin != '' || null) {
                            // 如果预计投档分存在
                            console.log(12);
                            const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.preArchiveScoreMin) / this.volDataMain.preArchiveScoreMin) * 5.1) * 100).toFixed(2) + '%';
                            return val;
                        } else {
                            console.log('不可能出现');
                        }

                    }

                } else {
                    let formulaRes = this.volDataMain.expression.replace(
                        /[A-Z]/g,
                        (...arg) => {
                            return this.formula[arg[0]]
                        }
                    )
                    if (this.volDataMain.archiveMinScore != '' || null) {
                        console.log(13);
                        // 如果投档最低分存在
                        console.log(eval(formulaRes));
                        console.log(this.volDataMain.archiveMinScore);
                        const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.archiveMinScore) / this.volDataMain.archiveMinScore) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else if (this.volDataMain.entrolScoreMin != '' || null) {
                        // 如果录取最低分存在
                        console.log(14);
                        const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                        // 如果预计录取最低分存在
                        console.log(15);
                        const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.preEnrollScoreMin) / this.volDataMain.preEnrollScoreMin) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else if (this.volDataMain.preArchiveScoreMin != '' || null) {
                        console.log(16);
                        const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.preArchiveScoreMin) / this.volDataMain.preArchiveScoreMin) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else {
                        console.log('不可能出现');
                    }
                }
            }
            // 如果投档公式不是"专业分", --- 综合分
            else {
                // 如果考生统考位次不为空
                if (this.stuInfoMain.comprehensiveRank != '' || null) {
                    if (this.volDataMain.archiveRank != '' || null) {
                        console.log(1);
                        // 如果投档位次不为空
                        const val = Number((0.4725 - Math.atan((this.stuInfoMain.comprehensiveRank - this.volDataMain.archiveRank) / this.volDataMain.archiveRank) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else if (this.volDataMain.expectArchiveRank != '' || null) {
                        console.log(2);
                        // 如果预计投档位次不为空
                        const val = Number((0.4725 - Math.atan((this.stuInfoMain.comprehensiveRank - this.volDataMain.expectArchiveRank) / this.volDataMain.expectArchiveRank) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else if (this.volDataMain.lastYearArchiveRank != '' || null) {
                        console.log(3);
                        // 如果上一年投档位次不为空
                        const val = Number((0.4725 - Math.atan((this.stuInfoMain.comprehensiveRank - this.volDataMain.lastYearArchiveRank) / this.volDataMain.lastYearArchiveRank) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else {
                        console.log('不可能存在的情况');
                    }
                } else {
                    let formulaRes = this.volDataMain.expression.replace(
                        /[A-Z]/g,
                        (...arg) => {
                            return this.formula[arg[0]]
                        }
                    )
                    if (this.volDataMain.archiveMinScore != '' || null) {
                        // 如果投档最低分存在
                        console.log(4);
                        const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.archiveMinScore) / this.volDataMain.archiveMinScore) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else if (this.volDataMain.entrolScoreMin != '' || null) {
                        // 如果录取最低分存在
                        console.log(5);
                        const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                        // 如果预计录取最低分存在
                        console.log(6);
                        const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.preEnrollScoreMin) / this.volDataMain.preEnrollScoreMin) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else if (this.volDataMain.preArchiveScoreMin != '' || null) {
                        // 如果预计录取投档分存在
                        console.log(7);
                        const val = Number((0.4725 + Math.atan((eval(formulaRes) - this.volDataMain.preArchiveScoreMin) / this.volDataMain.preArchiveScoreMin) * 5.1) * 100).toFixed(2) + '%';
                        return val;
                    } else {
                        console.log('不可能出现');
                    }
                }
            }
        }
    }

    // 将注释替换成字段值(例如：U = collEntrExamScore = 10)
    async replaceFormula() {
        this.formula.R = this.stuInfoMain.collEntrExamScore;
        this.formula.U = this.stuInfoMain.jointExamScore;
    }

    // 更新用户信息
    async updateUserInfo(params) {
        Object.assign(this.stuInfoMain, params)
    }

    // 更新志愿专业数据
    async updateProbInfo(params) {
        Object.assign(this.volDataMain, params)
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

const calProbManage = module.exports = {};

// 初始化
calProbManage.setupCalProb = function () {
    return new CalProb();
}

calProbManage.userLogin = async function () {
    await yssLogin.clientLogin({
        loginName: '330340',
        password: 'Csk001'
    })
    const res = await probApp.getUser({
        ticket: TICKET
    });
    return res.result.datas.obj;
}

calProbManage.getProbInfo = async function () {
    await yssLogin.platfrom({
        userType: 'zyzg'
    });

    // 概率-志愿专业数据-业务表
    const res = await prob.getJointScoreList({
        id: 218273, // 院校专业数据id
        ticket: PLAT_TICKET
    })
    const jointInfo = res.result.datas.page.dataList[0]
    return jointInfo;
}