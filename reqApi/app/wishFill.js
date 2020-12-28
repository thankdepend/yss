const common = require('../../lib/commonFc');
// const format = require('../../../data/format');
const yssCaps = require('../../data/caps');
const httpRequest = require('../../lib/httpRequest')
const wishFill = module.exports = {};


/**
 * 获取公告列表
 */

wishFill.getBulletinList = async function (params = {}) {
    return httpRequest.post(yssCaps.url + '/api/m/newDataNotice/list.ws', {
        ...params
    });
};