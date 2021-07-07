const {
    common
} = require('../lib/index');
const yssLogin = require('../prob/help/yssLogin');
const pay = require('../reqApi/app/pay');

// 测试环境
it('支付', async function () {
    await yssLogin.clientLogin({
        loginName: '330351',
        password: 'Csk001',
    });
    console.log(LOGINDATA);
    const payList = await pay.queryOrder({
        data: {
            m: "",
            p: {
                "includeSub": true
            }
        },
        ticket: TICKET
    }).then(res => res.result.datas.list);
    console.log(payList);
    let orderId = payList[0].dingDanID;
    console.log('订单id', orderId);
    // const payRes = await common.sendGet(`http://pay.51bm.net.cn/pay/alipay/testnotify.htm?orderId=${orderId}`);
    // console.log('支付信息', payRes);
});