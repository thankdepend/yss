const {
    common
} = require('../../lib/index');
// const format = require('../../../data/format');
const yssCaps = require('../../data/caps');
const http = require('../../lib/httpRequest')
const user = module.exports = {};

/**
 * 保存用户
 * @param {Number} yongHuID 用户id 
 * @param {Number} xueXiaoID 学校id
 * @param {Number} kaoDianID 考点id
 * @param {Number} userKaoShiID 用户考试id
 * @param {String} yongHuMing 用户名 
 * @param {String} yongHuKL 用户密码
 * @param {String} agginYongHuKL 用户密码再次输入
 * @param {Number} yongHuLB 用户类别id 100
 * @param {String} kaoShiMC 考试名称
 * @param {Number} shouJiHao 手机号
 */
user.saveUser = async function (params = {}) {
    return common.sendPost(yssCaps.user + '/auth/admin/user/saveUser.htm', params);
};

/**
 * 完善用户信息
 * @param {*} params 
 */
user.saveStuStepInfoNewr = async function (params = {}) {
    return common.sendPost(yssCaps.user + '/auth/student/saveStuStepInfoNew.htm', params);
};

/**
 * 获取用户信息
 */
user.getStuInfo = async function (params = {}) {
    return common.sendPost(yssCaps.user + '/auth/student/stuInfo.htm', params);
};

/**
 * 查询用户列表(平台端)
 * @param {Number} shenFenZH 身份证号
 * @param {Number} shouJiHao 手机号
 * @param {Number} yongHuLB 用户类别
 * @param {Number} xueXiaoID 学校id
 * @param {Number} zhengJianLX 证件类型
 * @param {Number} useFlag 使用标志
 * @param {Number} curPage 
 * @param {Number} pageSize
 */
user.getUserList = async function (params = {}) {
    return common.sendPost(yssCaps.user + '/auth/admin/user/userListData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};