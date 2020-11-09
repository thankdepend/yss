const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const advert = module.exports = {};


/**
 * 检查广告
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
advert.checkAdvertise = async function (params = {}) {
    return common.sendPost(yssCaps.advert + '/api/m/adv/advert/v4/check_advertise.ws', params);
};