const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');
const {
    common
} = require('../../lib/index');

const pay = module.exports = {};


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