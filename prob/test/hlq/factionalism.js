const factionalismManage = require('../../help/hlq/factionalismManage')
const yssLogin = require('../../help/yssLogin');
const {
    saveType
} = require('../../../reqApi/platfrom/hulaquan');

describe('圈子', async function () {
    this.timeout(TESTCASE.timeout);
    const faction = factionalismManage.setupFactionalism();
    before('运营主管登录', async function () {
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
        // console.log(PLAT_LOGINDATA);
    });
    describe('新增圈子类型', async function () {
        before('新增', async function () {
            await faction.saveType();
        });
        it('查看圈子类型列表', async function () {
            await faction.groupsTypeListAssert();
        });
    });

    describe('新增圈子', async function () {
        before('新增', async function () {
            await faction.saveGroup();
        });
        it('查询圈子列表', async function () {
            await faction.groupListAssert();
        });
        it('圈子成员列表', async function () {
            await faction.groupUserListAssert()
        });
    });
    describe('解散圈子', async function () {
        before('解散', async function () {
            await faction.dissolveGroup();
        });
        it('查询圈子列表', async function () {
            await faction.groupListAssert();
        });
        it('圈子成员列表', async function () {
            await faction.groupUserListAssert()
        });
    });
    describe('删除圈子', async function () {
        before('删除', async function () {
            await faction.deleteGroup();
        });
        it('查询圈子列表', async function () {
            await faction.groupListAssert({
                del: true
            });
        });
        it('圈子成员列表', async function () {
            await faction.groupUserListAssert()
        });
    });

    describe('删除圈子类型', async function () {
        before('删除', async function () {
            await faction.delType();
        });
        it('查看圈子列类型表', async function () {
            await faction.groupsTypeListAssert({
                del: true
            });
        });
    });
    it.skip('发帖', async function () {
        await yssLogin.clientLogin({
            loginName: 'xyf3',
            password: 'ysk002',
        })
        await faction.saveBrief();
    });
});