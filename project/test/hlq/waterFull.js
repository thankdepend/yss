const waterFullManage = require('../../help/hlq/waterFullManage');
const yssLogin = require('../../help/base/yssLogin');
const baseInfo = require('../../help/base/getBaseInfo');

describe.skip('帖子', async function () {
    const waterFall = waterFullManage.setupWaterFull();
    it('', async function () {
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
        const res = await waterFall._getRandomGroup();
        console.log(res);
        // await waterFall.waterFullDetailAssert()
    });
    // before('登录', async function () {
    //     await yssLogin.clientLogin()
    //     // 获取呼啦圈用户信息
    //     await baseInfo.getHlqUserInfo();
    // });
    // describe('发布帖子', async function () {
    //     before('发帖', async function () {
    //         await waterFall.saveBrief()
    //     });
    //     it('查看帖子详情', async function () {
    //         await waterFall.waterFullDetailAssert()
    //     });
    // });

});