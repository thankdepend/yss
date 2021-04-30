/** 
 * 利用脚本在后台关系系统注册一个用户，并断言它的成功
 */
const yssLogin = require('../../project/help/base/yssLogin');
const user = require('../../reqApi/platfrom/user')
const { common } = require('../../lib/index');

describe('注册', async function () {
    let params = {
        yongHuMing: `mihuan1000`,
        yongHuKL: 'Csk001',
        agginYongHuKL: 'Csk001',
        yongHuLB: 100,
        XinXiYT: 1,
    };
    before('平台管理员登录', async function () {
        await yssLogin.platfrom();
    });
    // it('注册', async function () {
    //     params.ticket = PLAT_TICKET;
    //     const res = await user.saveUser(params)
    //     console.log('打印注册结果', res);
    // });
    it('查看注册结果', async function () {
        const res = await user.getUserList({
            shenFenZH: params.yongHuMing,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList[0]);
        console.log(res);
        let exp = Object.assign(params, {
            shenFenZH: params.yongHuMing.toUpperCase()
        })
        common.isApproximatelyEqualAssert(exp, res, ['yongHuMing', 'yongHuKL'])
    });

});