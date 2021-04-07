const informationManage = require('../../help/hlq/informationManage');
const yssLogin = require('../../help/base/yssLogin');
const { common } = require('../../../lib/index');

describe('资讯', async function () {
    let json;
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
            json = await informationManage.informationMockJson()
            await information.saveInfo(json);
        });
        it('查询资讯列表', async function () {
            await information.loadInfoListAssert();
        });
        it('查询资讯详情', async function () {
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
        it('查询资讯详情', async function () {
            await information.loadInfoDetailAssert();
        });
    });
    describe('取消置顶', async function () {
        before('置顶资讯', async function () {
            await information.setTop();
        });
        it('查询资讯列表', async function () {
            await information.loadInfoListAssert();
        });
        it('查询资讯详情', async function () {
            await information.loadInfoDetailAssert();
        });
    });
    describe('发布', async function () {
        before('发布资讯', async function () {
            await information.publish();
        });
        it('查询资讯列表', async function () {
            await information.loadInfoListAssert();
        });
        it('查询资讯详情', async function () {
            await information.loadInfoDetailAssert();
        });
    });
    describe('取消发布', async function () {
        it('取消发布', async function () {
            await information.publish({
                off: true
            });
        });
        it('查询资讯列表', async function () {
            await information.loadInfoListAssert();
        });
        it('查询资讯详情', async function () {
            await information.loadInfoDetailAssert();
        });
    });
    describe('为不可评论资讯，后台追加评论', async function () {
        let errorMsg;
        before('添加评论', async function () {
            errorMsg = await information.addInfoComment();
        });
        it('断言评论', async function () {
            await information.commentAssert(errorMsg);
        });
    });
    describe('可评论资讯，后台追加评论', async function () {
        before('编辑帖子可评论', async function () {
            const editParams = Object.assign(
                json, {
                infoID: information.infoID,
                commentFlag: 1
            })
            await information.saveInfo(editParams);
        });
        it('添加评论', async function () {
            await information.addInfoComment();
        });
        it('断言评论', async function () {
            await information.commentAssert();
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
        it('查询资讯详情', async function () {
            await information.loadInfoDetailAssert({ del: true });
        });
    });


});