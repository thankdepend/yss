'use strict';
const common = require('../../lib/common');
const yssAccount = require('../data/account');
const caps = require('../../data/caps');
const base = require('../../reqApi/baseLogin')
const qs = require('qs');

let yysLogin = module.exports = {};

let argv = require('yargs').argv;
// app登录
yysLogin.clientLogin = async function (params = null) {
    // if (caps.envName) {
    //     console.log('测试环境', caps.envName);
    // }
    const userReq = yssAccount[caps.name].user;
    const reqParams = Object.assign({
        loginName: '330325',
        password: 'Csk001',
        device: 'm'
    }, params || userReq);



    const res = await base.userLogin(reqParams);
    console.log(res);
    LOGINDATA = res.result.datas.user
    TICKET = res.result.ticket
    return res;
};

// 后台登录
yysLogin.platfrom = async function (params = {}) {
    let userType;
    if (params.hasOwnProperty(userType)) {
        userType = params.userType;
        if (userType == '') {
            userType == 'ptzg';
            delete params.userType;
        }
        delete params.userType;
    } else {
        userType == 'ptzg';
        delete params.userType;
    }

    const userReq = yssAccount[caps.name][userType];
    let reqParams = Object.assign({
        loginName: 'zyzg001',
        password: 'Csk001',
    }, params || userReq);
    // reqParams =  qs.stringify(reqParams);
    const res = await base.platfromLogin(reqParams);
    PLAT_TICKET = res.result.ticket;
    PLAT_LOGINDATA = res.result;
    return res;
};

// 学校管理员
yysLogin.schoolAdmin = async function (params = {}) {
    const res = await base.platfromLogin(params);
    PLAT_TICKET = res.result.ticket
    return res;
};