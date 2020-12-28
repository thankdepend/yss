const { before } = require('lodash');
const yssLogin = require('./../project/help/base/yssLogin');
const stu = require('../reqApi/app/stu');

describe('登录测试', async function () {
    let siteInfo;
    before('登录', async function () {
        const res = await yssLogin.clientLogin();
        console.log(res);
    });
    it('查询考点', async function () {
        siteInfo = await stu.getExamSite({
            data: {
                m: "",
                p: {
                    xueXiaoID: 13166
                }
            }, ticket: TICKET
        })
        console.log(siteInfo);
    });
});