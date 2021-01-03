const stuApp = require('../../reqApi/app/stu');
const yssLogin = require('../../project/help/base/yssLogin');

describe('接口测试', async function () {
    before('客户登录', async function () {
        await yssLogin.clientLogin({
            loginName: '330334',
            password: 'Csk001',
        });
    });
    it('查询考试专业（所有）', async function () {
        await stuApp.queryExamProf({
            data: {
                m: '',
                p: {}
            }, ticket: TICKET
        });
    });
});