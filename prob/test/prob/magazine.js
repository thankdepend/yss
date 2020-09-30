const yssLogin = require('../../help/yssLogin');
const xyk = require('../../../reqApi/app/xyk');
const prob = require('../../../reqApi/app/prob');
const pay = require('../../../reqApi/app/pay');
const {
    common
} = require('../../../lib/index');

describe('电子周刊', async function () {
    let orderId;
    before('用户登录', async function () {
        await yssLogin.clientLogin({
            loginName: '330366',
            password: 'Csk001',
        });
    });
    it('电子周刊商品价格列表', async function () {
        const res = await prob.magazinePriceList(common.yssAppJson({
            goodsID: 12
        }))
        console.log(res);
    });
    it('电子周刊到期时间查看', async function () {
        const res = await prob.userBuyed(common.yssAppJson());
        console.log(res);
    });
    it('电子周刊下单', async function () {
        const res = await prob.dynamicPriceBuy(common.yssAppJson({
            id: 1 // id:1~12代表1至12月
        }));
        orderId = res.result.datas.obj
        console.log(res);
    });
    it('支付', async function () {
        const res = await pay.payOrder(orderId);
        console.log('支付', res);
    });
});