const yssLogin = require('../../help/base/yssLogin');
const notice = require('../../../reqApi/platfrom/notice');
const { common } = require('../../../lib');


describe('消息推送', async function () {
    this.timeout(TESTCASE.timeout);
    let firstQuery;
    before('用户登录', async function () {
        // 获取用户id
        await yssLogin.clientLogin()

        await yssLogin.platfrom({
            userType: 'yyzg'
        });
        // 只是为了校验businessId
        firstQuery = await notice.loadPushData({
            ticket: PLAT_TICKET,
            // queryType: 2,
            // pushType: 1,
        }).then(res => res.result);
    });
    describe('消息推送', async function () {
        before('运营主管登录', async function () {
            platFromInfo = await yssLogin.platfrom({
                userType: 'yyzg'
            });
        });
        describe('id推送单人', async function () {
            let pushMsg;
            const context = common.getRandomStr(5);
            before('开始推送-id', async function () {
                pushMsg = await notice.pushMessageSend({
                    queryType: 2,
                    receiverIdJson: LOGINDATA.userId,
                    msgContent: context,
                    pop: 2,
                    ticket: PLAT_TICKET
                });

            });
            it('平台端查看推送消息列表', async function () {
                const loadPushDataList = await notice.loadPushData({
                    ticket: PLAT_TICKET
                }).then(res => res.result.datas.page.dataList);
                const res = loadPushDataList.find(obj =>
                    obj.receiverIdJson == LOGINDATA.userId.toString() && obj.msgContent == context
                )
                console.log('平台端推送消息列表', res);
                console.log('平台login信息', PLAT_LOGINDATA);
                const exp = {
                    businessId: common.add(firstQuery.datas.page.totalSize, 1),
                    senderId: PLAT_LOGINDATA.userId,
                    queryType: pushMsg.params.queryType,
                    senderName: PLAT_LOGINDATA.loginName,
                    msgContent: context,
                    pop: pushMsg.params.pop,
                    queryTypeStr: '用户Id推送', // 这里为什么写死，是因为我们的测试点就是测id推送
                    pushStatusStr: '已推送', // 状态也写死，如果状态不对，抛异常
                    pushTypeStr: '立即推送',
                    url: pushMsg.params.url ? params.url : null
                }
                console.log('断言', exp);
                common.isApproximatelyEqualAssert(exp, res);
            });
            // it('APP端查看推送消息列表', async function () {});
        });
        describe('指定省份推送', async function () {
            describe('全国推送', async function () {
                let poetry;
                before('开始推送', async function () {
                    poetry = common.getPoetry()
                    pushMsg = await notice.pushMessageSend({
                        queryType: 3,
                        receiverIdJson: -999,
                        selectProvice: 1, // 1为全国
                        proviceStr: '',
                        pushPlatform: 1,
                        msgContent: poetry,
                        pop: 1, // 1不弹窗
                        url: '',
                        sendTime: '',
                        ticket: PLAT_TICKET
                    });
                });
                it('平台端查看推送消息列表', async function () {
                    const loadPushDataList = await notice.loadPushData({
                        ticket: PLAT_TICKET
                    }).then(res => res.result.datas.page.dataList);
                    console.log('平台login信息', PLAT_LOGINDATA);
                    const exp = {
                        businessId: common.add(firstQuery.datas.page.totalSize, 2),
                        senderId: PLAT_LOGINDATA.userId,
                        queryType: pushMsg.params.queryType,
                        senderName: PLAT_LOGINDATA.loginName,
                        msgContent: poetry,
                        pushType: 1,
                        pop: pushMsg.params.pop,
                        receiverIdJson: "-999",
                        queryTypeStr: '条件推送', // 这里为什么写死，是因为我们的测试点就是测id推送
                        pushStatusStr: '已推送', // 状态也写死，如果状态不对，抛异常
                        pushTypeStr: '立即推送',
                        url: pushMsg.params.url ? params.url : ''
                    }
                    common.isApproximatelyEqualAssert(exp, loadPushDataList[0]);
                });
            });

            describe('浙江推送', async function () {
                let poetry;
                before('开始推送', async function () {
                    poetry = common.getPoetry()
                    pushMsg = await notice.pushMessageSend({
                        queryType: 3,
                        receiverIdJson: -999,
                        selectProvice: 2, // 1为全国,2为省份
                        proviceStr: '浙江省',
                        proviceName: '浙江省',
                        pushPlatform: 1,
                        msgContent: poetry,
                        pop: 1, // 1不弹窗
                        url: '',
                        sendTime: '',
                        ticket: PLAT_TICKET
                    });
                });
                it('平台端查看推送消息列表', async function () {
                    const loadPushDataList = await notice.loadPushData({
                        ticket: PLAT_TICKET
                    }).then(res => res.result.datas.page.dataList);
                    const exp = {
                        businessId: common.add(firstQuery.datas.page.totalSize, 3),
                        senderId: PLAT_LOGINDATA.userId,
                        queryType: pushMsg.params.queryType,
                        senderName: PLAT_LOGINDATA.loginName,
                        msgContent: poetry,
                        pushType: 1,
                        pop: pushMsg.params.pop,
                        receiverIdJson: "-999",
                        queryTypeStr: '条件推送', // 这里为什么写死，是因为我们的测试点就是测id推送
                        pushStatusStr: '已推送', // 状态也写死，如果状态不对，抛异常
                        pushTypeStr: '立即推送',
                        url: pushMsg.params.url ? params.url : ''
                    }
                    common.isApproximatelyEqualAssert(exp, loadPushDataList[0]);
                });
            });
        });

    });
});