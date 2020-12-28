const yssLogin = require('../../help/base/yssLogin');
const stu = require('../../../reqApi/app/stu');

// 需要一个已报名的人
describe('客观题', async function () {
    before('考生登录', async function () {
        await yssLogin.clientLogin({
            loginName: '330331',
            password: 'Csk001',
        });
    });
    it('查询专业列表', async function () {
        const res = await stu.queryExamProf({
            data: {
                m: '',
                p: {}
            }, ticket: TICKET
        })
        console.log(res);
    });
    it('查询科目视频信息列表', async function () {
        const res = await stu.querySubjectVideoInfo({
            data: {
                m: "",
                p: {
                    riChengId: 11107838,
                    riChengID: 11107838,
                    baoKaoId: 2619449,
                    simulation: 0
                }
            }, ticket: TICKET
        })

        console.log('响应', res);
        console.log('请求头', res.params);
    });
    it.skip('', async function () {
        await stu.saveStudentExamStatus({
            data: {
                "m": "",
                "p": {
                    "esId": 903,
                    "baoKaoId": 2619449,
                    "examStatus": 100
                }
            }
        })
    });
});