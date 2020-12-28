const evalManage = require('../../help/eval/evaluationManage')
const teacherManage = require('../../help/eval/evalTeacherManage')
const yssLogin = require('../../help/base/yssLogin');
const {
    common
} = require('../../../lib/index');
const { slice } = require('lodash');
const doc = require("../../data/doc.json");
const caps = require("../../../data/caps");

describe('评画老师', async function () {
    let teacher;
    this.timeout(TESTCASE.timeout);
    const eval = evalManage.setupEvaluation();
    before('平台登录', async function () {
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
        // 获取评画老师
        teacher = await teacherManage.returnTeacher();
        console.log(teacher);
    });
    describe('考生创建评画', async function () {
        before('保存评画', async function () {
            await yssLogin.clientLogin({
                loginName: '330350',
                password: 'Csk001',
            })
            // 保存评画
            await eval.saveEvaluation({
                data: {
                    m: "",
                    p: {
                        teacherId: teacher.teacherId,
                        teacherUserId: teacher.userId,
                        teacherName: teacher.teacherName,
                        classId: teacher.classId,
                        className: teacher.className,
                        profId: 1,
                        profName: teacher.profTag.split(',')[0],
                        paintUrl: doc[caps.name].school[common.getRandomNum(0, doc.test.school.length)],
                        // paintUrl: "http://img.artstudent.cn/pr/2020-10-09/c2a151e21d294425a0aa733b0271f842.jpg",
                        describe: common.getRandomContent(10)
                    }
                },
                ticket: TICKET
            })

            // 创建订单
            await eval.saveEvalOrder();
            // 支付
            await eval.pay()
        });
        it('用户查看评画列表', async function () {
            await eval.queryMyEvaluationAresst()
        });
    });
});