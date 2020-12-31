const teacherManage = require('../../help/eval/evalTeacherManage')
const yssLogin = require('../../help/base/yssLogin');
const {
    common
} = require('../../../lib/index');

describe('评画老师', async function () {
    this.timeout(TESTCASE.timeout);
    const teacher = teacherManage.setupTeacher();
    before('运营主管登录', async function () {
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
    });
    describe('新增评画老师', async function () {
        before('新增', async function () {
            await teacher.saveTeacher({
                ticket: PLAT_TICKET
            });
        });
        it('查询评画老师列表', async function () {
            await teacher.getTeacherList({
                ticket: PLAT_TICKET
            });
        });

    });
});