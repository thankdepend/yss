const yssLogin = require('../../project/help/base/yssLogin');
const doc = require('../../project/data/doc.json');
const account = require('../../project/data/account');
const school = require('../../reqApi/platfrom/school');
const {
    common
} = require('../../lib/index');
const collegeManage = require('../../project/help/applyComposite/collegeManage');
const applyManage = require('../../project/help/applyComposite/applyManage');
const orderManage = require('../../project/help/order/orderManage');
const caps = require('../../data/caps');
const argv = require('yargs').argv;

/**
 * @alias 报名
 */

describe('考生报名', async function () {
    this.timeout(TESTCASE.timeout);
    let college = collegeManage.setupCollege(),
        apply = applyManage.setupApply(),
        order = orderManage.setupOrder(),
        getAsCollege, baoKaoID;
    before('平台登录-平台主管', async function () {
        platFromInfo = await yssLogin.platfrom(account[caps.name].ptzg);
        console.log('平台登录', platFromInfo);
    });
    for (let i = 31; i <= 32; i++) {
        describe('报名', async function () {
            before('获取学校', async function () {
                await yssLogin.clientLogin({
                    loginName: `shuilai${i}`,
                    password: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 'Kfk001',
                    device: 'm'
                });
                // 获取学校信息
                const schoolId = argv.env == 'test' ? 31647 : argv.env == 'pre' ? 70355 : argv.env == 'online' ? 90201 : '';
                getAsCollege = await collegeManage.returnCollege(schoolId);
            });
            it('搜索院校', async function () {
                await getAsCollege.searchCollegeAssert()
            });
            // 报名开始

            describe('报名开始', async function () {
                let riChengArr = [],
                    ranValue = '',
                    riChengID = '',
                    applyMain = '';
                it('报名考试提交', async function () {
                    // 指定日程id,不指定时设置为0
                    let appointRiChengID = 11110035;
                    // await collegeManage.updateCollegeRiCheng(appointRiChengID)

                    // 随机一个日程
                    for (let riCheng of getAsCollege.collegeMap.keys()) {
                        riChengArr.push(riCheng);
                    };
                    ranValue = common.getRandomNum(0, riChengArr.length - 1);
                    // console.log('riChengArr', riChengArr);

                    const profParams = common.yssAppJson({
                        riChengID: appointRiChengID == 0 ? riChengArr[ranValue] : appointRiChengID,
                        // riChengID: riChengArr[ranValue],
                    });
                    riChengID = profParams.data.p.riChengID;
                    console.log('日程', riChengID);
                    console.log('获取map', getAsCollege.collegeMap);
                    let extraParams = {
                        yongHuID: LOGINDATA.userId,
                        zhuanYeID: getAsCollege.collegeMap.get(riChengID).zhuanYeID,
                        riChengID: riChengID,
                    }
                    // console.log('参数', extraParams);
                    applyMain = await apply.saveProf(profParams, extraParams)
                    baoKaoID = applyMain.baoMingMain.baoKaoID;
                });
                it('创建报名订单', async function () {
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
                    // console.log(billParams.data.p);
                    await apply.addProfOrder(billParams);
                });
                // it('查询订单', async function () {
                //     await order.orderProcessCenter()
                // });
            });
            describe('确认考试', async function () {
                it('在线确认列表', async function () {
                    await apply.getAffirmList();
                });
                it('在线确认', async function () {
                    const res = await apply.saveAffirm({
                        data: {
                            m: "",
                            p: {
                                baoKaoIDs: [baoKaoID],
                                xueXiaoID: getAsCollege.collegeMain.xueXiaoID,
                            }
                        }, ticket: TICKET
                    })
                    console.log('在线确认', res);
                });
            });



        });
    }
});