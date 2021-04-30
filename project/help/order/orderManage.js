const payApp = require('../../../reqApi/app/pay');
const evalApp = require('../../../reqApi/app/eval');
const pay = require('../../../reqApi/platfrom/pay');
const { common } = require('../../../lib/index');

class Order {
    constructor(params) {
        /** 订单id */
        this.orderId = '';
        /** 订单mian */
        this.orderMain = new OrderMain();
    }

    /** 订单处理 */
    async orderProcessCenter (params = {}, type) {
        switch (type) {
            case 'apply':
                this.queryApplyOrder();
                break;
            case 'prob':

                break;
            default:
                break;
        }
    }

    /**
     * 创建评画订单
     */
    async createEvalOrder (params) {
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

    /** 查询评画后台订单 */
    async queryPlatfromOrder (params) {
        const res = await pay.getEvaluationOrderList(Object.assign({
            partName: 'evaluation',
            ticket: PLAT_TICKET
        }, { dingDanID: params.orderId }))
        console.log('登录信息', LOGINDATA);
        this.orderId = params.orderId;
        // console.log('查询评画后台订单', JSON.stringify(res));
        // console.log('查询评画后台订单', res.result.datas.page);
        return res;
    }

    /** 评画平台订单列表断言 */
    async assertPlatfromEvalListOrder (params) {
        const res = await this.queryPlatfromOrder(params);
        const actual = res.result.datas.page.dataList[0];

        console.log('实际值', actual);
        let exp = {
            dingDanID: this.orderId,
            dingDanLX: 26,
            yongHuID: LOGINDATA.userId,
            shenFenZH: LOGINDATA.extInfo.shenFenZH,
            // kaoShengID: LOGINDATA.kaoShengID,
            kaoShengXM: LOGINDATA.extInfo.kaoShengXM,
            dingDanJE: 0.01,
            yingFuJE: 0.01,
            fuKuanFS: 1,
            fuKuanLY: 2,
            shouKuanDW: '艺术升',
            dingDanZT: 1,
            invoiceStatusStr: '未开票',
            timeOutPayStr: '否',
            dingDanLXStr: '评画',
            fuKuanFSStr: '支付宝',
            fuKuanLYStr: '移动端',
            dingDanZTStr: '未付款',
        }
        common.isApproximatelyEqualAssert(exp, actual)
    }

    /** 查询订单列表 */
    async queryOrder (params) {
        let reqParams = {
            data: {
                "p": {
                    "includeSub": true
                },
                "m": ""
            },
            ticket: TICKET
        }
        await payApp.queryOrder(reqParams);
    }
}

const orderManage = module.exports = {};
orderManage.setupOrder = function (params) {
    return new Order(params);
}

class OrderMain {
    constructor() {
        /** dingDanID  */
        this.dingDanID = '';
        /** dingDanBH */
        this.dingDanBH = '';
        /** dingDanLX */
        this.dingDanLX = '';
        /** yongHuID */
        this.yongHuID = '';
        /** shenFenZH */
        this.shenFenZH = '';
        /** kaoShengID */
        this.kaoShengID = '';
        /** kaoShengXM */
        this.kaoShengXM = '';
        /** dingDanJE */
        this.dingDanJE = '';
        /** youHuiJE */
        this.youHuiJE = '';
        /** yingFuJE */
        this.yingFuJE = '';
        /** fuKuanFS */
        this.fuKuanFS = '';
        /** shouKuanDWID */
        this.shouKuanDWID = '';
        /** shouKuanDW */
        this.shouKuanDW = '';
        /** chaoShiSJ */
        this.chaoShiSJ = '';
        /** tiJiaoSJ */
        this.tiJiaoSJ = '';
        /** zhiFuBaoSJ */
        this.zhiFuBaoSJ = '';
        /** dingDanZT */
        this.dingDanZT = '';
        /** logo */
        this.logo = '';
        /** kaoDianId */
        this.kaoDianId = '';
    }
}