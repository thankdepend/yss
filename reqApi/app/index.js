const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const index = module.exports = {};


/**
 * 获取推荐视频列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.curPage 
 * @param {Number} data.p.pageSize 
 */
index.getArtCourseRecommend = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/api/m/v1/index/queryArtCourseRecommend.htm', params);
};

/**
 * 获取首页分类列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
index.queryIndex = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/api/m/index/v201020/queryIndex.htm', params);
};

/**
 * 功能入口
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
index.queryIndex = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/api/m/index/v210520/queryIndex.ws', params);
};

/**
 * 获取直播视频
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
index.recommend = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/api/m/v1/index/v190617/recommend.ws', params);
};

/**
 * 分类与话题--分类管理
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */

index.queryInfoCateList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/api/m/v1/index/queryInfoCateList.ws', params);
};