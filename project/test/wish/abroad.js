const abroadManage = require('../../help/abroad/abroadManage');
const yssLogin = require('../../help/base/yssLogin')
const schoolTypeManage = require('../../help/abroad/schoolTypeManage');
const abrodProfManage = require('../../help/abroad/abrodProfManage');

describe('留学', async function () {
    const abroad = abroadManage.setupAbroad();
    const schoolType = schoolTypeManage.setupSchoolType();
    const abrodProf = abrodProfManage.setupAbrodProf();
    before('登录', async function () {
        await yssLogin.platfrom({
            userType: 'lxyy'
        })
    });
    describe('新增/编辑留学院校', async function () {
        let json;
        before('mockjson', async function () {
            json = abroadManage.abroadMockjson();
        });
        describe('新增院校', async function () {
            before('保存院校', async function () {
                await abroad.saveAbroadSchool(json)
            });
            it('查询留学院校列表', async function () {
                await abroad.getAbroadSchoolList();
            });
            it('客户端查看', async function () {
                await yssLogin.clientLogin();
                await abroad.getStudySchoolList()

            });
        });
        describe('编辑', async function () {
            let editjson;
            before('保存院校', async function () {
                editjson = _.cloneDeep(json)
                editjson.sellingPoint += 'edit'
                await abroad.saveAbroadSchool(editjson)
            });
            it('查询留学院校列表', async function () {
                await abroad.getAbroadSchoolList();
            });
            it('客户端查看', async function () {
                await abroad.getStudySchoolList()
            });
        });
        describe('删除', async function () {
            before('保存院校', async function () {
                await abroad.deleteAbroadSchool()
            });
            it('查询留学院校列表', async function () {
                await abroad.getAbroadSchoolList();
            });
            it('客户端查看', async function () {
                await abroad.getStudySchoolList()
            });
        });

    });
    describe('留学院校类别', async function () {
        before('登录', async function () {
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
                await schoolType.wishSchoolTypeListAssert();
            });
        });
    });
    describe('留学专业', async function () {
        before('登录', async function () {
            await yssLogin.platfrom({ userType: 'lxyy' })
        });
        describe('新增一级专业', async function () {
            it('新增', async function () {
                await abrodProf.saveAbroadProf(1);
            });
            it('查询类别列表', async function () {
                await abrodProf.abroadProfParentAssert();
            });
        });
        describe('新增二级专业', async function () {
            it('新增', async function () {
                await abrodProf.saveAbroadProf(2);
            });
            it('查询类别列表', async function () {
                await abrodProf.abroadProfParentAssert();
            });
        });
        describe('删除二级专业', async function () {
            it('删除', async function () {
                await abrodProf.deleteAbroadProf(2);
            });
            it('查询类别列表', async function () {
                await abrodProf.abroadProfSubAssert({ del: true });
            });
        });
        describe('删除一级专业', async function () {
            it('删除', async function () {
                await abrodProf.deleteAbroadProf(1);
            });
            it('查询类别列表', async function () {
                await abrodProf.abroadProfParentAssert({ del: true });
            });
        });

    });
});