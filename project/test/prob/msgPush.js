const yssLogin = require('../../help/base/yssLogin');
const notice = require('../../../reqApi/platfrom/notice');
const {
    common
} = require('../../../lib');
const {
    expect
} = require('chai');

describe('消息推送', async function () {
    this.timeout(TESTCASE.timeout);
    before('用户登录', async function () {
        // 获取用户id
        const res = await yssLogin.clientLogin({
            // loginName: 'dingding002',
            // password: 'Ysk001',
            // device: 'm'
        })
    });
    describe('消息推送', async function () {
        before('运营主管登录', async function () {
            platFromInfo = await yssLogin.platfrom({
                // loginName: 'yyzg',
                // password: 'Ysk002',
                userType: 'yyzg'
            });
            console.log('平台登录', platFromInfo);
        });
        describe('id推送单人', async function () {
            let pushMsg, firstQuery;
            const context = common.getRandomStr(5);
            before('开始推送-id', async function () {
                // 只是为了校验businessId
                firstQuery = await notice.loadPushData({
                    ticket: PLAT_TICKET,
                    // queryType: 2,
                    // pushType: 1,
                }).then(res => res.result);
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
                    senderId: PLAT_LOGINDATA.datas.user.userId,
                    queryType: pushMsg.params.queryType,
                    senderName: PLAT_LOGINDATA.datas.user.loginName,
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
            // it('APP端查看推送消息列表', async function () {

            // });
        });
        // describe('指定省份推送', async function () {

        // });


    });
});