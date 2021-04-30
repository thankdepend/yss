// const common = require('../../../lib/common');
const { common } = require('../../lib/index')
const yssCaps = require('../../data/caps');

const pay = module.exports = {};



/**
 * 获取评画订单
 * @param {String} partName  声明类型  evaluation
 * @param {Number} dingDanID 订单id 
 * @param {Number} dingDanBH 订单编号
 * @param {String} shenFenZH 身份证号
 * @param {Number} yongHuID 用户id
 * @param {Number} yingFuJE 应付金额 
 * @param {Number} dingDanZT 订单状态
 * @param {String} startTime 开始时间
 * @param {String} endTime 结束时间 
 */
pay.getEvaluationOrderList = async function (params = {}) {
    return common.sendPost(yssCaps.pay + '/auth/util/order/loadOrderData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};


