const {
    common
} = require('../../../lib/index');
const user = require('../../../reqApi/platfrom/user');
const account = require('../../data/account');
const yysLogin = require('../../help/yssLogin');
const request = require('superagent');
const stu = require('../../../reqApi/app/stu');

describe('刷用户账号', async function () {
    before('平台登录', async function () {
        platFromInfo = await yysLogin.platfrom({
            loginName: 'mh01',
            password: 'Ysk002'
        });
        console.log('平台登录', platFromInfo);
    });
    it('创建考生号', async function () {
        for (let a = 50; a <= 100; a++) {
            let params = {
                yongHuMing: `dingding${a}`,
                yongHuKL: 'Ysk001',
                agginYongHuKL: 'Ysk001',
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
        }
    });
    it.skip('报名', async function () {
        for (let i = 0; i < 90; i++) {
            let loginAccount = {
                loginName: `dingding${i}`,
                password: 'csk001',
                device: 'm'
            }
            let loginInfo = await yysLogin.clientLogin(loginAccount).then(res => res.result.datas.user);
            const svRes = await stu.saveProf({
                data: {
                    "m": "",
                    "p": {
                        "riChengID": "11107442"
                    }
                },
                ticket: TICKET
            });
            console.log(`${i} --- 报名res`, svRes);
            common.delay(200)
        }
    });
});