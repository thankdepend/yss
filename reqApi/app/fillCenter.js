const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const fillCenter = module.exports = {};



/**
 * 报名-院校搜索
 */
fillCenter.ossUploadInfo = async function (params = {}) {
    return httpRequest.post2( yssCaps.fillCenter + '/api/m/auth/file/v202006/ossUploadInfo.ws' , params);
};