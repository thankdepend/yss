const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');
const {
    common
} = require('../../lib/index');

const pay = module.exports = {};


/**
 * 检查订单状态
 * @param {Object} data
 * @param {Object} data.p
 * @param {String} data.p.dingDanID
 * @param {String} data.m
 */
pay.checkOrderStatus = async function (params = {}) {
    return common.sendPost(yssCaps.pay + '/api/m/auth/pay/check_order_status.ws', params);
};

/**
 * 检查订单支付方式
 * @param {Object} data
 * @param {Object} data.p
 * @param {Object} data.p.fuKuanFS 付款方式[1:支付宝]
 * @param {String} data.p.dingDanID 订单id
 * @param {String} data.m
 */
pay.checkOrderPayway = async function (params = {}) {
    return common.sendPost(yssCaps.pay + '/api/m/auth/pay/check_order_payway.ws', params);
};

/**
 * 查询报名订单
 */
pay.queryOrder = async function (params = {}) {
    return common.sendPost(yssCaps.pay + '/api/m/auth/pay/query_order.ws', params);
};

/**
 * 支付
 */
pay.payOrder = async function (orderId) {
    return common.sendPost(yssCaps.pay + `/pay/alipay/testnotify.htm?orderId=${orderId}`);
};