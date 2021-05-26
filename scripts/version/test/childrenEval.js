const kidevalApp = require('../../../reqApi/app/kideval');
const yssLogin = require('../../../project/help/base/yssLogin')

describe('少儿评画', async function () {
    this.timeout(TESTCASE.timeout)
    before('登录', async function () {
        await yssLogin.clientLogin()
    });
    it('语音转文字', async function () {
        const res = await kidevalApp.transAudio({
            data: {
                m: '',
                p: {
                    voiceAssess: "http://img.artstudent.cn/pr/2021-05-08/a8299b36b02649a392b8a784b34975aa.mp3"
                }
            }, ticket: TICKET
        })
        console.log('少儿评画', res);
    });
    it('少儿评画考生端作品列表', async function () {
        const res = await kidevalApp.queryEvaluationList({
            data: {
                m: '',
                p: {
                    hotFlag: 1
                }
            },
            ticket: TICKET
        })
        console.log(res);
        console.log('少儿评画考生端作品列表', res.result.datas.page);
    });
    it('少儿评画考生端作品详情', async function () {
        const res = await kidevalApp.queryEvaluationDetail({
            data: {
                m: '',
                p: {
                    evaluationId: 4
                }
            },
            ticket: TICKET
        })
        console.log(res);
        console.log('少儿评画考生端作品列表', res.result.datas.obj);
    });
    it('少儿评画老师登录', async function () {

    });
});