const factionalismManage = require('../../help/hlq/factionalismManage')
const yssLogin = require('../../help/base/yssLogin');
const { common } = require('../../../lib/index');
const baseInfo = require('../../help/base/getBaseInfo');
const waterFullManage = require('../../help/hlq/waterFullManage');

describe('圈子', async function () {
    this.timeout(TESTCASE.timeout);
    const faction = factionalismManage.setupFactionalism();
    const waterFull = waterFullManage.setupWaterFull();
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
            await yssLogin.clientLogin()
            // 获取呼啦圈用户信息
            await baseInfo.getHlqUserInfo();
        });
        describe('加入圈子', async function () {
            before('加入', async function () {
                await faction.addFaction()
            });
            it('客户端查询圈子列表', async function () {
                await faction.queryGroupsList();
            });
        });
        describe('保存贴子', async function () {
            before('保存', async function () {
                // console.log(faction);
                await waterFull.saveBrief({ groupID: faction.groupMain.groupID, groupName: faction.groupMain.groupName });
                await faction.updateGroupForWaterFull(1, 1);
                console.log(waterFull);
            });
            it('客户端贴子列表', async function () {
                await waterFull.waterfallListAssert();
            });
        });
        describe('删除帖子', async function () {
            before('删除', async function () {
                await waterFull.deletePost(waterFull.postID);
                await faction.updateGroupForWaterFull(-1, 0);
            });
            it('客户端贴子列表', async function () {
                await waterFull.waterfallListAssert({ del: true });
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