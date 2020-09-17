const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const info = module.exports = {};


/**
 * 获取留学院校首页列表（banner+资讯）
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {String} data.p.province 省份
 * @param {String} data.p.city 城市
 * @param {Number} data.p.infoCategoryID 分类ID
 * @param {Number} data.p.topicID 话题id
 */
info.getStudyAbroad = async function (params = {}) {
    return common.sendPost(yssCaps.info + '/api/m/v3/info/studyAbroadIndex.ws', params);
};


/**
 * 获取资讯列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.topicID 话题ID
 * @param {Number} data.p.curPage 当前页
 */
info.getInfoList = async function (params = {}) {
    return common.sendPost(yssCaps.info + '/api/m/abroad/v191112/InfoList.ws', params);
};

/**
 * 查询资讯列表（APP首页）
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.topicID 话题ID
 * @param {Number} data.p.infoCategoryID 资讯类型id
 * @param {Number} data.p.provinceCode 省份编码
 * @param {Number} data.p.pageSize 
 * @param {Number} data.p.curPage 
 */
info.queryInfoList = async function (params = {}) {
    return common.sendPost(yssCaps.info + '/api/m/info/v191015/queryInfoList.ws', params);
};



/**
 * 获取资讯详情
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.infoID 资讯ID
 */
info.getInfoDetail = async function (params = {}) {
    return common.sendPost(yssCaps.info + '/api/m/v3/info/v190910/getInfoDetail.ws', params);
};

/**
 * 查询院校资讯列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Array} data.p.infoIdList 资讯id列表
 */
info.queryInfoListForCollege = async function (params = {}) {
    return common.sendPost(yssCaps.info + '/api/m/v1/info/queryInfoListForCollege.htm', params);
};

/**
 * 留学咨询评论
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.infoID 资讯id
 * @param {String} data.p.infoTitle 资讯标题
 * @param {String} data.p.content 资讯文本
 */
info.addInfoComment = async function (params = {}) {
    return common.sendPost(yssCaps.info + '/api/m/auth/v1/info/comment/addInfoComment.htm', params);
};

/**
 * 留学私信咨询发送CRM
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.customerUserId 客户用户id
 * @param {Number} data.p.customerMobile 客户手机号
 * @param {String} data.p.customerNickName 客户昵称
 * @param {Number} data.p.customerIdCard 客户名片id
 * @param {Object} data.p.extendsJson
 * @param {String} data.p.extendsJson.countryName 国家名
 * @param {String} data.p.extendsJson.profName 专业名
 */
info.wishPrivatechat = async function (params = {}) {
    return common.sendPost(yssCaps.info + '/api/m/auth/crmDataSource/200915/wishPrivatechat.htm', params);
};