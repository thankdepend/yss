const yysLogin = require('../../help/yssLogin');
const doc = require('../../data/doc.json');
const account = require('../../data/account');
const school = require('../../../reqApi/platfrom/school');
const {
    common
} = require('../../../lib/index');
const collegeManage = require('../../help/collegeManage');
const applyManage = require('../../help/applyManage');
const orderManage = require('../../help/orderManage');
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
        order = orderManage.setupOrder(),
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
                loginName: 'dingding10',
                password: 'Csk001',
                device: 'm'
            });
            // 获取
            getAsCollege = await collegeManage.returnCollege(18157);
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
                // 随机一个日程
                for (let riCheng of getAsCollege.collegeMap.keys()) {
                    riChengArr.push(riCheng);
                };
                ranValue = common.getRandomNum(0, riChengArr.length - 1);
                console.log('riChengArr', riChengArr);
                const profParams = common.yssAppJson({
                    riChengID: riChengArr[ranValue]
                });
                riChengID = profParams.data.p.riChengID;
                await apply.saveProf(profParams)
            });
            it('创建报名订单', async function () {
                // 从随机的日程id找报考id

                console.log('日程', getAsCollege.collegeMap.get(riChengID));
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
            // it('查询订单', async function () {
            //     await order.orderProcessCenter()
            // });
        });
        describe('确认考试', async function () {
            it('在线确认', async function () {
                await apply.getAffirmList();
            });
        });

    });

});