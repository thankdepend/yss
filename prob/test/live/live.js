const liveManage = require('../../help/liveManage')
const yssLogin = require('../../help/yssLogin');
const caps = require('../../../data/caps');
const account = require('../../data/account');
const user = require('../../../reqApi/platfrom/user');
const hulaquanApp = require('../../../reqApi/app/hulaquan')

describe('直播', async function () {
    this.timeout(TESTCASE.timeout);
    const live = liveManage.setupLive();

    before('登录-运营主管', async function () {
        await yssLogin.platfrom(
            account[caps.name].ptzg
        )
        // 关闭所有进行中的直播
        const IDs = await live.getliveSuperviseIdArr();
        for (let id of IDs) {
            await live.closeVcloud(id)
        };

    });
    after('关闭直播间', async function () {
        await live.closeVcloud()
    });
    describe('平台端新增直播', async function () {
        before('新增直播', async function () {
            const json = await liveManage.liveMockJson();
            await live.saveLive(json)
        });
        it('查询直播间列表', async function () {
            await live.liveRoomListAssert();
        });
        describe('客户端查看直播', async function () {
            before('用户登录', async function () {
                const res = await yssLogin.clientLogin({
                    // loginName: 'dingding002',
                    // password: 'Ysk001',
                    // device: 'm'
                })
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