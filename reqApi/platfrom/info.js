const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const info = module.exports = {};


/**
 * 保存资讯
 * @param {Number} infoID 资讯id -编辑要传
 * @param {String} content 摘要
 * @param {String} infoState 资讯声明
 * @param {Number} topFlag 置顶标志
 * @param {String} infoCategoryName 资讯类别名称
 * @param {Number} infoCategoryID 资讯类别id
 * @param {String} infoTitle 资讯标题
 * @param {String} infoSubTitle 
 * @param {String} showListFlag 是否列表展示，1为是，2为否
 * @param {Number} timingFlag 定时推送标志，1为是，2为否
 * @param {String} timingPushDate 定时推送时间
 * @param {Number} commentFlag 评论开启标志，1为允许，2为不允许
 * @param {Number} provinceCode 省份编码，000000为全国
 * @param {Number} needPay 是否需要支付,0为否，1为是
 * @param {String} needPayInfoType 付费业务
 * @param {Number} orderNum 排序编号
 * @param {Number} belongOrg 所属部门
 * @param {String} author 坐着
 * @param {String} pictureURL 封面url
 * @param {String} publishDate 发行日期
 * @param {String} infoPreview 资讯预览
 * @param {String} infoContentUrl 资讯文本内容
 */
info.saveInfo = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/info/saveInfo.htm`, params);
};

/**
 * 查询资讯列表
 * @param {*} belongOrg 所属部门
 * @param {*} infoCategoryID 分类id
 * @param {*} topFlag 置顶标志
 * @param {*} infoState 发布标记
 * @param {*} showListFlag 列表显示
 * @param {*} infoID 资讯id
 * @param {*} infoTitle 资讯标题
 * @param {*} begDate 开始时间
 * @param {*} endDate 结束时间
 * @param {*} curPage
 * @param {*} pageSize
 */
info.getLoadInfoList = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/info/loadInfoData.htm`, params);
};

/**
 * 资讯详情
 */
info.getLoadInfoDetail = async function (params = {}) {
    return common.sendGet(yssCaps.info + `/auth/info/info/${params.infoID}/infoDetailContent.htm?${params.ticket}`);
};

/**
 * 置顶帖子
 * @param {Number} infoID 资讯id
 */
info.setTop = async function (params = {}) {
    return common.sendGet(yssCaps.info + `/auth/info/info/top.htm`, params);
};

/** 
 * 发布帖子
 * @param {Number} infoID 资讯id
 */
info.publish = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/info/publish.htm`, params)
}

/** 
 * 删除帖子
 * @param {Number} infoID 资讯id
 */
info.deleteInfo = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/info/deleteInfo.htm`, params)
}