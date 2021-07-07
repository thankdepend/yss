const wish = require('../../../reqApi/platfrom/wish');
const info = require('../../../reqApi/platfrom/info');
const wishApp = require('../../../reqApi/app/wish');
const { common } = require('../../../lib/index');

/** 留学资讯 */
class SchoolInfo {
    constructor() {
        /** 作者 */
        this.author = '';
        /** 资讯ID */
        this.infoID = '';
        /** 资讯标题 */
        this.infoTitle = '';
        /** 资讯类型ID */
        this.infoTypeID = '';
        /** 资讯类型名称 */
        this.infoTypeName = '';
        /** 保存类型 */
        this.saveType = '';
        /** 院校编码 */
        this.schoolCode = '';
        /** 院校ID */
        this.schoolID = '';
        /** 院校资讯ID */
        this.schoolInfoID = '';
        /** 院校名称 */
        this.schoolName = '';
        /** 是否显示在指南 */
        this.showInGuide = '';
        /** 是否显示在指南解释 */
        this.showInGuideStr = '';
        /** 停用标志 */
        this.topFlag = '';
        /** 停用标志解释 */
        this.topFlagStr = '';
        /** 是否删除标志 */
        this.isDelete = false;
    }

    /** 保存留学资讯 */
    async saveSchoolInfo (params) {
        const infoData = await this.getRandomInfo();
        const schoolData = await this.getRandomSchool();
        const schoolInfoTypeData = await this.getInfoType(schoolData);
        // console.log(schoolInfoTypeData);
        let json = Object.assign({
            schoolInfoID: '',
            saveType: 1,
            schoolID: schoolData.schoolID, // 中国人民大学
            infoTypeID: schoolInfoTypeData.infoTypeID, // 资讯类型ID
            infoID: '',
            infoTitle: infoData.infoTitle,
            infoIDCheckbox: infoData.infoID,  // 资讯ID
            infoIdListString: infoData.infoID,  // 资讯ID
            topFlag: infoData.infoID, // 如果我们需要给这条留学资讯置顶，topFlag需与infoID相等
        }, params)
        json.ticket = PLAT_TICKET;
        const saveData = await wish.saveSchoolInfo(json);
        let updateData = Object.assign(json, {
            schoolName: schoolData.schoolName,
            author: infoData.author,
            infoTypeName: schoolInfoTypeData.infoTypeName,
            showInGuide: schoolInfoTypeData.showInGuide,
            showInGuideStr: schoolInfoTypeData.showInGuideStr,
            topFlag: json.topFlag == json.infoIdListString ? 1 : 2, // 这里是因为,在新增的时候我们选择了给该资讯置顶，所以需要主动变更状态
            topFlagStr: json.topFlag == json.infoIdListString ? '已置顶' : '未置顶',
        })
        await this.updateSchoolInfo(updateData);
    }

    /** 获取随机资讯 */
    async getRandomInfo () {
        const infoList = await info.getLoadInfoList({
            infoState: 1, // 已发布
            showListFlag: 1, // 列表展示
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList);
        const infoIDList = infoList.map(obj => obj.infoID);
        // 获取一个随机的资讯ID
        const randomInfoID = infoIDList[common.getRandomNum(0, infoIDList.length)];
        // 查询资讯详细内容
        const regInfo = await info.getLoadInfoList({
            infoState: 1, // 已发布
            showListFlag: 1, // 列表展示
            infoID: randomInfoID,
            ticket: PLAT_TICKET,
        }).then(res => res.result.datas.page.dataList[0]);
        return {
            author: regInfo.author,
            infoCategoryID: regInfo.infoCategoryID,
            infoCategoryName: regInfo.infoCategoryName,
            infoID: regInfo.infoID,
            infoTitle: regInfo.infoTitle,
            infoContentUrl: regInfo.infoContentUrl,
            topFlag: regInfo.topFlag,
            topFlagStr: regInfo.topFlagStr,
        }
    }

    /** 获取随机学校 */
    async getRandomSchool () {
        const schoolList = await wish.listForSelector({ ticket: PLAT_TICKET, }).then(res => res.result.datas.schoolList);
        return schoolList[common.getRandomNum(0, schoolList.length)];
    }

    /** 获取资讯分类 */
    async getInfoType (params) {
        // 
        const schoolInfoTypeListData = await wish.schoolInfoTypeList({
            schoolID: params.schoolID,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList);
        if (schoolInfoTypeListData.length == 0) {
            let json = {
                infoTypeName: `测试${new Date().getTime()}`,
                schoolID: params.schoolID,
                schoolName: params.schoolName,
                showInGuide: 2, // 不显示在指南
                showOrder: 1,
                shown: 1,
                description: common.getRandomNumStr(5),
            }
            json.ticket = PLAT_TICKET;
            await wish.saveSchoolInfoType(json);
            const schoolInfoType = await wish.schoolInfoTypeList({
                infoTypeName: json.infoTypeName,
                schoolID: json.schoolID,
                ticket: PLAT_TICKET
            }).then(res => res.result.datas.page.dataList[0]);
            return {
                description: schoolInfoType.description,
                infoTypeID: schoolInfoType.infoTypeID,
                infoTypeName: schoolInfoType.infoTypeName,
                schoolCode: schoolInfoType.schoolCode,
                schoolID: schoolInfoType.schoolID,
                schoolName: schoolInfoType.schoolName,
                showInGuide: schoolInfoType.showInGuide,
                showInGuideStr: schoolInfoType.showInGuideStr,
                showOrder: schoolInfoType.showOrder,
                shown: schoolInfoType.shown,
                shownStr: schoolInfoType.shownStr,
            };
        } else {
            const randomType = schoolInfoTypeListData[common.getRandomNum(0, schoolInfoTypeListData.length)]
            return {
                description: randomType.description,
                infoTypeID: randomType.infoTypeID,
                infoTypeName: randomType.infoTypeName,
                schoolCode: randomType.schoolCode,
                schoolID: randomType.schoolID,
                schoolName: randomType.schoolName,
                showInGuide: randomType.showInGuide,
                showInGuideStr: randomType.showInGuideStr,
                showOrder: randomType.showOrder,
                shown: randomType.shown,
                shownStr: randomType.shownStr,
            };
        }
    }

    /** 删除留学资讯 */
    async deleteSchoolInfo () {
        const delData = await wish.deleteSchoolInfo({
            schoolInfoID: this.schoolInfoID,
            ticket: PLAT_TICKET,
        });
        this.isDelete = true;
    }

    /** 更新留学资讯 */
    async updateSchoolInfo (params) {
        const schoolInfoID = await wish.schoolInfoList({
            infoID: params.infoID,
            schoolID: params.schoolID,
            ticket: PLAT_TICKET,
        }).then(res => res.result.datas.page.dataList[0].schoolInfoID)
        common.update(this, params);
        this.schoolCode = params.schoolID;
        this.infoID = params.infoIDCheckbox;

        this.schoolInfoID = schoolInfoID;
        // console.log(this);
    }

    /** 获取留学资讯列表 */
    async getSchoolInfoList (params) {
        const schoolInfoListData = await wish.schoolInfoList(params)
        return schoolInfoListData;
    }

    /** 留学资讯列表断言 */
    async schoolInfoListAssert () {
        const actual = await this.getSchoolInfoList({
            schoolID: this.schoolID,
            infoID: this.infoID,
            ticket: PLAT_TICKET,
        }).then(res => res.result.datas.page.dataList[0]);
        if (this.isDelete) {
            expect(undefined).to.be.equals(actual)
        } else {
            common.isApproximatelyEqualAssert(this, actual, ['saveType']);
        }

    }
}



const schoolInfoManage = module.exports = {};

schoolInfoManage.setupSchoolInfo = function () {
    return new SchoolInfo();
}
