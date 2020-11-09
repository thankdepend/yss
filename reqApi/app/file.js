const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const fillCenter = module.exports = {};



/**
 * 提交审核-图片上传
 * @param idCard 
 * @param file application/octet-stream  user_photo.png.JPEG
 */
fillCenter.upload = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.fillCenter + '/api/m/auth/file/upload.ws', params);
};