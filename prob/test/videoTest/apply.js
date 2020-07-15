const {
    common
} = require('../../../lib/index');
const yysLogin = require('../../help/yssLogin');
const applyManage = require('../../help/applyManage');

describe('报名', async function () {
    this.timeout(TESTCASE.timeout);
    const apply = applyManage.setupApply();
    before('登录', async function () {
        loginInfo = await yysLogin.clientLogin().then(res => res.result.datas.user);
    });
    describe('新增考生', async function () {
        before('新增考生信息', async function () {
            const examineeJson = applyManage.mockExamineeJson();
            await apply.saveStuinfo(examineeJson);
        });
        it('查询考生信息', async function () {
            await apply.getStuinfo();
        });
    });

});