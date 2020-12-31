const yssLogin = require('../../help/base/yssLogin');
const xyk = require('../../../reqApi/app/xyk');
const prob = require('../../../reqApi/app/prob');
const { common } = require('../../../lib/index');

describe('志愿视频', async function () {
    before('用户登录', async function () {
        await yssLogin.clientLogin({
            loginName: 'xyf201',
            password: 'Csk001',
        });
    });
    it('概率视频是否已单个购买', async function () {
        const res = await xyk.probVideoHasBuy(common.yssAppJson({
            goodsID: 11
        }))
        console.log(res);
    });

    it.skip('概率视频单个购买下单', async function () {
        const res = await xyk.buySingleVideo(common.yssAppJson({
            "goodsId": 185,
            "orgId": 200000
        }))
        console.log(res.params);
        console.log(res);
    });

    it('概率视频待支付订单Id获取', async function () {
        const res = await prob.getNotPayOrder(common.yssAppJson({
            goodsID: 11
        }))
        console.log(res);
    });

    it('概率视频是否已打包购买', async function () {
        const res = await prob.getPackVideoHasBuy(common.yssAppJson({
            goodsID: 11
        }));
        console.log(res);
    });

    it('打包概率视频价格', async function () {
        const res = await prob.getPackVideoPrice(common.yssAppJson({
            goodsID: 11,
            dingDanLX: 24,
        }))
        console.log(res);
    });

    it.skip('打包概率视频购买', async function () {
        const res = await prob.probPackVideoBuy(common.yssAppJson({
            goodsID: 11
        }));
        console.log(res);
    });

});