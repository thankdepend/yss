const factionalismManage = require('../../help/hlq/factionalismManage')
const yssLogin = require('../../help/yssLogin');
const {
    saveType
} = require('../../../reqApi/platfrom/hulaquan');
const common = require('../../../lib/common');
const baseInfo = require('../../help/getBaseInfo');

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
        it('圈子统计数据', async function () {
            await faction.singlenGroupDataAssert();
        });
    });
    describe('编辑圈子', async function () {
        before('编辑', async function () {
            await faction.saveGroup({
                remark: common.getRandomStr(2)
            });
        });
        it('查询圈子列表', async function () {
            await faction.groupListAssert();
        });
        it('圈子成员列表', async function () {
            await faction.groupUserListAssert()
        });
        it('圈子统计数据', async function () {
            await faction.singlenGroupDataAssert();
        });
    });
    describe('客户端发帖', async function () {
        before('登录', async function () {
            await yssLogin.clientLogin({
                loginName: 'xyf3',
                password: 'ysk002',
            })
            await baseInfo.getHlqUserInfo();
        });
        describe('加入圈子', async function () {
            before('加入', async function () {
                await faction.addFaction()
            });
            it('客户端查询圈子列表', async function () {
                faction.queryGroupsList();
            });
        });
        describe('保存贴子', async function () {
            before('保存', async function () {
                await faction.saveBrief();
            });
            it('客户端贴子列表', async function () {
                await faction.waterfallListAssert();
            });
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
        it('圈子统计数据', async function () {
            await faction.singlenGroupDataAssert();
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
        it('圈子统计数据', async function () {
            await faction.singlenGroupDataAssert();
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
});