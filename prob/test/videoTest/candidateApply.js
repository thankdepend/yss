const yysLogin = require('../../help/yssLogin');
const doc = require('../../data/doc.json');
const account = require('../../data/account');
const school = require('../../../reqApi/platfrom/school');
const {
    common
} = require('../../../lib/index');
const collegeManage = require('../../help/collegeManage');
const applyManage = require('../../help/applyManage');
const caps = require('../../../data/caps');


describe('考生报名', async function () {
    this.timeout(TESTCASE.timeout);
    let college = collegeManage.setupCollege();
    let apply = applyManage.setupApply();
    before('平台登录-志愿主管', async function () {
        platFromInfo = await yysLogin.platfrom(account[caps.name].ptzg);
        console.log('平台登录', platFromInfo);
    });
    describe('报名', async function () {
        let getAsCollege;
        // 不要频繁刷学校，不然会有人来找你的...
        it.skip('新增院校', async function () {
            const collegeParams = collegeManage.collegeMockJson()
            await college.saveCollege(collegeParams);
        });
        before('获取学校', async function () {
            await yysLogin.clientLogin({
                loginName: 'dingding001',
                password: 'Ysk001',
                device: 'm'
            });
            getAsCollege = await collegeManage.returnCollege();
            // console.log(getAsCollege);
        });
        it('搜索院校', async function () {
            await getAsCollege.searchCollegeAssert()
        });
        // 报名开始
        it('报名考试提交', async function () {
            let riChengArr = [];
            for (let riCheng of getAsCollege.collegeMap.keys()) {
                riChengArr.push(riCheng);
            };
            console.log('日程数组', riChengArr);
            const profParams = {
                data: {
                    m: "",
                    p: {
                        riChengID: riChengArr[common.getRandomNum(riChengArr.length - 1)]
                    }
                },
                ticket: TICKET
            }
            const res = await apply.saveProf(profParams)
            console.log('打印响应', res);

        });
    });

});