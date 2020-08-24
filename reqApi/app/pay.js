const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const pay = module.exports = {};


/**
 * 查询报名订单
 */
pay.queryOrder = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pay + '/api/m/auth/pay/query_order.ws', params);
};