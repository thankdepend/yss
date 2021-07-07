const yssLogin = require('../../help/base/yssLogin')
const schoolInfoTypeManage = require('../../help/abroad/schoolInfoTypeManage');
const schoolInfoManage = require('../../help/abroad/schoolInfoManage');

describe('留学', async function () {
    const schoolInfoType = schoolInfoTypeManage.setupSchoolInfoType();
    const schoolInfo = schoolInfoManage.setupSchoolInfo();
    before('登录', async function () {
        await yssLogin.platfrom({ userType: 'lxyy' })
    });
    describe('留学资讯类别', async function () {
        before('登录', async function () {
            await yssLogin.platfrom({ userType: 'lxyy' })
        });
        describe('新增留学资讯类别', async function () {
            it('新增', async function () {
                await schoolInfoType.saveSchoolInfoType();
            });
            it('查询留学资讯类别列表', async function () {
                await schoolInfoType.schoolInfoTypeListAssert();
            });
        });
        describe('删除留学资讯类别', async function () {
            it('删除', async function () {
                await schoolInfoType.deleteSchoolInfoType();
            });
            it('查询留学资讯类别列表', async function () {
                await schoolInfoType.schoolInfoTypeListAssert();
            });
        });
    });
    describe('留学资讯', async function () {
        before('登录', async function () {
            await yssLogin.platfrom({ userType: 'lxyy' })
        });
        describe('新增留学资讯', async function () {
            it('新增', async function () {
                await schoolInfo.saveSchoolInfo();
            });
            it('查询留学资讯列表', async function () {
                await schoolInfo.schoolInfoListAssert();
            });
        });
        describe('删除留学资讯', async function () {
            it('删除', async function () {
                await schoolInfo.deleteSchoolInfo();
            });
            it('查询留学资讯列表', async function () {
                await schoolInfo.schoolInfoListAssert();
            });
        });
    });
});