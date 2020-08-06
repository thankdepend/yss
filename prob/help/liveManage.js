const hulaquan = require('../../reqApi/platfrom/hulaquan');
const hulaquanApp = require('../../reqApi/app/hulaquan');
const {
    common
} = require('../../lib/index');
const user = require('../../reqApi/platfrom/user')

class Live {
    constructor() {
        /** 直播间id */
        this.roomId = '';
        /** 直播间名称 */
        this.roomName = '';
        /** 直播分类名称 */
        this.categoryName = '';
        /** 直播分类id */
        this.categoryID = '';
        /** 开始时间 */
        this.startTime = '';
        /** 主播名称 */
        this.anchorName = '';
        /** 主播id */
        this.anchorId = '';
        /** 最大人数 */
        this.maxNum = '';
        /** 直播编号 */
        this.orderNum = '';
        /** 文稿标志 */
        this.infoFlag = '';
        /** 评论标志 */
        this.commentFlag = '';
        /** 回放标志 */
        this.playBackFlag = '';
        /** 直播公告 */
        this.noticeContent = '';

    }

    /** 保存直播 */
    async saveLive(params) {
        const res = await hulaquan.saveRoom(params);
        console.log('保存直播', res);
        // 更新
        this.roomId = res.result.datas.roomId
        common.update(this, res.params)
        if (res.result.message == '该主播拥有未关闭的直播间,请关闭后再添加!') {
            throw new Error('该主播直播没结束')
        }
    }

    /** 查询直播间列表 */
    async queryLiveRoomList(params) {
        const liveRoomList = await hulaquan.getLiveRoomList(Object.assign({
            ticket: PLAT_TICKET
        }, params)).then(res => res.result.datas.page.dataList);
        return liveRoomList;
    }

    /** 直播间列表断言 */
    async liveRoomListAssert(type = 1) {
        // type为自定义属性，1为新增
        let exp;
        const roomLiveActual = await this.queryLiveRoomList({
            roomId: this.roomId
        });
        // console.log('直播间', roomLiveActual[0]);
        if (type == 1) {
            exp = Object.assign(this, {
                roomStatus: 1,
                showFlag: 1,
                createRoomFlag: 1,
                createChannelFlag: 1,
                reserveStatus: 2,
                vCouldstatus: 2,
            });
        }
        common.isApproximatelyEqualAssert(exp, roomLiveActual)

    }

    /** 直播监管列表 */
    async liveSuperviseList() {
        const res = await hulaquan.getLiveSuperviseList({
            ticket: PLAT_TICKET,
            curPage: 1,
            pageSize: 15,
        });
        return res;
    }

    /** 获取直播监管id数组 */
    async getliveSuperviseIdArr() {
        const res = await this.liveSuperviseList();
        const roomIds = res.result.datas.page.dataList.map(room => room.roomId);
        console.log('直播监管', roomIds);
        return roomIds;
    }


    /** 关闭直播间 */
    async closeVcloud(id) {
        const res = await hulaquan.closeVcloud({
            ticket: PLAT_TICKET,
            roomId: id || this.roomId
        })
        // console.log('关闭直播间', res);
    }

    /** 查看直播间列表（客户端） */
    async queryRoomListByclt() {
        const res = await hulaquanApp.queryRoomList({
            data: {
                m: '',
                p: {
                    curPage: 1,
                    pageSize: 15,
                    categoryID: this.categoryID
                }
            },
            ticket: TICKET
        });
        // console.log('查看直播间列表（客户端）', res);
        return res.result.datas.page.dataList;
    }

    /** 客户端直播间列表断言 */
    async queryRoomListBycltAssert() {
        const roomListClt = await this.queryRoomListByclt();
        const res = roomListClt.find(room => room.roomId == this.roomId)
        const actual = this;

        let exp = Object.assign(this, {
            startTime: new Date(actual.startTime).getTime(),
            roomStatus: 1,
            showFlag: 1,
            createRoomFlag: 1,
            createChannelFlag: 1,
            reserveStatus: 2,
            vCouldstatus: 2,
            statistics: {
                reserveNum: 0,
                maxlookNum: 0,
                totalNum: 0,
                reviewNum: 0,
                playbackNum: 0,
                totalNumBase: 0,
                liveNumBase: 0,
                totalTotalNum: 0,
                totalReserveNum: 0
            }
        });
        common.isApproximatelyEqualAssert(exp, res, [], '直播间id在列表没找到');
    }


    /** 查看人数 */
    async playbackOrMaxLook() {
        const res = await hulaquanApp.playbackOrMaxLook({
            data: {
                m: '',
                p: {
                    roomId: this.roomId
                }
            },
            ticket: TICKET
        })
        console.log('查看人数', res);
    }

    /** 初始化直播间 */
    async initChartRoom() {
        const res = await hulaquanApp.initChartRoom({
            data: {
                m: '',
                p: {
                    roomId: this.roomId
                }
            },
            ticket: TICKET
        });
        console.log('初始化直播间', res);
    }

    /** 数据统计 */
    async getStatisticData() {
        const res = await hulaquanApp.getStatisticData({
            data: {
                m: '',
                p: {
                    roomId: this.roomId
                }
            },
            ticket: TICKET
        })
        console.log('数据统计', res);
    }

}


const liveManage = module.exports = {};

liveManage.setupLive = function () {
    return new Live();
}

liveManage.liveMockJson = async function (params) {
    // 找播主
    // const res = await user.getUserList({ yongHuLB: 319,xueXiaoID: 0,zhengJianLX: 0,useFlag: 1,ticket: PLAT_TICKET});

    // 取分类id
    const cateGory = await hulaquan.getLiveCategoryList({
        stauts: 1,
        ticket: PLAT_TICKET
    }).then(res => res.result.datas.page.dataList);
    let categoryIdList = cateGory.map(obj => obj.categoryID);

    // 编号总数
    const orderNumTotal = await hulaquan.getLiveRoomList({
        ticket: PLAT_TICKET
    }).then(res => res.result.datas.page.total);
    // 上面多查一遍是为了取total
    const orderNumList = await hulaquan.getLiveRoomList({
        ticket: PLAT_TICKET,
        pageSize: orderNumTotal
    }).then(res => res.result.datas.page.dataList);
    const orderMax = Math.max(...orderNumList.map(obj => obj.orderNum))

    let json = Object.assign({
        roomName: `${common.getRandomChineseStr(3)}の直播间`,
        categoryName: '直播分类名称',
        categoryID: categoryIdList[common.getRandomNum(0, categoryIdList.length - 1)],
        startTime: common.getCurrentTime(),
        anchorName: `主播${common.getRandomStr(5)}`,
        anchorId: 1200565, // 主播id写死
        maxNum: common.getRandomNum(30, 100),
        orderNum: common.add(orderMax, 1),
        infoFlag: 1,
        // infoId,
        commentFlag: 1,
        playBackFlag: 1, // 回放标志
        noticeContent: `直播公告：${common.getRandomStr(5)}`
    }, params)
    return json;
}