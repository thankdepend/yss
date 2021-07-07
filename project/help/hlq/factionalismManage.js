const hulaquanApp = require('../../../reqApi/app/hulaquan');
const hulaquan = require('../../../reqApi/platfrom/hulaquan');
const {
    common
} = require('../../../lib/index');

const {
    expect
} = require('chai');

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
    async saveType (params) {
        const res = await hulaquan.saveType(Object.assign({
            typeID: '', // 编辑要用
            businessType: 2,
            typeLevel: 1,
            typeName: common.getRandomWord(),
            typeFlag: 2, // 服务端写死1、2、3
            typeOrder: common.getRandomNum(0, 100),
            icon: 'http://img.artstudent.cn/pr/2020-08-18/9e1dec47e5cc426295e2cbf695d01aba.png',
            typeDescribe: `这是描述${common.getRandomStr(4)}`,
            ticket: PLAT_TICKET,
        }, params));
        // console.log('保存圈子类型', res);
        await this.updateType(res.params);
    }

    /** 更新圈子类型信息 */
    async updateType (params) {
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
        // console.log('typeID', res.typeID);
    }

    /** 查询圈子类型列表 */
    async getgroupsTypeList (params) {
        const res = await hulaquan.getgroupsTypeList(Object.assign({
            // typeName: '',
            businessType: 2, // 业务类型
            curPage: 1,
            // pageSize: 15,
            ticket: PLAT_TICKET,
        }, params));
        // console.log('查询圈子类型列表', res);
        return res;
    }

    /** 圈子类型列表断言 */
    async groupsTypeListAssert (del) {
        let typeList, actual;
        // 删除圈子类型断言
        if (del) {
            const resA = await this.getgroupsTypeList().then(res => res.result.datas.page.dataList);
            const actualA = resA.find(obj => obj.typeID == this.typeID);
            // console.log('actualA', actualA);
            expect(actualA).to.be.undefined();
        } else {
            typeList = await this.getgroupsTypeList({
                typeName: this.groupTypeMain.typeName
            }).then(res => res.result.datas.page.dataList);
            actual = typeList.find(obj => obj.typeID == this.typeID);
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
            // console.log('期望', exp);
            // console.log('断言', actual);
            common.isApproximatelyEqualAssert(exp, actual)
        }

    }

    /** 删除圈子类型 */
    async delType () {
        await hulaquan.delType({
            typeID: this.typeID,
            ticket: PLAT_TICKET
        });
    }

    /** 
     * 保存圈子
     * @param {Object} params 编辑要传  
     */
    async saveGroup (params) {
        let json = {
            groupID: '',
            schoolName: '',
            groupName: `${common.getRandomWord()}圈`,
            typeFlag: this.groupTypeMain.typeFlag,
            typeID: this.typeID,
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
        let edit = Object.assign({
            groupID: this.groupMain.groupID,
            schoolName: this.groupMain.schoolName,
            typeFlag: this.groupMain.typeFlag,
            typeID: this.groupMain.typeID,
            verifyFlag: this.groupMain.verifyFlag,
            isHot: this.groupMain.isHot,
            stopFlag: this.groupMain.stopFlag,
            iconURL: this.groupMain.iconURL,
            schoolID: this.groupMain.schoolID == null ? '' : '',
            provCityName: this.groupMain.provCityName,
            proviceCode: this.groupMain.proviceCode,
            cityCode: this.groupMain.cityCode,
            remark: this.groupMain.remark,
            ticket: PLAT_TICKET
        }, params);

        if (params) {
            // 编辑
            const addData = await hulaquan.saveGroup(edit);
            // console.log('编辑', addData);
            await this.updateGroup(addData.params)
        } else {
            // 新增
            const editData = await hulaquan.saveGroup(json);
            // console.log('保存圈子', editData);
            await this.updateGroup(editData.params)
        }
    }

    /** 更新圈子信息 */
    async updateGroup (params) {
        const updateRes = await this.getGroupList({
            groupName: params.groupName || this.groupMain.groupName,
        }).then(res => res.result.datas.page.dataList[0]);

        // console.log('更新圈子信息', updateRes);
        common.update(this.groupMain, params)
        this.groupMain.groupID = updateRes.groupID;
        this.groupMain.groupName = updateRes.groupName;
        this.groupMain.createdOnStr = common.getCurrentDate();
        this.groupID = updateRes.groupID;
        this.groupName = params.groupName ? params.groupName : updateRes.groupName;
        this.groupMain.dissolveFlag = 1;
    }

    // 圈子更新-帖子
    async updateGroupForWaterFull (postNum, userNum) {
        this.groupMain.postNum += postNum;
        this.groupMain.userNum += userNum;
    }


    /** 查询圈子列表 */
    async getGroupList (params) {
        const res = await hulaquan.getGroupList(Object.assign({
            ticket: PLAT_TICKET
        }, params));
        // console.log('列表请求', res);
        return res;
    }

    /** 圈子列表断言 */
    async groupListAssert (del) {
        const totalSize = await this.getGroupList().then(res => res.result.datas.page.totalSize);
        if (del) {
            const groupList1 = await this.getGroupList({
                pageSize: totalSize
            }).then(res => res.result.datas.page.dataList);
            const findRes1 = groupList1.find(group => group.groupID == this.groupID);
            expect(findRes1).to.be.undefined();
        } else {
            const groupList = await this.getGroupList({
                pageSize: totalSize,
                groupID: this.groupID
            }).then(res => res.result.datas.page.dataList);
            // console.log('圈子列表', groupList);
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
            // console.log('groupMain', groupMain);
            let exp = Object.assign(groupMain, redundancy, {
                typeName: this.typeName,
                belongedUser: PLAT_LOGINDATA.userId,
                auditFlagStr: groupMain.auditFlag == null ? '通过' : '',
                dissolveFlagStr: groupMain.dissolveFlag == 1 ? '未解散' : groupMain.dissolveFlag == 2 ? '已解散' : '',
                isHotStr: groupMain.isHot == 1 ? '是' : groupMain.isHot == 0 ? '否' : '',
                typeFlagStr: groupMain.typeFlag == 1 ? '官方' : groupMain.typeFlag == 2 ? '普通' : groupMain.typeFlag == 3 ? '平台' : '',
                stopFlagStr: groupMain.stopFlag == 1 ? '启用' : groupMain.stopFlag == 0 ? '禁用' : '',
                verifyFlagStr: groupMain.verifyFlag == 3 ? '允许任何人' : '',
            })

            // console.log('圈子列表期望值', exp);
            // console.log('圈子列表实际值', findRes);
            common.isApproximatelyEqualAssert(exp, findRes, ['belongedUser'])
        }
    }

    /** 圈子成员列表 */
    async groupUserList () {
        const res = await hulaquan.groupUserList({
            ticket: PLAT_TICKET,
            groupID: this.groupID
        });
        return res;
    }

    /** 圈子成员断言 */
    async groupUserListAssert () {
        const userList = await this.groupUserList();
        expect(0).to.be.equal(userList.result.datas.page.dataList.length);
    }

    /** 统计圈子数据 */
    async singlenGroupData (params) {
        const res = await hulaquan.singlenGroupData(Object.assign({
            ticket: PLAT_TICKET
        }, params));
        return res;
    }

    /** 统计圈子数据断言 */
    async singlenGroupDataAssert () {
        const params = {
            groupID: this.groupID,
            beginRepDate: common.getCurrentBefore(192),
            endRepDate: common.getCurrentBefore(24),
            saveFlag: 1,
        };
        const groupData = await this.singlenGroupData(params);
        expect(0).to.be.equal(groupData.result.datas.page.dataList.length);
    }

    /** 解散圈子 */
    async dissolveGroup () {
        const res = await hulaquan.dissolveGroup({
            groupName: this.groupName,
            groupID: this.groupID,
            ticket: PLAT_TICKET
        });
        this.groupMain.dissolveFlag = 2;
        // console.log('解散圈子', res);
    }

    /** 删除圈子 */
    async deleteGroup () {
        const res = await hulaquan.deleteGroup({
            groupID: this.groupID,
            ticket: PLAT_TICKET
        });
        // console.log('删除圈子', res);
    }

    /** 加入圈子-客户端 */
    async addFaction () {
        const res = await hulaquanApp.addFaction({
            data: {
                "p": {
                    "groupID": this.groupID
                },
                "m": ""
            },
            ticket: TICKET
        })
        // console.log('加入圈子', res);
    }

    /** 查询圈子类型列表-客户端 */
    async getQueryGroupType () {
        const res = await hulaquanApp.getQueryGroupType({
            data: {
                "p": {},
                "m": ""
            },
            ticket: TICKET
        });
        // console.log('圈子类型列表', res);
    }

    /** 查询圈子列表-客户端 */
    async queryGroupsList () {
        const res = await hulaquanApp.queryGroupsList({
            data: {
                "p": {
                    "groupType": this.typeID,
                    "curPage": 1
                },
                "m": ""
            },
            ticket: TICKET
        });
        // console.log('查询圈子列表', res);
    }

}

const factionalismManage = module.exports = {};
factionalismManage.setupFactionalism = function () {
    return new Faction();
}

// 获取随机圈子
factionalismManage.getRandomGroup = async function () {
    const groupList = await hulaquan.getGroupList({
        ticket: PLAT_TICKET
    }).then(res => res.result.datas.page.dataList);
    const groupIDList = groupList.map(obj => obj.groupID);

    return groupIDList[common.getRandomNum(0, groupIDList.length - 1)];
}

// 获取圈子实例
factionalismManage.getGroupInstantiation = async function (groupID) {
    const groupDetail = await hulaquan.getGroupList({
        ticket: PLAT_TICKET,
        groupID: groupID,
    }).then(res => res.result.datas.page.dataList[0]);
    const typeDetail = await hulaquan.getgroupsTypeList({
        typeID: groupDetail.typeID,
        ticket: PLAT_TICKET,
    });
    const groupInstantiation = new Faction();
    Object.assign(groupInstantiation.groupMain, groupDetail);
    Object.assign(groupInstantiation.groupTypeMain, typeDetail)
    groupInstantiation.groupID = groupDetail.groupID;
    groupInstantiation.groupName = groupDetail.groupName;
    groupInstantiation.typeID = groupDetail.typeID;
    groupInstantiation.typeName = groupDetail.typeName;
    return groupInstantiation;

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
        this.postNum = 0;
        /** 用户数 */
        this.userNum = 0;
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

