const {
    common
} = require('../../lib/index');
// const format = require('../../../data/format');
const yssCaps = require('../../data/caps');
// const httpRequest = require('../../lib/httpRequest')
const prob = module.exports = {};


/**
 * 保存用户(新接口)
 */
prob.saveUser = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/wish/user/v200630/saveUser.htm', {
        ...params
    });
};

/**
 * 概率用户查询(新接口)
 * @param {Object} data
 * @param {String} data.m
 * @param {Number} data.p
 */
prob.getUser = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/wish/user/v200630/getUser.htm', {
        ...params
    });
};

/**
 * 概率视频待支付订单Id获取
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.goodsID 11为打包视频
 */
prob.getNotPayOrder = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/prob/goods/v200929/getNotPayOrder.ws', {
        ...params
    });
};


/**
 * 打包概率视频是否已购买
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.goodsID 11为打包视频
 */
prob.getPackVideoHasBuy = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/wish/goods/v200915/getHasBuy.htm', {
        ...params
    });
};


/**
 * 打包概率视频购买
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.goodsID 11为打包视频
 */
prob.probPackVideoBuy = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/wish/goods/v200915/buy.htm', {
        ...params
    });
};

/**
 * 打包概率视频价格
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.goodsID 11为打包视频
 */
prob.getPackVideoPrice = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/wish/goods/v200915/price.htm', {
        ...params
    });
};

/**
 * 电子周刊商品价格列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.goodsID 12为电子周刊
 */
prob.magazinePriceList = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/prob/goods/v200929/priceList.htm', {
        ...params
    });
};

/**
 * 电子周刊到期时间查看
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
prob.userBuyed = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/userBuyed/v200929/userBuyed.htm', {
        ...params
    });
};

/**
 * 电子周刊购买
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.id
 */
prob.dynamicPriceBuy = async function (params = {}) {
    return common.post(yssCaps.prob + '/api/m/auth/wish/goods/v200929/dynamicPriceBuy.htm', {
        ...params
    });
};