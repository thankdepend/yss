const evalApp = require('../../../reqApi/app/eval');
const pay = require('../../../reqApi/app/pay');
const {
    common
} = require('../../../lib/index');
const doc = require("../../data/doc.json");
const caps = require("../../../data/caps");

class Eval {
    constructor() {
        /** 评画id */
        this.evaluationId = '';
        /** 老师id */
        this.teacherId = '';
        /** 老师用户id */
        this.teacherUserId = '';
        /** 老师名称 */
        this.teacherName = '';
        /** 类别id */
        this.classId = '';
        /** 类别名称 */
        this.className = '';
        /** 专业id */
        this.profId = '';
        /** 专业名称 */
        this.profName = '';
        /** 订单id */
        this.orderId = '';
        /** 评画详情 */
        this.describe = '';
        /** 评画url */
        this.paintUrl = '';
    }

    /** 考生保存评画信息 */
    async saveEvaluation (params) {
        const ranStuGrade = common.getRandomNum(0, 2);
        const res = await evalApp.saveStuEvaluation({
            data: {
                m: "",
                p: {
                    teacherId: params.teacherId,
                    teacherUserId: params.userId,
                    teacherName: params.teacherName,
                    classId: params.classId,
                    className: params.className,
                    profId: 1,
                    profName: params.profTag.split(',')[0],
                    paintUrl: doc[caps.name].production[common.getRandomNum(0, doc.test.production.length - 1)],
                    describe: common.getPoetry(),
                    stuGrade: `高${ranStuGrade == 0 ? '一' : ranStuGrade == 1 ? '二' : ranStuGrade == 2 ? '三' : '三'}`, // 年级
                }
            },
            ticket: TICKET
        });
        console.log('考生保存评画信息', res);
        let evaluationInfo = res.params.data.p
        console.log(evaluationInfo);
        evaluationInfo.evaluationId = res.result.datas.evaluationId;
        this.updateEvaluation(evaluationInfo);
    }

    /** 更新评画信息 */
    updateEvaluation (params) {
        common.update(this, params)
    }

    // 获取线上考生评画照片
    async getOnlinePic () {
        await evalApp.queryMyEvaluation()
    }

    /** 创建评画订单 */
    async saveEvalOrder (params) {
        const evalOrderData = await evalApp.commitEvaluationOrder({
            data: {
                m: '',
                p: {
                    evaluationId: this.evaluationId,
                    teacherId: this.teacherId,
                    userDiscountsID: '',
                }
            },
            ticket: TICKET
        })
        console.log('订单', evalOrderData);
        this.updateEvaluation({ orderId: evalOrderData.result.datas.orderId })
    }

    /**
     * 支付评画
     */
    async pay () {
        const res = await pay.payOrder(this.orderId)
        console.log(res);
    }

    /** 查询我的评画列表 */
    async queryMyEvaluation () {
        const res = await evalApp.queryMyEvaluation({
            data: {
                m: "",
                p: {
                    curPage: 1
                }
            }, ticket: TICKET
        });
        return res.result.datas.page;
    }

    /**
     * 查询我的评画列表断言
     */
    async queryMyEvaluationAresst () {
        const MyEvaluationData = await this.queryMyEvaluation();
        const actul = MyEvaluationData.dataList.find(obj => obj.evaluationId == this.evaluationId);
        console.log(actul);
        let exp = {
            evaluationId: this.evaluationId,
            teacherId: this.teacherId,
            teacherUserId: this.teacherUserId,
            teacherName: this.teacherName,
            paintUrl: this.paintUrl
        }
    }
}

const evaluationManage = module.exports = {};

evaluationManage.setupEvaluation = function () {
    return new Eval();
}