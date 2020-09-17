const counSelorManage = require('../../help/counSelorManage');
const yssLogin = require('../../help/yssLogin');
const baseInfo = require('../../help/getBaseInfo');

const argv = require('yargs').argv;

describe('平台顾问', async function () {
    const counSelor = counSelorManage.setupCounSelor();
    it('平台顾问登录', async function () {
        await yssLogin.platfrom()
        const newCounSelor = await counSelorManage.getInstanceCounSelor()
        const res = await yssLogin.platfrom({
            loginName: newCounSelor.counSelorMain.shenFenZH,
            password: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 123456,
        })
        console.log(res);
    });

});