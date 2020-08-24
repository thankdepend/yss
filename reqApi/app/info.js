const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const info = module.exports = {};


/**
 * 获取留学院校列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {String} data.p.province 省份
 * @param {String} data.p.city 城市
 * @param {Number} data.p.infoCategoryID 分类ID
 */
info.getStudyAbroad = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.info + '/api/m/v3/info/studyAbroadIndex.ws', params);
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
    return httpRequest.sendPost(yssCaps.info + '/api/m/abroad/v191112/InfoList.ws', params);
};


/**
 * 获取资讯详情
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.infoID 资讯ID
 */
info.getInfoDetail = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.info + '/api/m/v3/info/v190910/getInfoDetail.ws', params);
};

/**
 * 查询院校资讯列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Array} data.p.infoIdList 资讯id列表
 */
info.queryInfoListForCollege = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.info + '/api/m/v1/info/queryInfoListForCollege.htm', params);
};