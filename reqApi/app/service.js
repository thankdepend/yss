const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const service = module.exports = {};
const caps = require('../../data/caps');


/**
 * 给考生拍照-上传图片
 */
service.uploadAuth = async function (params = {}) {
    if (caps.name == "pre") {
        return httpRequest.sendPost(yssCaps.audit + '/api/m/auth/service/upload_auth_res.ws', params);
    } else {
        return httpRequest.sendPost(yssCaps.upload_url + '/api/m/auth/service/upload_auth_res.ws', params);
    }
};

/**
 * 报考资料上传-确认提交
 */
service.uploadAuthCommit = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.audit + '/api/m/auth/service/v191119/commit_auth_res.ws', params);
};

/**
 * 报考资料查询
 */
service.queryUpload = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.audit + '/api/m/auth/service/v4/query_auth_res.ws', params);
};