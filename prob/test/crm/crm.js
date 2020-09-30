const crm = require('../../../reqApi/platfrom/crm');
const wishApp = require('../../../reqApi/app/wish');
const baseInfo = require('../../help/getBaseInfo');
const yssLogin = require('../../help/yssLogin');
const account = require('../../data/account');
const {
    common
} = require('../../../lib/index');
const info = require('../../../reqApi/app/info');
const argv = require('yargs').argv;

describe('留学部客户系统管理', async function () {
    this.timeout(TESTCASE.timeout);
    let willCountryList = ['英国', '韩国', '俄罗斯', '意大利', '德国', '日本', '美国', '澳大利亚', '其他'];
    before('crm登录ticket获取', async function () {
        const res = await baseInfo.getCrmTicket({
            loginName: account[argv.env].crm2.loginName
        });
        // console.log(res);
        if (argv.env == 'pre') {
            const a = await yssLogin.crmLogin({
                // loginName: 'zyzg-lx',
                // password: 'Csk001'
                userType: 'crm2'
            })
            console.log('平台登录', a);
        } else {
            if (res == true) {
                const a = await yssLogin.platfrom({
                    // loginName: 'zyzg-lx',
                    // password: 'Csk001'
                    userType: 'crm2'
                })
                console.log('平台登录', a);
            }
        }

    });
    describe.skip('添加公海信息', async function () {
        // 5种场景
        before('用户登录', async function () {
            await yssLogin.clientLogin({
                loginName: 'dingding002',
                password: 'Ysk001'
            });
        });
        describe('添加意向征集表', async function () {
            let proFessReq;
            before('添加', async function () {
                const professionIdList = [1, 14, 15, 16, 17, 10]

                const randomProfessID = professionIdList[common.getRandomNum(0, professionIdList.length - 1)];
                const res = await wishApp.addStudycollect({
                    data: {
                        m: '',
                        p: {
                            userName: `mh-${common.getRandomStr(4)}`,
                            professionId: randomProfessID,
                            professionRemark: randomProfessID == 1 ? '纯艺方向' : randomProfessID == 14 ? '设计方向' : randomProfessID == 15 ? '传媒方向' : randomProfessID == 16 ? '音乐' : randomProfessID == 17 ? '舞蹈' : randomProfessID == 10 ? '其他' : '',
                            willCountry: willCountryList[common.getRandomNum(0, willCountryList.length - 1)],
                            phoneNumber: common.getRandomMobile(),
                            willTakeExam: common.getRandomNum(1, 3), // 是否参加高考:1参加，2不参加，3待定
                            studyBudget: common.getRandomNum(1, 4), // 预算类型
                            profAvgScore: common.getRandomNum(1, 300), // 专业平均分
                            cultureAvgScore: common.getRandomNum(1, 100), // 文化平均分
                            parentPhone: common.getRandomMobile()
                        }
                    },
                    ticket: TICKET
                });
                proFessReq = res.params;
                console.log(res);
                console.log(proFessReq);
            });
            it('查询公海线索列表', async function () {
                const res = await crm.publicListCustomer({
                    curPage: 1,
                    pageSize: 10,
                    customerType: 1,
                    receiveStatus: 2,
                    queryStartTime: 0,
                    queryEndTime: 0,
                    sortFiledStr: 'createdOn',
                    customerSource: 1,
                    ticket: PLAT_TICKET
                }).then(res => res.result.datas)
                console.log('公海列表', res);
                // const r = res.page.dataList.find(obj => obj.customerRealName == proFessReq.data.p.userName)
                // console.log(r);
            });
        });
        describe('留学咨询评论', async function () {
            before('新增留学咨询评论', async function () {
                // 艺术留学 -> 首页资讯
                const studyAbroadList = await info.getStudyAbroad({
                    data: {
                        "p": {
                            "provinceCode": "330000",
                            "infoCategoryID": "6", // 留学为6
                            "curPage": "1",
                            "pageSize": "10",
                            "topicID": "6"
                        },
                        "m": ""
                    },
                    ticket: TICKET
                }).then(res => res.result.datas.page.dataList)
                console.log('studyAbroadList', studyAbroadList);
                const ranInfo = studyAbroadList[common.getRandomNum(0, studyAbroadList.length - 1)].infoID

                // app首页 -> 留学资讯
                // await info.queryInfoList()
                const addData = {
                    // 写死一个帖子
                    data: {
                        "m": "",
                        "p": {
                            // infoID: ranInfo,
                            infoID: '15868',
                            "infoCategoryID": "6",
                            'infoCategoryName': '留学',
                            // "infoID": studyAbroadList[common.getRandomNum(0, studyAbroadList.length - 1)].infoID,
                            // "infoTitle": studyAbroadList[common.getRandomNum(0, studyAbroadList.length - 1)].infoTitle,
                            infoTitle: '留学？？测试标题',
                            "content": common.getRandomContent(20)
                        }
                    },
                    ticket: TICKET
                }
                const addCommentRes = await info.addInfoComment(addData);
                console.log(addCommentRes);
                console.log(addCommentRes.params.data);
            });
            it('查询公海线索列表', async function () {
                const res = await crm.publicListCustomer({
                    curPage: 1,
                    pageSize: 10,
                    customerType: 1,
                    receiveStatus: 2,
                    queryStartTime: 0,
                    queryEndTime: 0,
                    sortFiledStr: 'createdOn',
                    ticket: PLAT_TICKET
                }).then(res => res.result.datas)
                const r = res.page.dataList[0]
                console.log(r);
            });
        });

        describe('留学私信咨询发送CRM', async function () {
            let wishPrivatechatData;
            before('新增留学私信咨询发送CRM', async function () {
                wishPrivatechatData = await info.wishPrivatechat({
                    data: {
                        m: "",
                        p: {
                            customerUserId: "70000145",
                            customerMobile: common.getRandomMobile(),
                            customerNickName: `mh-${common.getRandomStr(4)}`,
                            customerIdCard: `${common.getRandomNum(100000000,9999999999)}`,
                            extendsJson: JSON.stringify({
                                countryName: willCountryList[common.getRandomNum(0, willCountryList.length - 1)],
                                profName: '室内设计'
                            })
                        }
                    },
                    ticket: TICKET
                })
                console.log(wishPrivatechatData);
                console.log(wishPrivatechatData.params.data);
            });
            it('查询公海线索列表', async function () {
                const res = await crm.publicListCustomer({
                    curPage: 1,
                    pageSize: 10,
                    customerType: 1,
                    receiveStatus: 2,
                    queryStartTime: 0,
                    queryEndTime: 0,
                    sortFiledStr: 'createdOn',
                    ticket: PLAT_TICKET
                }).then(res => res.result.datas)
                const r = res.page.dataList.find(obj => obj.customerMobile == wishPrivatechatData.params.data.p.customerMobile)
                // console.log('1', wishPrivatechatData.params.data.p.customerMobile);
                // console.log('2', res.page.dataList[0].customerMobile);

                // console.log(r);
            });
        });

    });

    describe('添加消息列表信息', async function () {
        before('机构管理员登录', async function () {
            await yssLogin.platfrom({
                loginName: 'zyzg-mh2',
                password: 'Csk001'
            })
        });
        it('分配用户', async function () {
            // 公海捞数据
            const publicSea = await crm.publicListCustomer({
                curPage: 1,
                pageSize: 10,
                customerType: 1,
                receiveStatus: 2,
                queryStartTime: 0,
                queryEndTime: 0,
                sortFiledStr: 'createdOn',
                ticket: PLAT_TICKET
            }).then(res => res)
            console.log(publicSea);
            // const res = await crm.distributeCustomer();
            // console.log(res);
        });
    });

});