const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const service = module.exports = {};
const caps = require('../../data/caps');


/**
 * 查询报名订单
 */
service.queryOrder = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pay + '/api/m/auth/pay/query_order.ws/api/m/auth/pay/query_order.ws', params);
};