const AppAdvert = require('../../../../reqApi/app/advert')
const school = require('../../../../reqApi/platfrom/school')
const yssLogin = require('../../../help/yssLogin')
const user = require('../../../../reqApi/platfrom/user')
describe.skip('验证bug', async function () {
    this.timeout(TESTCASE.timeout);
    it('获取广告', async function () {
        const res = await AppAdvert.checkAdvertise({
            data: {
                m: '',
                p: {}
            }
        })
        console.log(res);
    });
});
describe('测试', async function () {
    it('登录', async function () {
        const res = await yssLogin.cqSchLogin({
            schId: 65001,
            schName: '重庆市2020年艺术类专业统考',
            // cookieValue: '',
            loginName: '500101197003078690',
            password: 'Csk001',
            // authCode: '',
            // sid: 'a03b2b14772a4efb945de9a326b69a8a',
        });
        console.log(res);
    });
    it('重庆考试院资格考注册', async function () {
        const res = await user.cqRegister({
            schId: 65001,
            errPhone: '',
            errKaoShengHao: '',
            err: '',
            remark: '',
            // authCodeErr: '验证码错误',
            partPhone: '',
            zhengJianLX: 1,
            // shenFenZH: 500101197003078690,
            shenFenZH: 500101197003073152,
            // kaoShengHao: 20500102011002,
            kaoShengHao: 20500102011003,
            shouJiHao: 13221197203,
            yongHuKL: 'Csk001',
            agginYongHuKL: 'Csk001',
            authCode: `1%5$Y#0@3^x*1#7Y8%0s%s`,
            // sid: '6a4a2eeda1c54a19a8a75c2605a83ce7',
        })
        console.log(res);
    });
});