const stuApp = require('../../../reqApi/app/stu');
const collegeManage = require('../../../project/help/applyComposite/collegeManage');
const yssLogin = require('../../../project/help/base/yssLogin');

describe('机构考试', async function () {
    this.timeout(TESTCASE.timeout);
    let college;
    before('获取学校', async function () {
        await yssLogin.platfrom()
        await yssLogin.clientLogin()
        college = await collegeManage.returnCollege()
    });
    // it('考试承诺书', async function () {
    //     await stuApp.queryExamPromise();
    // });
    it('查询机构详情信息', async function () {
        await yssLogin.clientLogin({
            loginName: 'jggly-mh',
            password: 'Csk001',
        })
        const res = await stuApp.queryOrgInfo({
            data: {
                m: '',
                p: {
                    xueXiaoID: college.collegeMain.xueXiaoID,
                }
            }, ticket: TICKET
        })
        console.log(res);
    });
    it('查询机构下面考试日程列表', async function () {
        const res = await stuApp.queryExamScheduleList({
            data: {
                m: '',
                p: {
                    curPage: 1,
                    pageSize: 10,
                    xueXiaoID: college.collegeMain.xueXiaoID,
                }
            }, ticket: TICKET
        });
        console.log(res);
    });
    it('机构扫描学生二维码报名考试', async function () {
        // ds加密
        console.log(college);
        await stuApp.orgScanQrCode({
            data: {
                m: '',
                p: {
                    riChengID: 1,
                    code: 10,
                }
            }, ticket: TICKET
        })
    });
});