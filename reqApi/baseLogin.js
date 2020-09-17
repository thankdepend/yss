// const common = require('../../../lib/common');
const httpRequest = require('../lib/httpRequest')
const yssCaps = require('../data/caps');

const base = module.exports = {};



/**
 * app登录
 */
base.userLogin = async function (params = {}) {
    return httpRequest.post(yssCaps.user + '/login', {
        ...params
    });

};

/**
 * 平台登录
 * @param loginName 用户名
 * @param password 密码
 */
base.platfromLogin = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.user + '/login', params);
};

/**
 * 学校登录
 */
base.schoolAdminLogin = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.college + '/login', params);
};