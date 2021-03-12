const evalManage = require('../../help/eval/evaluationManage');
const teacherManage = require('../../help/eval/evalTeacherManage');
const pubilcManage = require('../../help/public/pubilcManage');
const yssLogin = require('../../help/base/yssLogin');
const teacherAccount = require('../../data/evalTeacher')
const {
    common
} = require('../../../lib/index');
const public = require('../../../reqApi/platfrom/public');

describe('评画老师', async function () {
    let teacher;
    this.timeout(TESTCASE.timeout);
    const eval = evalManage.setupEvaluation();
    const evalTeacher = teacherManage.setupTeacher();
    const public = await pubilcManage.setupPubilc();
    before('平台登录', async function () {
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
            // 支付
            await eval.pay()
        });
        it('用户查看评画列表', async function () {
            await eval.queryMyEvaluationAresst()
        });
    });
    describe.skip('老师评画', async function () {
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