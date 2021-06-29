const evalManage = require('../../help/eval/evaluationManage');
const teacherManage = require('../../help/eval/evalTeacherManage');
const pubilcManage = require('../../help/public/pubilcManage');
const orderManage = require('../../help/order/orderManage')
const yssLogin = require('../../help/base/yssLogin');
const {
    common
} = require('../../../lib/index');

describe('评画老师', async function () {
    let teacher;
    this.timeout(TESTCASE.timeout);
    // 初始化评画
    const eval = evalManage.setupEvaluation();
    // 初始化评画老师
    const evalTeacher = teacherManage.setupTeacher();
    // 初始化公共方法
    const public = await pubilcManage.setupPubilc();
    // 初始化订单
    const order = await orderManage.setupOrder();
    before('平台登录', async function () {
        this.timeout(TESTCASE.timeout);
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
        // 设定评画价格参数
        await public.saveEvalPrice();

        // 获取评画老师
        teacher = await teacherManage.returnTeacher();

        // 获取线上评画数据
        await yssLogin.onlineClientLogin({
            loginName: 'mihuan4',
            password: 'Xsk001',
            device: 'm'
        })
        await eval.getOnlinePic();
    });
    describe('考生创建评画', async function () {
        before('保存评画', async function () {
            await yssLogin.clientLogin({
                loginName: '330350',
                password: 'Csk001',
            })
            // 保存评画
            await eval.saveEvaluation(teacher)

            // 创建订单
            await eval.saveEvalOrder();

        });
        describe('支付前', async function () {
            after('切回用户', async function () {
                await yssLogin.clientLogin({
                    loginName: '330350',
                    password: 'Csk001',
                })
            });
            it('查看用户订单列表', async function () {
                await order.queryOrder();
            });
            it('查看后台订单列表', async function () {
                await yssLogin.platfrom({
                    userType: 'yyzg'
                });
                await order.assertPlatfromEvalListOrder({ orderId: eval.orderId })
            });
        });
        describe('支付评画', async function () {
            before('支付', async function () {
                // 支付
                await eval.pay()
            });
            it('用户查看评画列表', async function () {
                await eval.queryMyEvaluationAresst()
            });
        });

    });
    describe('老师评画', async function () {
        it('老师登录', async function () {
            const teacherAccount = await teacherManage.getTeacherAccount(teacher.teacherName)
            await yssLogin.clientLogin({
                loginName: teacherAccount.loginName,
                password: teacherAccount.password
            })
        });
        it('提交批改', async function () {
            await evalTeacher.submitEvaluation(eval)
        });
    });
});