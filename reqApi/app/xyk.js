const {
    common
} = require('../../lib/index');
// const format = require('../../../data/format');
const yssCaps = require('../../data/caps');
const xyk = module.exports = {};



/**
 * 购买单个志愿视频
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.goodsId 商品id（视频）
 */
xyk.buySingleVideo = async function (params = {}) {
    return common.post(yssCaps.xyk + '/api/m/auth/v1/shop/record/add.ws', params);
};

/**
 * 查询概率视频是否已单个购买
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.id 商品id（视频）
 */
xyk.probVideoHasBuy = async function (params = {}) {
    return common.post(yssCaps.xyk + '/api/m/videoCategory/probVideoHasBuy.htm', params);
};