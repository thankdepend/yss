const abroadManage = require('../../help/abroad/abroadManage');
const yssLogin = require('../../help/base/yssLogin')
const schoolTypeManage = require('../../help/abroad/schoolTypeManage');

describe('留学', async function () {
    const abroad = abroadManage.setupAbroad();
    const schoolType = schoolTypeManage.setupSchoolType();
    before('登录', async function () {
        await yssLogin.platfrom({
            userType: 'lxyy'
        })
        // console.log(PLAT_LOGINDATA);
    });
    describe('新增/编辑留学院校', async function () {
        before('保存院校', async function () {
            const json = abroadManage.abroadMockjson();
            await abroad.saveAbroadSchool(json)
        });
        it('查询留学院校列表', async function () {
            await abroad.getAbroadSchoolList();
        });
        describe('客户端查看', async function () {
            before('用户登录', async function () {
                await yssLogin.clientLogin();
            });
            it('客户端查看留学院校列表', async function () {
                await abroad.getStudySchoolList()
            });
        });

    });
    describe.skip('留学院校类别', async function () {
        before('新增类别', async function () {
            await yssLogin.platfrom({
                userType: 'lxyy'
            })
        });
        describe('新增类别', async function () {
            before('新增', async function () {
                await schoolType.saveWishschooltype();
            });
            it('查询类别列表', async function () {
                await schoolType.wishSchoolTypeListAssert();
            });
        });
        describe('删除类别', async function () {
            before('删除类别', async function () {
                await schoolType.deleteWishschooltype();
            });
            it('查询类别列表', async function () {
                await schoolType.wishSchoolTypeListAssert({
                    del: true
                });
            });
        });


    });
});