const invigilateManage = require('../../help/applyComposite/videoTest/invigilateManage');
const yssLogin = require('../../help/base/yssLogin');
const { common } = require('../../../lib/index')

/**
 * @alias 监考笔试类考试
 */
describe('监考笔试', async function () {
    this.timeout(TESTCASE.timeout);
    let invigilate = invigilateManage.setupInvigilate()

    before('登录', async function () {
        await yssLogin.platfrom({
            loginName: '13166',
            password: 'Yss13166',
        })
        // 获取后台考题库
        await invigilate.getExaminationList()

        await yssLogin.clientLogin({
            loginName: 'mihuan32',
            password: 'Csk001',
        })

    });
    it('进考场', async function () {
        await invigilate.underwayExam();
    });
    describe('抽考题', async function () {
        before('抽取考题', async function () {
            await invigilate.checkTimeByType();
        });
        it('校验考题', async function () {
            await invigilate.checkTimeByTypeAssert()
        });
    });
});