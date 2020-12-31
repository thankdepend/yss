const liveManage = require('../../help/live/liveManage')
const yssLogin = require('../../help/base/yssLogin');
const caps = require('../../../data/caps');
const account = require('../../data/account');
const user = require('../../../reqApi/platfrom/user');
const hulaquanApp = require('../../../reqApi/app/hulaquan');
const { common } = require('../../../lib/index');

describe('直播', async function () {
    this.timeout(TESTCASE.timeout);
    const live = liveManage.setupLive();

    before('登录-运营主管', async function () {
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
        // 关闭所有进行中的直播
        const IDs = await live.getliveSuperviseIdArr();
        for (let id of IDs) {
            await live.closeVcloud(id)
        };

    });
    after('关闭直播间', async function () {
        await yssLogin.platfrom({
            userType: 'yyzg'
        })
        await live.closeVcloud()
    });
    describe('平台端新增直播', async function () {
        before('新增直播', async function () {
            let anchorID;
            // 获取主播id
            await yssLogin.platfrom();
            if (caps.name == 'test') {
                anchorID = await liveManage.getAnchorID();
            } else {
                // 演示环境有用户授权，无奈写死
                const arr = [1197792, 1197775, 1197777, 1197790]
                anchorID = arr[common.getRandomNum(0, arr.length - 1)];
            }
            // mock
            await yssLogin.platfrom({
                userType: 'yyzg'
            })
            const json = await liveManage.liveMockJson({
                anchorID: anchorID
            });
            await live.saveLive(json)
        });
        it('查询直播间列表', async function () {
            await live.liveRoomListAssert();
        });
        describe('客户端查看直播', async function () {
            before('用户登录', async function () {
                const res = await yssLogin.clientLogin()
            });
            it('客户端查看直播列表', async function () {
                await live.queryRoomListBycltAssert()
            });
            it('初始化直播间', async function () {
                await live.initChartRoom()
            });
            it('查看在线人数', async function () {
                await live.playbackOrMaxLook()
            });
            it('统计数据', async function () {
                await live.getStatisticData();
            });
        });
    });



});