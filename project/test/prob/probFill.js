const probManage = require('../../help/prob/probManage');
const yssLogin = require('../../help/base/yssLogin');
describe('录取概率-完善信息', async function () {
    this.timeout(TESTCASE.timeout);
    // 初始化
    const prob = await probManage.setupProb();
    before('用户登录', async function () {
        loginAccount = {
            loginName: 'mihuan65',
            password: 'Csk001',
        }
        await yssLogin.clientLogin(loginAccount);
        // 获取用户信息
        await prob.getUser();
    });
    describe('设置修改次数', async function () {
        before('平台登录', async function () {
            await yssLogin.platfrom({
                userType: 'cbyy',
            });
        });
        it('查看概率用户', async function () {
            await prob.getProbUserInfo()
        });
        it('修改用户次数', async function () {
            await prob.saveModifyNumEdit()
        });
    });
    describe('完善录取概率信息', async function () {
        before('获取省份分数线', async function () {
            await prob.getAosAndProfTypeList();
        });
        it('完善信息', async function () {
            await prob.saveUser();
        });
        it('校验完善后信息', async function () {
            await prob.assertUserInfo();
        });
    });
});