const yssLogin = require('../../help/base/yssLogin');
const xyk = require('../../../reqApi/app/xyk');
const prob = require('../../../reqApi/app/prob');
const pay = require('../../../reqApi/app/pay');
const argv = require('yargs').argv;
const {
    common
} = require('../../../lib/index');
const { expect } = require('chai');

describe('电子周刊', async function () {
    this.timeout(TESTCASE.timeout)
    let orderId;
    before('用户登录', async function () {
        await yssLogin.clientLogin();
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
        if (argv.env == 'pre') {
            expect(res.result.message).to.be.equal('调用失败')
        }
    });
});