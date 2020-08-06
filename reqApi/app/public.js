const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const public = module.exports = {};


/**
 * 获取用户留学院校列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {String} data.p.topicCategoryID 话题分类ID
 */
public.getTopticList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.public + '/api/m/toptic/v191112/queryTopticList.ws', params);
};

/**
 * 获取图片列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {String} data.p.modelCode 模式码 pic_hulaquan_live
 */
public.getPictureList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.public + '/api/m/v1/banner/queryPictureList.htm', params);
};