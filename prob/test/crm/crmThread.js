const yssLogin = require('../../help/yssLogin');
const baseInfo = require('../../help/getBaseInfo');
const {
    common
} = require('../../../lib/index');
const crmManage = require('../../help/crmManage');

describe('留学部客户系统管理', async function () {
    this.timeout(TESTCASE.timeout);
    const crm = crmManage.setupCrm();
    before('登录', async function () {
        const res = await baseInfo.getCrmTicket();
        if (res == true) {
            await yssLogin.platfrom({
                loginName: 'zyzg-mh2',
                password: 'Csk001',
                // loginName: 'zyzg-lx',
                // password: 'Csk001'
                // userType: 'crm'
            })
            console.log('登录信息', PLAT_LOGINDATA);
        }
    });
    describe('添加公海信息', async function () {
        before('用户登录', async function () {
            await yssLogin.clientLogin({
                loginName: '330342',
                password: 'Csk001'
            });
        });
        describe('添加意向征集表', async function () {
            before('添加', async function () {
                await crm.addStudycollect();
            });
            it('公海-线索列表', async function () {
                await crm.publicListCustomerAssert();
            });
        });
        describe('留学咨询评论', async function () {
            before('添加', async function () {
                await crm.addInfoComment();
            });
            it('公海-线索列表', async function () {
                await crm.publicListCustomerAssert();
            });
        });
        describe('留学私信咨询发送CRM', async function () {
            before('添加', async function () {
                await crm.addStudycollect();
            });
            it('公海-线索列表', async function () {
                await crm.publicListCustomerAssert();
            });
        });
    });


});