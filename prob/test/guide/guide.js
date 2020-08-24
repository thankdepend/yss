const guideManage = require('../../help/guideManage');
const yssLogin = require('../../help/yssLogin');
const {
    common
} = require('../../../lib/index');

describe('报考指南', async function () {
    this.timeout(TESTCASE.timeout);
    const guide = guideManage.setupGuide();
    it('运营主管登录', async function () {
        await yssLogin.clientLogin({
            loginName: 'xyf12',
            password: 'ysk002',
        })
    });
    it('保存指南用户', async function () {
        await guide.saveGuideUser();
    });
    it('指南首页公告列表', async function () {
        await guide.getAnnouceList();
    });
    it('指南统考类型列表', async function () {
        await guide.getGuideUnifiedTypeList();
    });
    it('指南院校列表', async function () {
        await guide.getJointSchoolList();
    });
});