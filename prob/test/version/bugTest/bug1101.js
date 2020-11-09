const AppAdvert = require('../../../../reqApi/app/advert')
const school = require('../../../../reqApi/platfrom/school')
const yssLogin = require('../../../help/yssLogin')
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
    before('登录', async function () {
        const res = await yssLogin.platfrom({
            loginName: '10020',
            password: 'ysk002',
        });
        console.log(res);
    });
    it('考试工具列表', async function () {
        const res = await school.utilExamList({
            ticket: PLAT_TICKET
        });
        console.log(res);
    });
});