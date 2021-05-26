const { expect } = require("chai");
const superagent = require('superagent')
const moment = require('moment');
const { sendServerPost } = require("../../lib/httpRequest");
const yssLogin = require('../../project/help/base/yssLogin')


describe('虚拟电话测试', async function () {
    this.timeout(90000)
    // it('登录接口测试', async function () {
    //     const res = await sendServerPost('http://51bm.user.net.cn/login', {
    //         loginName: 'xyf7',
    //         password: 'ysk002'
    //     })
    //     console.log(res);
    // });
    it('登录', async function () {
        const res = await yssLogin.clientLogin({
            loginName: 'xyf7',
            password: 'ysk002'
        })
        console.log(res);
    });
});

