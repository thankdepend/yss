const informationManage = require('../../help/hlq/informationManage');
const yssLogin = require('../../help/base/yssLogin');
const { common } = require('../../../lib/index');

describe('资讯', async function () {
    this.timeout(TESTCASE.timeout);
    const information = informationManage.setupInformation();
    before('运营主管登录', async function () {
        await yssLogin.platfrom({
            // loginName: 'yyzg',
            // password: 'csk001',
            userType: 'yyzg'
        })
        // console.log(PLAT_LOGINDATA);
    });
    describe('新增', async function () {
        before('新增资讯', async function () {
            const json = await informationManage.informationMockJson()
            await information.saveInfo(json);
        });
        it('查询资讯列表', async function () {
            await information.loadInfoListAssert();
        });
        it.skip('查询资讯详情', async function () {
            await information.loadInfoDetailAssert();
        });
    });
    describe('置顶', async function () {
        before('置顶资讯', async function () {
            await information.setTop();
        });
        it('查询资讯列表', async function () {
            await information.loadInfoListAssert();
        });
        it.skip('查询资讯详情', async function () {
            await information.loadInfoDetailAssert();
        });
    });
    describe('发布', async function () {
        before('发布资讯', async function () {
            await information.publish();
        });
        after('取消发布', async function () {
            await information.publish({
                off: true
            });
        });
        it('查询资讯列表', async function () {
            await information.loadInfoListAssert();
        });
        it.skip('查询资讯详情', async function () {
            await information.loadInfoDetailAssert();
        });
    });
    describe('客户端查看资讯', async function () {
        before('用户登录', async function () {
            await yssLogin.clientLogin();
        });
        it('客户端查看资讯列表', async function () {
            await information.quaryinformationList()
        });
    });
    describe('删除资讯', async function () {
        before('删除资讯', async function () {
            await yssLogin.platfrom({
                userType: 'yyzg'
            })
            await information.deleteInfo();
        });
        it('查询资讯列表', async function () {
            await information.loadInfoListAssert({
                del: true
            });
        });
        it.skip('查询资讯详情', async function () {
            await information.loadInfoDetailAssert();
        });
    });


});