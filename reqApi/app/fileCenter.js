const { common } = require('../../lib/index')
const yssCaps = require('../../data/caps');

const fileCenter = module.exports = {};



/**
 * OSS上传信息
 */
fileCenter.ossUploadInfo = async function (params = {}) {
    return common.sendPost(yssCaps.fileCenter + '/api/m/auth/file/v202007/ossUploadInfo.ws', params);
};