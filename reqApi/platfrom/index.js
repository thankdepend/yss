const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const index = module.exports = {};


/**
 * 保存app首页
 * @param {Array} dataJson 数据json
 * @param {Number} setType 8
 * @param {String} menuCode 菜单类型码 [access_home,info_type_home]等等
 * @param {Number} setID 2
 */
index.saveIndexData = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/auth/hulaquan/base/indexset/saveData.htm', params);
};

/**
 * 直播推荐列表
 * @param {Number} setType 设置类型 13
 */
index.loadRoomBaseSet = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/auth/hulaquan/base/vcloudRecommend/loadRoomBaseSetData.htm', params);
};

/**
 * 保存直播推荐
 * @param {Number} setType 设置类型 13
 * @param {Number} setID 设置id
 * @param {Number} menuCode 菜单码 vcloud_recommend
 * @param {Array} dataJson 数据列表
 */
index.saveLiveRecommend = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/auth/hulaquan/base/vcloudRecommend/saveData.htm', params);
};

/**
 * 资讯分类推荐
 * @param {Number} setType 设置类型 12
 */
index.indexSetInfoCateList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.index + '/auth/hulaquan/base/indexset/infoCateLoadData.htm', params);
};