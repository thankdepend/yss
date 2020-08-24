'use strict';
const common = require('../../lib/common');
const yssAccount = require('../data/account');
const caps = require('../../data/caps');
const base = require('../../reqApi/baseLogin')
const qs = require('qs');

let yysLogin = module.exports = {};

let argv = require('yargs').argv;

/**
 * app登录
 * @param {String} loginName 账号
 * @param {String} password 密码
 * @param {String} device 设备'm'
 */
yysLogin.clientLogin = async function (params = null) {
    const userReq = yssAccount[caps.name].user1;
    const reqParams = Object.assign(userReq || {}, params);

    const res = await base.userLogin(reqParams);
    LOGINDATA = res.result.datas.user
    TICKET = res.result.ticket
    return res;
};

// 后台登录
yysLogin.platfrom = async function (params = {}) {
    let userType;
    if (params.userType) {
        userType = params.userType;
        delete params.userType;
    } else {
        userType = 'ptzg';
        delete params.userType;
    }

    const userReq = yssAccount[caps.name][userType];
    let reqParams = Object.assign(
        params, userReq);
    // reqParams =  qs.stringify(reqParams);
    const res = await base.platfromLogin(reqParams);
    // console.log(res.result.datas);
    PLAT_TICKET = res.result.ticket;
    PLAT_LOGINDATA = res.result.datas.user;

    return res;
};

// 学校管理员
yysLogin.schoolAdmin = async function (params = {}) {
    const res = await base.platfromLogin(params);
    PLAT_TICKET = res.result.ticket
    return res;
};