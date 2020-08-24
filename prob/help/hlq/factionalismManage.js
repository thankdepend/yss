const hulaquanApp = require('../../../reqApi/app/hulaquan');
const hulaquan = require('../../../reqApi/platfrom/hulaquan');
const {
    common
} = require('../../../lib/index');
const doc = require('../../data/doc.json');
const caps = require('../../../data/caps');
const {
    expect
} = require('chai');
const {
    group
} = require('yargs');

/** 圈子 */
class Faction {
    constructor() {
        /** 圈子主要信息 */
        this.groupMain = new GroupMain();
        /** 圈子类型主要信息 */
        this.groupTypeMain = new GroupTypeMain()
        /** 圈子id */
        this.groupID = '';
        /** 圈子名称 */
        this.groupName = '';
        /** 圈子类型id */
        this.typeID = '';
        /** 圈子类型名字 */
        this.typeName = '';
    }

    /** 保存圈子类型 */
    async saveType(params) {
        const res = await hulaquan.saveType(Object.assign({
            typeID: '', // 编辑要用
            businessType: 2,
            typeLevel: 1,
            typeName: common.getRandomWord(),
            typeFlag: 2, // 服务端写死1、2、3
            typeOrder: 3,
            icon: 'http://img.artstudent.cn/pr/2020-08-18/9e1dec47e5cc426295e2cbf695d01aba.png',
            typeDescribe: `这是描述${common.getRandomStr(4)}`,
            ticket: PLAT_TICKET,
        }, params));
        console.log('保存圈子类型', res);
        await this.updateType(res.params);
    }

    /** 更新圈子类型信息 */
    async updateType(params) {
        const res = await hulaquan.getgroupsTypeList({
            typeName: params.typeName,
            businessType: params.businessType,
            curPage: 1,
            pageSize: 15,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList[0]);
        // console.log('查询结果', res);
        common.update(this.groupTypeMain, params)
        this.groupTypeMain.typeID = res.typeID;
        this.typeID = res.typeID;
        this.typeName = res.typeName;
    }

    /** 查询圈子类型列表 */
    async getgroupsTypeList() {
        const res = await hulaquan.getgroupsTypeList({
            typeName: '',
            businessType: 2,
            curPage: 1,
            pageSize: 15,
            ticket: PLAT_TICKET,
        });
        // console.log('查询圈子类型列表', res);
        return res;
    }

    /** 圈子类型列表断言 */
    async groupsTypeListAssert(del) {
        let res, actual;
        if (del) {
            const resA = await this.getgroupsTypeList().then(res => res.result.datas.page.dataList);
            const actualA = resA.find(obj => obj.typeID == this.typeID);
            // console.log('actualA', actualA);
            expect(actualA).to.be.undefined();
        } else {
            res = await this.getgroupsTypeList().then(res => res.result.datas.page.dataList);
            actual = res.find(obj => obj.typeID == this.typeID);
            let exp = {
                typeID: this.groupTypeMain.typeID,
                typeName: this.groupTypeMain.typeName,
                typeLevel: this.groupTypeMain.typeLevel,
                typeOrder: this.groupTypeMain.typeOrder,
                typeFlag: this.groupTypeMain.typeFlag,
                businessType: this.groupTypeMain.businessType,
                clearSchool: false,
                typeFlagStr: this.groupTypeMain.typeFlag == 1 ? '平台' : this.groupTypeMain.typeFlag == 2 ? '院校' : this.groupTypeMain.typeFlag == 3 ? '普通' : '',
                businessTypeStr: '',
                showFlagStr: '',
            }
            console.log('期望', exp);
            console.log('断言', actual);
            common.isApproximatelyEqualAssert(exp, actual)
        }

    }

    /** 删除圈子类型 */
    async delType() {
        await hulaquan.delType({
            typeID: this.typeID,
            ticket: PLAT_TICKET
        });
    }

    /** 保存圈子 */
    async saveGroup() {
        const typeID = this.typeID;
        let json = {
            groupID: '',
            schoolName: '',
            groupName: `${common.getRandomWord()}圈`,
            typeFlag: 1,
            typeID: typeID,
            verifyFlag: 3,
            isHot: 1,
            stopFlag: 1,
            iconURL: 'http://img.artstudent.cn/pr/2020-08-19/78530cb5ac504221972d2f2661a2de92.png',
            schoolID: '',
            provCityName: '北京市 东城区',
            proviceCode: 110000,
            cityCode: 110101,
            remark: `备注${common.getRandomStr(5)}`,
            ticket: PLAT_TICKET
        }
        const res = await hulaquan.saveGroup(json);
        // console.log('保存圈子', res);
        await this.updateGroup(res.params)

    }

    /** 更新圈子信息 */
    async updateGroup(params) {
        const updateRes = await hulaquan.getGroupList({
            groupName: params.groupName,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList[0]);
        // console.log('更新圈子信息', updateRes);
        common.update(this.groupMain, params)
        this.groupMain.groupID = updateRes.groupID;
        this.groupMain.createdOnStr = common.getCurrentDate();
        this.groupID = updateRes.groupID;
        this.groupName = params.groupName;
        this.groupMain.dissolveFlag = 1;
    }

    /** 查询圈子列表 */
    async getGroupList(params) {
        const res = await hulaquan.getGroupList(Object.assign({
            ticket: PLAT_TICKET
        }, params));
        return res;
    }

    /** 圈子列表断言 */
    async groupListAssert(del) {
        const totalSize = await this.getGroupList().then(res => res.result.datas.page.totalSize);
        if (del) {
            const groupList1 = await this.getGroupList({
                pageSize: totalSize
            }).then(res => res.result.datas.page.dataList);
            const findRes1 = groupList1.find(group => group.groupID == this.groupID);
            expect(findRes1).to.be.undefined();
        } else {
            const groupList = await this.getGroupList({
                pageSize: totalSize
            }).then(res => res.result.datas.page.dataList);
            const findRes = groupList.find(group => group.groupID == this.groupID);
            const redundancy = {
                order: null,
                isJoin: false,
                isMore: false,
                creater: 1,
                shareURL: null,
                complainable: false,
                groupUserList: null,
                auditFlag: null,
                schoolID: null,
                schoolName: '',
                auditReason: null,
                join: false,
            }
            const groupMain = this.groupMain;
            let exp = Object.assign(groupMain, redundancy, {
                typeName: this.typeName,
                belongedUser: PLAT_LOGINDATA.userId,
                auditFlagStr: groupMain.auditFlag == null ? '通过' : '',
                dissolveFlagStr: groupMain.dissolveFlag == 1 ? '未解散' : groupMain.dissolveFlag == 2 ? '已解散' : '',
                isHotStr: groupMain.isHot == 1 ? '是' : groupMain.isHot == 0 ? '否' : '',
                typeFlagStr: groupMain.typeFlag == 1 ? '官方' : groupMain.typeFlag == 2 ? '普通' : groupMain.typeFlag == 3 ? '平台' : '',
                stopFlagStr: groupMain.stopFlag == 1 ? '启用' : groupMain.stopFlag == 0 ? '禁用' : '',
                verifyFlagStr: groupMain.verifyFlag == 3 ? '允许任何人' : '',
            }, )

            console.log('期望值', exp);
            console.log('实际值', findRes);
            common.isApproximatelyEqualAssert(exp, findRes)
        }
    }

    /** 圈子成员列表 */
    async groupUserList() {
        const res = await hulaquan.groupUserList({
            ticket: PLAT_TICKET,
            groupID: this.groupID
        });
        return res;
    }

    /** 圈子成员断言 */
    async groupUserListAssert() {
        const userList = await this.groupUserList();
        console.log(userList);
        const actual = userList.result.datas.page.dataList;
        expect(actual.length).to.be.equal(0);
    }

    /** 解散圈子 */
    async dissolveGroup() {
        const res = await hulaquan.dissolveGroup({
            groupName: this.groupName,
            groupID: this.groupID,
            ticket: PLAT_TICKET
        });
        this.groupMain.dissolveFlag = 2;
        console.log('解散圈子', res);
    }

    /** 删除圈子 */
    async deleteGroup() {
        const res = await hulaquan.deleteGroup({
            groupID: this.groupID,
            ticket: PLAT_TICKET
        });
        console.log('删除圈子', res);
    }

    /** 加入圈子-客户端 */
    async addFaction() {
        const res = await hulaquanApp.addFaction({
            data: {
                "p": {
                    "groupID": 1
                },
                "m": ""
            },
            ticket: TICKET
        })
        console.log('加入圈子', res);
    }

    /** 查询圈子类型列表-客户端 */
    async getQueryGroupType() {
        const res = await hulaquanApp.getQueryGroupType({
            data: {
                "p": {},
                "m": ""
            },
            ticket: TICKET
        });
        console.log('圈子类型列表', res);
    }

    /** 查询圈子列表-客户端 */
    async queryGroupsList() {
        const res = await hulaquanApp.queryGroupsList({
            data: {
                "p": {
                    "groupType": 2,
                    "curPage": 1
                },
                "m": ""
            },
            ticket: TICKET
        });
        console.log('查询圈子列表', res);
    }

    /** 保存贴子-客户端 */
    async saveBrief() {
        const topList = await hulaquanApp.getWaterfallQuery({
            data: {
                p: {
                    curPage: 1
                },
                m: '',
            },
            ticket: TICKET,

        }).then(res => res.result.datas.topList);
        const groupIDList = topList.map(obj => obj.groupID)
        const randomGroupID = groupIDList[common.getRandomNum(0, groupIDList.length - 1)];

        let randomImage = doc[caps.name].other[common.getRandomNum(0, doc[caps.name].other.length)];

        const res = await hulaquanApp.getPostAdd({
            data: {
                "p": {
                    "postType": 1,
                    "groupID": randomGroupID,
                    "attachmentJSON": randomImage,
                    "location": "",
                    "content": common.getRandomContent(6)
                },
                "m": ""
            },
            ticket: TICKET
        });
        console.log('打印响应', res);
    }

    /** 查询贴子列表-客户端 */
    async waterfallQuery() {
        const res = await hulaquanApp.getWaterfallQuery({
            data: {
                p: {
                    curPage: 1
                },
                m: '',
            },
            ticket: TICKET,

        }).then(res => res.result.datas);
        console.log('查询贴子列表', res);
    }
}

const factionalismManage = module.exports = {};

factionalismManage.setupFactionalism = function () {
    return new Faction();
}


class GroupTypeMain {
    constructor() {
        /** 圈子类型id */
        this.typeID = '';
        /** 业务类型 */
        this.businessType = '';
        /** 类型等级 */
        this.typeLevel = '';
        /** 类型名字 */
        this.typeName = '';
        /** 类型标志 */
        this.typeFlag = '';
        /** 类型编号 */
        this.typeOrder = '';
        /** 类型图标 */
        this.icon = '';
        /** 类型描述 */
        this.typeDescribe = '';
    }
}

class GroupMain {
    constructor() {
        /** 圈子id */
        this.groupID = '';
        /** 圈子名 */
        this.groupName = '';
        /** 圈子类型id */
        this.typeFlag = '';
        /** 验证标志 */
        this.verifyFlag = '';
        /** 停用标志 */
        this.stopFlag = '';
        /** 帖子数 */
        this.postNum = '';
        /** 用户数 */
        this.userNum = '';
        /** 图片 */
        this.iconURL = '';
        /** 创始人id */
        this.belongedUser = '';
        /** 创始人名字 */
        this.belongedUserName = null;
        /** 备注 */
        this.remark = '';
        /** 省份城市名 */
        this.provCityName = '';
        /** 省份编码 */
        this.proviceCode = '';
        /** 城市编码 */
        this.cityCode = '';
        /** 解散标志 */
        this.dissolveFlag = '';
        /** 审核标志 */
        this.auditFlag = null;
        /** 学校id */
        this.schoolID = null;
        /** 学校名字 */
        this.schoolName = '';
        /** 热门标志 */
        this.isHot = '';
        /** 审核理由 */
        this.auditReason = '';
        /** 圈子类型id */
        this.typeID = '';
        /** 圈子类型名称 */
        this.typeName = '';
        /** 排序编号 */
        this.order = '';
        /** isJoin */
        this.isJoin = '';
        /** isMore */
        this.isMore = '';
        /** creater */
        this.creater = '';
        /** shareURL */
        this.shareURL = '';
        /** complainable */
        this.complainable = '';
        /** groupUserList */
        this.groupUserList = '';
        /** 创建时间 */
        this.createdOnStr = '';
        // /** auditFlagStr */
        // this.auditFlagStr = '';
        // /** dissolveFlagStr */
        // this.dissolveFlagStr = '';
        // /** 是否热门 */
        // this.isHotStr = '';
        // /** 类型名字符串 */
        // this.typeFlagStr = '';
        // /** 是否启用 */
        // this.stopFlagStr = '';
        // /** 是否允许任何人 */
        // this.verifyFlagStr = '';
        // /** join */
        // this.join = '';
    }
}