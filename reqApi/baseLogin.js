// const common = require('../../../lib/common');
const httpRequest = require('../lib/httpRequest')
const yssCaps = require('../data/caps');
const { common } = require('../lib/index');

const base = module.exports = {};



/**
 * app登录
 */
base.userLogin = async function (params = {}) {
    return common.sendPost(yssCaps.user + '/login', params);
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

/**
 * 平台登录
 * @param loginName 用户名
 * @param password 密码
 */
base.crmAgentLogin = async function (params = {}) {
    return httpRequest.crmPost(yssCaps.user + '/login', params);
};

/**
 * 重庆考试院登录
 * @param loginName 用户名
 * @param password 密码
 */
base.cqPlatfromLogin = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.user + '/login/65001.htm', params);
};

/**
 * 线上app登录
 */
base.onlineUserLogin = async function (params = {}) {
    return common.sendOlinePost('http://user.artstudent.cn' + '/login', params);
};