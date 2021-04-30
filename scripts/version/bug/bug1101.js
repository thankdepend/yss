const AppAdvert = require('../../../../reqApi/app/advert')
const school = require('../../../../reqApi/platfrom/school')
const yssLogin = require('../../../help/base/yssLogin')
const user = require('../../../../reqApi/platfrom/user')
const stuApp = require('../../../../reqApi/app/stu');

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
describe.skip('测试', async function () {
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
            shenFenZH: '50010119700307629X',
            // kaoShengHao: 20500102011002,
            kaoShengHao: 20500102011004,
            shouJiHao: 13221197204,
            yongHuKL: 'Csk001',
            agginYongHuKL: 'Csk001',
            authCode: '1%5$Y#0@3^x*1#7Y8%0s%s',
            // sid: '6a4a2eeda1c54a19a8a75c2605a83ce7',
        })
        console.log(res);
    });
});

describe.skip('测试', async function () {
    this.timeout(TESTCASE.timeout);
    let baoKaoID;
    before('登录', async function () {
        await yssLogin.clientLogin({
            loginName: 'mihuan4',
            password: 'Csk001',
        });
    });
    it.skip('查询专业', async function () {
        const res = await stuApp.getProf({
            data: {
                m: '',
                p: {
                    xueXiaoID: 13166,
                    baoKaoBZList: [1, 2, 3]
                }
            },
            ticket: TICKET
        });
        console.log(res.result.datas.list);
    });
    it('查询科目列表', async function () {
        const res = await stuApp.querySubjectVideoList({
            data: {
                m: '',
                p: {
                    riChengId: 11108259,
                    riChengID: 11108259,
                    baoKaoId: 2620672,
                    simulation: 0,
                }
            }, ticket: TICKET
        })
        // console.log(res);
        console.log(res.result.datas.data);
    });
    it.skip('选考模式模拟考科目列表', async function () {
        const res = await stuApp.stuVideoSubjectList({
            data: {
                "m": "",
                "p": {
                    "riChengID": 11108286
                }
            },
            ticket: TICKET
        })
        // console.log(res.params);
        console.log(res);
    });
})

describe('测试2', async function () {
    before('登录', async function () {
        const res = await yssLogin.platfrom({
            loginName: '13221197201',
            password: 'Csk001',
        }); console.log(res);
    });
    it('绑定证件号', async function () {
        const res = await user.zhengjianBind({
            // shenFenZH: `<script>alert(20973)</script>`,
            // ticket: PLAT_TICKET
        })
        console.log(res);
    });
});