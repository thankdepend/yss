const yssLogin = require('../../help/yssLogin');
const baseInfo = require('../../help/getBaseInfo');
const account = require('../../data/account');
const {
    common
} = require('../../../lib/index');
const crmManage = require('../../help/crmManage');
const argv = require('yargs').argv;

describe('留学部客户系统管理', async function () {
    this.timeout(TESTCASE.timeout);
    const crm = crmManage.setupCrm();
    before('crm登录ticket获取', async function () {
        const res = await baseInfo.getCrmTicket({
            loginName: account[argv.env].crm2.loginName
        });
        console.log(account[argv.env].crm2);
        console.log(res);
        if (argv.env == 'pre') {
            const a = await yssLogin.platfrom({
                // loginName: 'zyzg-lx',
                // password: 'Csk001'
                userType: 'crm2'
            })
            console.log('平台登录', a);
        } else {
            if (res == true) {
                const a = await yssLogin.platfrom({
                    // loginName: 'zyzg-lx',
                    // password: 'Csk001'
                    userType: 'crm2'
                })
                console.log('平台登录', a);
            }
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
                await crm.publicListCustomerAssert({
                    customerSource: 1
                });
            });
        });
        describe('留学咨询评论', async function () {
            before('添加', async function () {
                await crm.addInfoComment();
            });
            it('公海-线索列表', async function () {
                await crm.publicListCustomerAssert({
                    customerSource: 2
                });
            });
        });
        describe('留学私信咨询发送CRM', async function () {
            before('添加', async function () {
                await crm.wishPrivatechat();
            });
            it('公海-线索列表', async function () {
                await crm.publicListCustomerAssert({
                    customerSource: 3
                });
            });
        });
    });


});