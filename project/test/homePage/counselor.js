const counSelorManage = require('../../help/counSelorManage');
const yssLogin = require('../../help/yssLogin');
const baseInfo = require('../../help/getBaseInfo');
const user = require('../../../reqApi/platfrom/user');

const argv = require('yargs').argv;

describe('平台顾问', async function () {
    const counSelor = counSelorManage.setupCounSelor();
    before('平台顾问登录', async function () {
        await yssLogin.platfrom()
        // 随机取一个顾问
        const newCounSelor = await counSelorManage.getInstanceCounSelor();
        console.log(newCounSelor);
        // 设置该顾问为唯一的平台顾问
        const res = await yssLogin.platfrom({
            userType: 'ptzg'
        })
        const res2 = await user.saveUserSetup({
            setupID: 175,
            item: 'USER_ADVISER_LIST',
            itemName: '平台顾问数据',
            defaults: newCounSelor.counSelorMain.yongHuID, // 顾问id
            useFlag: 1,
            remark: '逗号分隔',
            ticket: PLAT_TICKET
        })

        console.log(res);
        console.log(res2);
    });
    it('注册用户', async function () {
        await yssLogin.regisClient();
    });
    it('平台顾问登录-平台端', async function () {
        const res = await yssLogin.platfrom({
            loginName: newCounSelor.counSelorMain.shenFenZH,
            password: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 123456,
        })
    });
});