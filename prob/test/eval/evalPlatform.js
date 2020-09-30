const yssLogin = require('../../help/yssLogin');
const eval = require('../../../reqApi/platfrom/eval')

describe('评画', async function () {
    before('登录', async function () {
        await yssLogin.platfrom({
            // loginName: '330325',
            // password: 'Csk001',
            userType: 'yyzg'
        });
    });
    it('查看老师信息', async function () {
        const res = await eval.getTeacherInfo({
            ticket: PLAT_TICKET
        });
        console.log(res);
    });
    it('获取评画列表', async function () {
        const res = await eval.getEvaluationList({
            ticket: PLAT_TICKET
        });
        console.log(res);
    });
    it('获取打分项列表', async function () {
        const res = await eval.getScoreItemList({
            classId: 1,
            profId: 1,
            ticket: PLAT_TICKET
        });
        console.log(res);
    });
    it('获取banner信息', async function () {
        await eval.getEvalBanner({
            ticket: PLAT_TICKET
        });
    });
    it.skip('提交批改', async function () {
        const res = await eval.submitEvaluation()
        console.log(res);
    });
});