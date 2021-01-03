const yysLogin = require('../../help/base/yssLogin');
const wishFill = require('../../../reqApi/app/wishFill');
const wish = require('../../../reqApi/app/wish');
const { common } = require('../../../lib/index');
const provinceScoreLine = require('../../../reqApi/app/provinceScoreLine');
const basicData = require('../../../data/basicData');
const check = require('../../../lib/assert');
const calculate = require('../../../lib/calculate');
const platfromProb = require('../../../reqApi/platfrom/prob');


describe.skip('录取概率首页', function () {
    this.timeout(TESTCASE.timeout);
    let loginInfo, ModifyNum, time = Date.now();;
    before('登录', async function () {
        // 需要登录的用户，默认有用户，可以不传
        const loginAccount = {
            // loginName: 'xyf177',
            // password: 'Csk001', 
            // device: 'm'
        }
        loginInfo = await yysLogin.clientLogin(loginAccount).then(res => res.result.datas.user);
    });
    it('首页公告', async function () {
        const res = await wishFill.getBulletinList({
            data: {
                "p": {},
                "m": ""
            },
            ts: 1591060573972,
            ticket: TICKET
        })
    });
});