const yssLogin = require('../../help/yssLogin');
const evalApp = require('../../../reqApi/app/eval');
const {
    common
} = require('../../../lib/index');
const pay = require('../../../reqApi/app/pay');

describe('评画', async function () {
    let evaluationData, evalOrderData;
    this.timeout(TESTCASE.timeout);
    before('登录', async function () {
        await yssLogin.clientLogin({
            loginName: '330340', // 老师账号 330325
            password: 'Csk001',
        })
    });
    it('获取老师信息', async function () {
        const res = await evalApp.getTeacherInfo({
            ticket: TICKET
        });
        console.log('获取老师信息', res.result.datas.obj);
    });
    it.skip('获取评画列表', async function () {
        const res = await evalApp.getEvaluationList(common.yssAppJson());
        console.log('获取评画列表', res.result.datas.page);
    });
    it.skip('获取打分项列表', async function () {
        const res = await evalApp.getScoreItemList(common.yssAppJson({
            classId: 1,
            profId: 1,
        }));
        console.log('获取打分项列表', res.result.datas.list);
    });
    it.skip('获取banner信息', async function () {
        const res = await evalApp.getEvalBanner({
            ticket: TICKET
        });
        console.log('获取banner信息', res);
    });
    it('保存评画信息', async function () {
        evaluationData = await evalApp.saveStuEvaluation({
            data: {
                m: "",
                p: {
                    teacherId: 3,
                    teacherUserId: 1040551,
                    teacherName: "猪猪",
                    classId: 1,
                    className: "美术类",
                    profId: 2,
                    profName: "色彩",
                    paintUrl: "http://img.artstudent.cn/pr/2020-10-09/c2a151e21d294425a0aa733b0271f842.jpg",
                    describe: common.getRandomContent(10)
                }
            },
            ticket: TICKET
        });
        console.log('保存评画', evaluationData);
    });
    it('提交订单', async function () {
        evalOrderData = await evalApp.commitEvaluationOrder({
            data: {
                m: '',
                p: {
                    evaluationId: evaluationData.result.datas.evaluationId,
                    teacherId: evaluationData.params.data.p.teacherId,
                    userDiscountsID: '',
                }
            } ,
            ticket: TICKET
        })
        console.log('订单', evalOrderData);

    });
    it('支付', async function () {
        const res = await pay.payOrder(evalOrderData.result.datas.orderId)
        console.log(res);
    });
    describe.skip('老师评画', async function () {
        before('老师登录', async function () {
            await yssLogin.clientLogin({
                loginName:'330325',
                password:'Csk001'
            })
        });
        it('提交批改', async function () {
            const res = await evalApp.submitEvaluation({
                data: {
                    m: '',
                    p: {
                        evaluationId: evaluationData.result.datas.evaluationId,
                        score: 20,
                        evaluationDetail: [{
                            commentStr: "垃圾桶太丑",
                            coordinateX: 472.0,
                            coordinateY: 358.0,
                            pointX: 0.437,
                            pointY: 0.2486,
                            type: 1,
                            voiceTime: 0
                        }],
                        scoreDetailList: [{
                            itemId: 5,
                            itemName: "自由发挥",
                            score: 3,
                            type: 1
                        }, {
                            itemId: 6,
                            itemName: "临摹",
                            score: 5,
                            type: 1
                        }],
                        teacherAssess: "差",
                        modifyPaintUrl: "http://img.artstudent.cn/pr/2020-09-30/872000ff7779451cbcc1a3fdbbc06e8b.jpg"
                    },
                },
                ticket: TICKET
            });
            console.log(res);
        });
    });
    
});