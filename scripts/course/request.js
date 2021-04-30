/**
 * 下面实现我们第一个接口请求
 */
const yssLogin = require('../../project/help/base/yssLogin');
const { common } = require('../../lib/index');

describe('登录', async function () {
    it('登录请求', async function () {
        await yssLogin.platfrom();
    });
});

// describe('登录', async function () {
//     it('登录请求', async function () {
//         let loginData = {
//             loginName: 'mihuan1',
//             password: 'Csk001'
//         };
//         const res = await common.sendPost('http://user.51bm.net.cn/login', loginData);
//         console.log('打印登录信息', res);
//     });
// });