const teacherManage = require('../../help/eval/evalTeacherManage')
const yssLogin = require('../../help/base/yssLogin');
const {
    common
} = require('../../../lib/index');

describe.skip('评画老师', async function () {
    this.timeout(TESTCASE.timeout);
    const teacher = teacherManage.setupTeacher();
    before('运营主管登录', async function () {
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
    });
    describe('新增评画老师', async function () {
        before('新增', async function () {
            await teacher.saveTeacher();
        });
        it('查询评画老师列表', async function () {
            await teacher.getTeacherList();
        });

    });
    // describe('删除评画老师', async function () {
    //     before('删除', async function () {
    //         await teacher.deleteTeacher();
    //     });
    // });
});