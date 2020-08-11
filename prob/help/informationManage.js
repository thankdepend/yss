const info = require('../../reqApi/platfrom/info');
const {
    common
} = require('../../lib/index');
const {
    assert,
    expect
} = require('chai');

class Information {
    constructor() {
        /** 资讯id */
        this.infoID = '';
        /** 资讯地址 */
        this.qrcodeUrl = '';
        /** 摘要 */
        this.content = '';
        /** infoState */
        this.infoState = '';
        /** 顶部标志 */
        this.topFlag = '';
        /** 分类名称 */
        this.infoCategoryName = '';
        /** 分类id */
        this.infoCategoryID = '';
        /** 资讯标题 */
        this.infoTitle = '';
        /** infoSubTitle */
        this.infoSubTitle = '';
        /** 列表显示标记 */
        this.showListFlag = '';
        /** 定时标志 */
        this.timingFlag = '';
        /** 定时推送时间 */
        this.timingPushDate = '';
        /** 评论标志 */
        this.commentFlag = '';
        /** 省份编码 */
        this.provinceCode = '';
        /** 是否需要支付 */
        this.needPay = '';
        /** 支付所属类型 */
        this.needPayInfoType = '';
        /** 排序号 */
        this.orderNum = '';
        /** 所属部门 */
        this.belongOrg = '';
        /** 作者 */
        this.author = '';
        /** 图片url */
        this.pictureURL = '';
        /** 推送时间 */
        this.publishDate = '';
        /** 资讯预览 */
        this.infoPreview = '';
        /** 资讯文本内容 */
        this.infoContentUrl = '';
        /** 浏览 */
        this.infoStatisticalDO = {};
        /** 展示编辑 */
        this.showEdit = true;
        /** 是否允许评论 */
        this.isCanComment = false;
    }

    /** 保存资讯 */
    async saveInfo(params) {
        const res = await info.saveInfo(params);
        // console.log(res);
        common.update(this, res.params);
        common.update(this, res.result.datas);
        // 设置浏览的初始值
        this.infoStatisticalDO = {
            infoID: this.infoID,
            praiseNum: 0,
            browseNum: 0,
            realBrowseNum: 0,
            reviewNum: 0,
            shareNum: 0,
            likeNum: 0,
            notLikeNum: 0,
            collectNum: 0,
            browseNumStr: '0',
        };
        common.update(this, {
            showEdit: true,
            isCanComment: false,
        });
        // console.log(this);
    }

    /** 查询资讯列表 */
    async _loadInfoList(params) {
        const res = await info.getLoadInfoList(Object.assign({
            ticket: PLAT_TICKET,
            curPage: 1,
            pageSize: 15
        }, params)).then(res => res.result.datas.page);
        // console.log(res);
        return res;
    }

    /** 资讯列表断言 */
    async loadInfoListAssert(del) {
        if (del) {
            const delRes = await this._loadInfoList();
            const a = delRes.dataList.find(obj => obj.infoID == this.infoID);
            // console.log('a', a);
            expect(a).to.be.undefined();
            return this;
        }
        const res = await this._loadInfoList();
        const actualRes = res.dataList.find(obj => obj.infoID == this.infoID);
        const expObject = _.cloneDeep(this);
        const exp = Object.assign(expObject, {
            infoID: expObject.infoID,
            praiseNum: expObject.infoStatisticalDO.praiseNum,
            browseNum: expObject.infoStatisticalDO.browseNum,
            realBrowseNum: expObject.infoStatisticalDO.realBrowseNum,
            reviewNum: expObject.infoStatisticalDO.reviewNum,
            shareNum: expObject.infoStatisticalDO.shareNum,
            likeNum: expObject.infoStatisticalDO.likeNum,
            notLikeNum: expObject.infoStatisticalDO.notLikeNum,
            collectNum: expObject.infoStatisticalDO.collectNum,
            browseNumStr: `${expObject.infoStatisticalDO.browseNumStr}`,
        }, {
            belongOrgStr: '一部',
            topFlagStr: expObject.topFlag == 2 ? '未置顶' : expObject.topFlag == 1 ? '已置顶' : '',
            showListFlagStr: expObject.showListFlag == 1 ? '显示' : expObject.showListFlag == 0 ? '不显示' : '',
            infoStateStr: expObject.infoState == 2 ? '已保存' : expObject.infoState == 1 ? '已发布' : '',
            topFlagOptionStr: expObject.topFlag == 1 ? '取消置顶' : expObject.topFlag == 2 ? '置顶' : '',
            infoStateOptionStr: expObject.infoState == 1 ? '取消发布' : expObject.infoState == 2 ? '发布' : '',
            showEdit: expObject.showEdit,
            isCanComment: expObject.isCanComment,

        })
        // console.log('资讯列表', actualRes);
        common.isApproximatelyEqualAssert(exp, actualRes, ['infoContentUrl', 'publishDate'], '数据校验不通过！！');

    }

    /** 查询资讯详情 */
    async _loadInfoDetail(params) {
        const res = await info.getLoadInfoDetail(Object.assign({
            ticket: PLAT_TICKET,
            infoID: this.infoID
        }, params));
        return res;
    }

    /** 资讯详情断言 */
    async loadInfoDetailAssert() {
        const detail = await this._loadInfoDetail();
        console.log(detail);
    }

    /** 置顶帖子 */
    async setTop() {
        await info.setTop({
            infoID: this.infoID,
            ticket: PLAT_TICKET
        })
        this.topFlag = 2;
    }

    /** 发布帖子 */
    async publish(off) {
        if (off == true) {
            await info.publish({
                infoID: this.infoID,
                ticket: PLAT_TICKET
            });
            this.infoState = 2;
            this.showEdit = true;
        }

        await info.publish({
            infoID: this.infoID,
            ticket: PLAT_TICKET
        });
        this.infoState = 1;
        this.showEdit = false;
        // this.publishDate = new Date().getTime()
    }

    /** 删除帖子 */
    async deleteInfo() {
        const res = await info.deleteInfo({
            infoID: this.infoID,
            ticket: PLAT_TICKET
        })
        console.log('删除', res);
    }

}



const informationManage = module.exports = {};

informationManage.setupInformation = function () {
    return new Information();
}

/** 保存资讯mock参数 */
informationManage.informationMockJson = async function (params) {
    let json = Object.assign({
        infoID: '',
        content: '',
        infoState: 2,
        topFlag: 2,
        infoCategoryName: '头条',
        infoCategoryID: 8,
        infoTitle: `蜜獾自动化资讯${common.getRandomStr(5)}`,
        infoSubTitle: '',
        showListFlag: 1,
        timingFlag: 2,
        timingPushDate: '',
        commentFlag: 2,
        provinceCode: 000000,
        needPay: 0,
        needPayInfoType: '',
        orderNum: 113,
        belongOrg: 1,
        author: '蜜獾',
        pictureURL: 'http://img.artstudent.cn/pr/2020-08-10/3b697be5a37b4f68b3a557343fc737b3.png',
        publishDate: '',
        infoPreview: '',
        infoContentUrl: common.getRandomContent(100),
        ticket: PLAT_TICKET,
    }, params)
    return json;
}