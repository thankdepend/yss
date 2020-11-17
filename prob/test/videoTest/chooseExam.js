const yysLogin = require('../../help/yssLogin');
const stuApp = require('../../../reqApi/app/stu');
const {
    common
} = require('../../../lib/index');

/**
 * @alias 选考模式
 */

describe('选考', async function () {
    this.timeout(TESTCASE.timeout);
    before('用户登录', async function () {
        loginAccount = {
            loginName: 'xiongli40',
            password: 'csk001',
            device: 'm'
        }
        loginInfo = await yysLogin.clientLogin(loginAccount).then(res => res.result.datas.user);
        console.log('登录', loginInfo);

    });
    it('展示可选科目列表', async function () {
        await stuApp.allowChooseSubject({
            data: { "m": "", "p": { "riChengID": 23002 } },
            ticket: TICKET,
        });
    });
    it('保存选择科目', async function () {
        await stuApp.saveSubjectChoose({
            data: { "m": "", "p": { "riChengID": 11107871, "esIds": [1070, 1071, 1063, 1069], "baoKaoId": 2619837, "simulation": 1 } }
        })
    });
});