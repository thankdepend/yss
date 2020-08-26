// 全局参数

// 常用第三方库
global.assert = require('assert');
global._ = require('lodash');

const chai = require('chai');
const dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
global.expect = chai.expect;

// 登录信息
global.LOGINDATA = {};

// 常用信息
global.BASICDATA = {};
// app-ticket
global.TICKET = {};
// 平台ticket
global.PLAT_TICKET = {};
// 平台登录信息
global.PLAT_LOGINDATA = {};
// 呼啦圈用户信息
global.HLQ_USERINFO = {};

// 测试用例
global.TESTCASE = {
    timeout: 90000
};