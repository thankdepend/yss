const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const examVideo = module.exports = {};


/**
 * 查询报考状态
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
examVideo.queryBaoKaoStatus = async function (params = {}) {
    return common.sendPost(yssCaps.examvideo + '/api/m/auth/live/stuQueue/queryBaoKaoStatus.htm', params);
};