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
 * @param {Number} belongOrg 所属部门
 * @param {Number} infoCategoryID 分类id
 * @param {Number} topFlag 置顶标志
 * @param {Number} infoState 发布标记
 * @param {Number} showListFlag 列表显示
 * @param {Number} infoID 资讯id
 * @param {String} infoTitle 资讯标题
 * @param {String} begDate 开始时间
 * @param {String} endDate 结束时间
 * @param {Number} curPage
 * @param {Number} pageSize
 */
info.getLoadInfoList = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/info/loadInfoData.htm`, params);
};

/**
 * 资讯详情
 */
info.getLoadInfoDetail = async function (infoID, params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/info/${infoID}/infoDetailContent.htm`, params);
};

/**
 * 置顶帖子
 * @param {Number} infoID 资讯id
 */
info.setTop = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/info/top.htm`, params);
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

/**
 * 查询资讯分类类别
 * @param {Number} infoCategoryID 分类id
 * @param {Number} infoCategoryName 分类名
 * @param {Number} orderNum 排序号
 * @param {Number} remark 备注
 * @param {Number} curPage
 * @param {Number} pageSize
 */
info.loadInfoCategoryList = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/infoCategory/loadInfoCategoryData.htm`, Object.assign({
        curPage: 1,
        pageSize: 15
    }, params))
}

/**
 * 添加资讯评论
 * @param {Number} infoID 资讯id
 * @param {Number} pCommentUserID 评论用户id
 * @param {Number} commentID 评论id
 * @param {Number} infoTitle 资讯标题
 * @param {Number} answerer [{1：当前账号},{2:其他账号}]
 * @param {Number} otherAnswererLoginName 评论用户名称
 * @param {Number} content 评论内容
 */
info.addInfoComment = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/infoComment/addInfoComment.htm`, params)
}

/** 查看资讯评论
 * @param {Number} infoID 资讯id
 */
info.getInfoReviewList = async function (params = {}) {
    return common.sendPost(yssCaps.info + `/auth/info/info/loadInfoReviewData.htm?`, params)
}
