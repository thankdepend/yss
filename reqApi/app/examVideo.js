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

/**
 * 直播抽考题
 * @param {Number} xueXiaoID 学校id
 * @param {Number} kaoShiID 考试id
 * @param {Number} zhuanYeID 专业id
 * @param {Number} kaoDianID
 * @param {Number} baoKaoID
 * @param {Number} arrangeId
 * @param {Number} slaveFlag
 */
examVideo.getChannel = async function (params = {}) {
    return common.sendPost(yssCaps.examvideo + '/api/m/auth/live/arrangement/getChannel.htm', params);
};