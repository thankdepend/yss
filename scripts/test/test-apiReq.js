const yssLogin = require('../../project/help/base/yssLogin');
const monitor = require('../../reqApi/platfrom/monitor');

describe('登录测试', async function () {

    it('登录', async function () {
        const res = await yssLogin.platfrom({
            loginName: 'jk_mh',
            password: 'Csk001'
        });
        console.log(res);
    });
    it('更新缓存', async function () {
        const res = await monitor.updateExamDateCache({
            riChengId: 11110148,
            userId: 1077970,
            minutes: 120000,
            ticket: PLAT_TICKET
        });
        console.log(res);
    });

});