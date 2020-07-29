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
const {
    stu
} = require('../../../data/caps');
const {
    random
} = require('lodash');


describe('考生报名', async function () {
    this.timeout(TESTCASE.timeout);
    let college = collegeManage.setupCollege(),
        apply = applyManage.setupApply(),
        getAsCollege;
    before('平台登录-志愿主管', async function () {
        platFromInfo = await yysLogin.platfrom(account[caps.name].ptzg);
        console.log('平台登录', platFromInfo);
    });
    describe('报名', async function () {

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
        describe('报名开始', async function () {
            let riChengArr = [],
                ranValue = '',
                riChengID = '';
            it('报名考试提交', async function () {
                for (let riCheng of getAsCollege.collegeMap.keys()) {
                    riChengArr.push(riCheng);
                };
                ranValue = common.getRandomNum(0, riChengArr.length - 1);
                const profParams = {
                    data: {
                        m: "",
                        p: {
                            riChengID: riChengArr[ranValue]
                        }
                    },
                    ticket: TICKET
                }
                riChengID = profParams.data.p.riChengID;
                await apply.saveProf(profParams)
            });
            it('创建报名订单', async function () {
                const baoKaoID = getAsCollege.collegeMap.get(riChengID).baoKaoID;
                let billParams = {
                    data: {
                        "m": "",
                        "p": {
                            "xueXiaoID": getAsCollege.collegeMain.xueXiaoID,
                            "baoKaoIDs": [baoKaoID],
                            "sIds": ""
                        }
                    },
                    ticket: TICKET
                }
                await apply.addProfOrder(billParams);
            });
        });

    });

});