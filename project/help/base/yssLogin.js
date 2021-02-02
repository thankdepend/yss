'use strict';
const { common } = require('../../../lib/index');
const yssAccount = require('../../data/account');
const caps = require('../../../data/caps');
const base = require('../../../reqApi/baseLogin')
const user = require('../../../reqApi/platfrom/user')
const qs = require('qs');

let yssLogin = module.exports = {};

let argv = require('yargs').argv;

/**
 * app登录
 * @param {String} loginName 账号
 * @param {String} password 密码
 * @param {String} device 设备'm'
 */
yssLogin.clientLogin = async function (params) {
    const userReq = yssAccount[caps.name].user1;
    const reqParams = Object.assign(userReq || {}, params);

    const res = await base.userLogin(reqParams);
    // console.log(res);
    LOGINDATA = res.result.datas.user
    TICKET = res.result.ticket
    return res;
};

/**
 * 后台登录
 * @param userType 用户类型
 * @alias 用户类型:例['ptzg','zyzg','yyzg']
 */
yssLogin.platfrom = async function (params = {}) {
    let userType;
    // 用户类型，没有默认取“平台主管”
    if (params.userType) {
        userType = params.userType;
        delete params.userType;
    } else {
        userType = 'ptzg';
        delete params.userType;
    }
    let reqParams;
    // console.log(caps.name);
    // 只传userType就去account取用户信息，什么都不传取account的ptzg信息，传了params且不为ptzg则取params
    let userReq = yssAccount[caps.name][userType];
    if (Object.keys(params).length != 0 && userType == 'ptzg') {
        // console.log('parmas', params);
        // console.log('打印布尔', !params.hasOwnProperty('userType'));
        if (!params.hasOwnProperty('userType')) {
            reqParams = params;
            // console.log(1, reqParams);
        }
    } else {
        reqParams = Object.assign(
            params, userReq);
        // console.log(2, reqParams);
    }


    // reqParams =  qs.stringify(reqParams);
    const res = await base.platfromLogin(reqParams);
    // console.log('平台登录', res.result.datas);
    PLAT_TICKET = res.result.ticket;
    PLAT_LOGINDATA = res.result.datas.user;

    return res;
};

/**
 * crm登录(agent带cookie)
 * @param {*} params 
 */
yssLogin.crmLogin = async function (params = {}) {
    let userType;
    // 用户类型，没有默认取“平台主管”
    if (params.userType) {
        userType = params.userType;
        delete params.userType;
    } else {
        userType = 'ptzg';
        delete params.userType;
    }
    let reqParams;
    // 只传userType就去account取用户信息，什么都不传取account的ptzg信息，传了params且不为ptzg则取params
    let userReq = yssAccount[caps.name][userType];
    if (Object.keys(params).length != 0 && userType == 'ptzg') {
        // console.log('parmas', params);
        // console.log('打印布尔', !params.hasOwnProperty('userType'));
        if (!params.hasOwnProperty('userType')) {
            reqParams = params;
            // console.log(1, reqParams);
        }
    } else {
        reqParams = Object.assign(
            params, userReq);
        // console.log(2, reqParams);
    }


    // reqParams =  qs.stringify(reqParams);
    const res = await base.crmAgentLogin(reqParams);
    // console.log(res.result.datas);
    PLAT_TICKET = res.result.ticket;
    PLAT_LOGINDATA = res.result.datas.user;

    return res;
};

// 学校管理员
yssLogin.schoolAdmin = async function (params = {}) {
    const res = await base.platfromLogin(params);
    PLAT_TICKET = res.result.ticket
    return res;
};

// 注册考生用户
yssLogin.regisClient = async function () {
    const rm = common.getRandomNum(100, 99999)
    let params = {
        yongHuMing: `random-c${rm}`,
        yongHuKL: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 123456,
        agginYongHuKL: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 123456,
        yongHuLB: 100,
        XinXiYT: 1,
        // xueXiaoID: 66777,
        // kaoDianID: 644,
        ticket: PLAT_TICKET
    }
    // platFromInfo = await yysLogin.platfrom({loginName:'mh01',password:'Csk001'});
    // await common.delay(500);
    const res = await user.saveUser(params)
    console.log('保存用户请求', res);
    return res;
}

/**
 * @alias 重庆考试院登录
 */
yssLogin.cqSchLogin = async function (params = {}) {
    // reqParams =  qs.stringify(reqParams);
    const res = await base.cqPlatfromLogin(params);
    // PLAT_TICKET = res.result.ticket;
    // PLAT_LOGINDATA = res.result.datas.user;

    return res;
};