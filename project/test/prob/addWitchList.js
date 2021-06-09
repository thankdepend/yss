const yssLogin = require('../../help/base/yssLogin');
const hulaquan = require('../../../reqApi/platfrom/hulaquan');
const prob = require('../../../reqApi/platfrom/prob');
const pool = require('../../../reqApi/platfrom/pool');
const { common } = require('../../../lib/index');
for (let i = 1; i <= 1; i++) {
    describe('添加概率白名单', async function () {
        let userId;
        before('C部运营登录', async function () {
            await yssLogin.platfrom({
                userType: 'cbyy'
            });
        });
        it('查询用户id', async function () {
            const res = await hulaquan.getUserInfo({
                shenFenZH: `qinghe${i}`,
                ticket: PLAT_TICKET
            })
            console.log(res);
            userId = res.result.datas.page.dataList[0].yongHuID
        });
        // it('查询平台所有用户', async function () {
        //     await prob.queryAllUser();
        // });
        it('保存概率白名单', async function () {
            const res = await pool.saveWhiteBlack({
                userID: userId,
                roleTag: 1,
                nickName: `蜜獾概率白名单用户${common.getRandomStr(5)}`,
                activiyType: 5, // 5为录取概率
                type: 1,  // 1为白，2为黑
                resourceId: '',
                tryEndDate: common.getCurrentTimeAfter(1000),
                remark: '备注测试',
                ticket: PLAT_TICKET
            });
            console.log(res);
        });
        it('查询用户完善信息内容', async function () {
            const res = await prob.queryAllUser({
                userID: userId,
                ticket: PLAT_TICKET
            })
            console.log(res.result.datas.page);
        });
        // it('增加修改次数', async function () {

        // });
    });
}


describe.skip('添加指南白名单', async function () {
    let userId;
    before('C部运营登录', async function () {
        await yssLogin.platfrom({
            userType: 'cbyy'
        });
    });
    it('查询用户id', async function () {
        const res = await hulaquan.getUserInfo({
            shenFenZH: 'xiongli30',
            ticket: PLAT_TICKET
        })
        console.log(res);
        userId = res.result.datas.page.dataList[0].yongHuID
    });
    // it('查询平台所有用户', async function () {
    //     await prob.queryAllUser();
    // });
    it('保存概率白名单', async function () {
        const res = await pool.saveWhiteBlack({
            userID: userId,
            roleTag: 1,
            nickName: `蜜獾指南白名单用户${common.getRandomStr(5)}`,
            activiyType: 4, // 4为报考指南
            type: 1,  // 1为白，2为黑
            resourceId: '',
            tryEndDate: common.getCurrentTimeAfter(1000),
            remark: '备注测试',
            ticket: PLAT_TICKET
        });
        console.log(res);
    });
});