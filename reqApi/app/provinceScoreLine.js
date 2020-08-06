const common = require('../../lib/common');
// const format = require('../../../data/format');
const yssCaps = require('../../data/caps');
const httpRequest = require('../../lib/httpRequest')
const provinceScoreLine = module.exports = {};


/**
 * 获取分数线信息
 * @param {number} params.data.p.provinceId 省份id 
 * @param {number} params.ts 时间戳
 * @param {string} params.ticket 认证信息
 */

provinceScoreLine.getAosAndProfTypeList = async function (params = {}) {
    return httpRequest.post(yssCaps.prob + '/api/m/auth/provinceScoreLine/aosAndProfTypeList.ws', {
        ...params
    });
};

/**
 * 获取省份列表
 * @param {number} params.ts 时间戳
 * @param {string} params.ticket 认证信息
 */
provinceScoreLine.getProvinceList = async function (params = {}) {
    return httpRequest.post(yssCaps.url + '/api/m/auth/provinceScoreLine/provinceList.ws', {
        ...params
    });
}