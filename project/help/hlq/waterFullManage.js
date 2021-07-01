const factionBase = require('./factionalismManage');
const hulaquanApp = require('../../../reqApi/app/hulaquan');
const { common } = require('../../../lib/index');

/**
 * 帖子
 */
class WaterFull {
    constructor() {
        /** 贴子主要信息 */
        this.postMain = new PostMain();
        /** 贴子id */
        this.postID = '';
    }

    /** 保存贴子-客户端 */
    async saveBrief (params) {
        let randomImage = doc[caps.name].other[common.getRandomNum(0, doc[caps.name].other.length - 1)];

        const res = await hulaquanApp.getPostAdd({
            data: {
                p: Object.assign({
                    postType: 1,
                    groupID: '',
                    attachmentJSON: randomImage,
                    location: "",
                    content: common.getRandomContent(6)
                }, params),
                m: ""
            },
            ticket: TICKET
        });
        await this.updateWaterFall(res.params.data.p);
    }

    /** 更新贴子信息 */
    async updateWaterFall (params) {
        if (!!!params) {
            this.groupMain.postNum = 0;
            return;
        }
        const res = await this.waterfallList();
        // const findData = res.list.find(obj =>
        //     obj.content == params.content
        // );
        const findData = res.list[0];
        // console.log('findData', findData);
        this.postMain.postID = findData.postID;
        this.postID = findData.postID;
        this.postMain = {
            groupName: this.groupMain.groupName,
            topFlag: 2,
            fineFlag: 2,
            createdUser: LOGINDATA.userId,
            userExtendInfo: {
                userID: HLQ_USERINFO.userID,
                sex: HLQ_USERINFO.sex,
                nickName: HLQ_USERINFO.nickName,
                userFlag: HLQ_USERINFO.userFlag,
                identifyFlag: HLQ_USERINFO.identifyFlag,
                credentialsNum: HLQ_USERINFO.credentialsNum,
                yearNum: HLQ_USERINFO.yearNum,
                userStatus: HLQ_USERINFO.userStatus,
                // "authFlag": 2,
                // "simpleName": "浙江大学",
                // "yearNumStr": "24级",
                desUserId: HLQ_USERINFO.desUserId,
                artTypeStr: HLQ_USERINFO.artTypeStr,
            },
            postStatisticalDO: {
                praiseNum: 0,
                browseNum: 0,
                reviewNum: 0,
                shareNum: 0,
                collectNum: 0
            },
            colletion: false,
            praise: false,
            isDel: false,
            showBrowseNumCache: 0,
            fineFlagStr: '否'
        }
        common.update(this.postMain, params)
        // 更新圈子
        this.groupMain.postNum = 1;
        this.groupMain.userNum = 1;
    }

    /** 删除帖子 */
    async deletePost () {
        const delRes = await hulaquanApp.deletePost({
            data: {
                p: {
                    postID: this.postID,
                },
                m: '',
            },
            ticket: TICKET,
        });
        await this.updateWaterFall();
        // console.log('删除帖子', delRes);
    }

    /** 查询贴子列表-客户端 */
    async waterfallList () {
        const res = await hulaquanApp.getWaterfallList({
            data: {
                p: {
                    curPage: 1
                },
                m: '',
            },
            ticket: TICKET,

        }).then(res => res.result.datas);
        // console.log('查询贴子列表', res);
        return res;
    }

    /** 查询贴子列表-客户端断言 */
    async waterfallListAssert (del) {
        if (del) {
            const del = await this.waterfallList();
            const delFind = del.list.find(obj => obj.postID == this.postID)
            expect(delFind).to.be.undefined();
        } else {
            const waterFall = await this.waterfallList();
            const actual = waterFall.list.find(obj => obj.postID == this.postID)
            // console.log(this.postMain);
            // 跳过认证标志、大学名、大学等级
            common.isApproximatelyEqualAssert(this.postMain, actual, ['authFlag', 'simpleName', 'yearNumStr'])
        }
    }

    /** 帖子详情 */
    async waterFullDetail (params) {
        const a = await this.getGroupList();
        const res = await hulaquanApp.getGroupDetail({
            data: {
                m: '',
                p: {
                    groupID: this.groupID
                }
            }
        });
        return res;
    }

    /** 帖子详情断言 */
    async waterFullDetailAssert (params) {
        const res = await this.waterFullDetail();
        console.log('打印详情', res);
    }

}

const waterFullManage = module.exports = {};

waterFullManage.setupWaterFull = function () {
    return new WaterFull();
}
// Object.setPrototypeOf(Child.prototype, factionBase);
class PostMain {
    constructor() {
        /** 贴子id */
        this.postID = '';
        /** 圈子id */
        this.groupID = '';
        /** 圈子名 */
        this.groupName = '';
        /** 贴子内容 */
        this.content = '';
        /** 停用标志 */
        this.topFlag = '';
        /** 加精标志 */
        this.fineFlag = '';
        /** 创建人 */
        this.createdUser = '';
        /** 贴子类型 */
        this.postType = '';
        /** 地址 */
        this.location = '';
        /** 用户拓展信息 */
        this.userExtendInfo = '';
        /** 贴子统计数据 */
        this.postStatisticalDO = '';
        /** 是否收藏 */
        this.colletion = '';
        /** 是否点赞 */
        this.praise = '';
        /** 是否删除 */
        this.isDel = '';
        /** 浏览人数 */
        this.showBrowseNumCache = '';
        /** 是否收藏（字符串） */
        this.fineFlagStr = '';
    }
}