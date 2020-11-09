const {common} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const fillCenter = module.exports = {};



/**
 * OSS上传信息
 */
fillCenter.ossUploadInfo = async function (params = {}) {
    return common.sendPost(yssCaps.fillCenter + '/api/m/auth/file/v202006/ossUploadInfo.ws', params);
};