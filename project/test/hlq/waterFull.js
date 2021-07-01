const waterFullManage = require('../../help/hlq/waterFullManage');
const yssLogin = require('../../help/base/yssLogin');
const baseInfo = require('../../help/base/getBaseInfo');

describe('帖子', async function () {
    const waterFall = waterFullManage.setupWaterFull();
    it('获取随机圈子', async function () {
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
        const groupId = await waterFall._getRandomGroup();
        console.log(groupId);
        // await waterFall.updateWater();
        // await waterFall.waterFullDetailAssert()
    });
    before('登录', async function () {
        await yssLogin.clientLogin()
        // 获取呼啦圈用户信息
        await baseInfo.getHlqUserInfo();
    });
    describe('发布帖子', async function () {
        before('发帖', async function () {
            await waterFall.saveBrief()
        });
        it('查看帖子详情', async function () {
            await waterFall.waterFullDetailAssert()
        });
    });

});