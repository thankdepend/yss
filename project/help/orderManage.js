const pay = require('../../reqApi/app/pay');

class Order {
    constructor(params) {
        /** 订单mian */
        this.orderMain = new OrderMain();
    }

    /** 订单处理 */
    async orderProcessCenter(params = {}, type) {
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

    /** 查询报考订单 */
    async queryOrder(params) {
        let reqParams = {
            data: {
                "p": {
                    "includeSub": true
                },
                "m": ""
            },
            ticket: TICKET
        }
        await pay.queryOrder(reqParams);
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