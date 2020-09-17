const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const crm = module.exports = {};


/**
 * crm登录权限询问
 * @param {String} loginName 用户名
 */
crm.getUserCanLogin = async function (params = {}) {
    return common.sendPost(yssCaps.crm + '/org/orgUser/getUserCanLogin.htm?', params);
};

/**
 * crm登录
 * @param {String} loginName 登录名
 * @param {String} password 密码
 */
crm.login = async function (params = {}) {
    return common.sendGet(yssCaps.crm + '/user/login?', params);
};

/**
 * 公海-线索列表
 * @param {String} curPage: 1
 * @param {String} pageSize: 10
 * @param {String} customerType 客户类型
 * @param {String} receiveStatus 领取状态1为已领取，2为未领取
 * @param {String} queryStartTime 开始时间
 * @param {String} queryEndTime 结束时间
 * @param {String} sortFiledStr createdOn 排序规则
 * @param {String} customerSource 线索来源[1,2,3,4,5]
 */
crm.publicListCustomer = async function (params = {}) {
    return common.sendPost(yssCaps.crm + '/auth/org/orgCustomer/listCustomer.htm?', params);
};