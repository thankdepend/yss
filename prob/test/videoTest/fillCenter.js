const yysLogin = require('../../help/yssLogin');
const fillCenter = require('../../../reqApi/app/fillCenter');
const {
    common
} = require('../../../lib/index');

describe.skip('视频上传', async function () {
    before('用户登录', async function () {
        loginAccount = {
            loginName: 'ceshiqzy',
            password: 'csk001',
            device: 'm'
        }
        loginInfo = await yysLogin.clientLogin(loginAccount).then(res => res.result.datas.user);
        console.log('登录', loginInfo);

    });
    it('测试上传', async function () {
        let ossData = {
            data: {
                "m": "",
                "p": {
                    "provinceNo": 510000
                }
            }
        };
        await fillCenter.ossUploadInfo({
            data: {
                ...(ossData.data)
            },
            ticket: TICKET,
        });
    });
});