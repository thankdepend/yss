const wish = require('../../../reqApi/platfrom/wish');
const wishApp = require('../../../reqApi/app/wish');
const { common } = require('../../../lib/index');

/** 留学资讯类别 */
class SchoolInfoType {
    constructor() {
        /** description */
        this.description = '';
        /** 资讯类别ID */
        this.infoTypeID = '';
        /** 资讯类别名称 */
        this.infoTypeName = '';
        /** 院校编码 */
        this.schoolCode = '';
        /** 院校ID */
        this.schoolID = '';
        /** 院校名称 */
        this.schoolName = '';
        /** 是否显示在指南 */
        this.showInGuide = '';
        /** 是否显示在指南解释 */
        this.showInGuideStr = '';
        /** 排序 */
        this.showOrder = '';
        /** 是否显示 */
        this.shown = '';
        /** 是否显示解释 */
        this.shownStr = '';
        /** 删除标记 */
        this.isDelete = false;
    }

    /** 保存留学资讯分类 */
    async saveSchoolInfoType (params = {}) {
        let json = Object.assign({
            infoTypeName: `测试${new Date().getTime()}`,
            schoolID: 10002, // 中国人民大学（写死）
            schoolName: '中国人民大学', // 这个传了没用，仅为校验使用
            showInGuide: 2,
            showOrder: 1,
            shown: 1,
            description: common.getRandomNumStr(5),
        }, params)
        json.ticket = PLAT_TICKET;
        const saveData = await wish.saveSchoolInfoType(json);
        // console.log(saveData);
        await this.updateSchoolInfoType(json);
    }

    /** 获取资讯类型最大序号 */
    async getMaxSchoolInfoTypeOrder () {
        const infoTypeList = await wish.schoolInfoTypeList({
            ticket: PLAT_TICKET,
        }).then(res => res.result.datas.page.dataList);

        const showOrderList = infoTypeList.map(obj => obj.showOrder);
        return showOrderList;
    }

    /** 删除留学资讯分类 */
    async deleteSchoolInfoType () {
        const delData = await wish.deleteSchoolInfoType({
            infoTypeID: this.infoTypeID,
            ticket: PLAT_TICKET,
        });
        // console.log('删除', delData);
        this.isDelete = true;
    }

    /** 更新留学资讯分类 */
    async updateSchoolInfoType (params) {
        const infoTypeID = await wish.schoolInfoTypeList({
            infoTypeName: params.infoTypeName,
            schoolID: params.schoolID,
            ticket: PLAT_TICKET,
        }).then(res => res.result.datas.page.dataList[0].infoTypeID)
        this.infoTypeID = infoTypeID;
        this.schoolCode = params.schoolID;
        common.update(this, params);
        this.showInGuide == 1 ? this.showInGuideStr = '是' : this.showInGuide == 2 ? this.showInGuideStr = '否' : '';
        this.shown == 1 ? this.shownStr = '显示' : this.shown == 2 ? this.shownStr = '不显示' : '';
        // console.log(this);
    }

    /** 获取留学资讯分类列表 */
    async getSchoolInfoTypeList (params) {
        const schoolInfoTypeListData = await wish.schoolInfoTypeList(params)
        return schoolInfoTypeListData;
    }

    /** 留学资讯分类列表断言 */
    async schoolInfoTypeListAssert () {
        const actual = await this.getSchoolInfoTypeList({
            infoTypeName: this.infoTypeName,
            schoolID: this.schoolID,
            ticket: PLAT_TICKET,
        }).then(res => res.result.datas.page.dataList[0]);
        if (this.isDelete) {
            expect(undefined).to.be.equals(actual)
        } else {
            common.isApproximatelyEqualAssert(this, actual);
        }

    }
}



const schoolInfoTypeManage = module.exports = {};

schoolInfoTypeManage.setupSchoolInfoType = function () {
    return new SchoolInfoType();
}
