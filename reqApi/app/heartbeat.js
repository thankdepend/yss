const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const heartbeat = module.exports = {};



/**
 * 开始录制
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Object} data.p.mirror 镜像1是,2否
 * @param {Object} data.p.esId 科目id
 * @param {Object} data.p.simulation 是否模拟,1是,2否
 * @param {Object} data.p.baoKaoId 报考id
 * @param {Object} data.p.needHeart 心跳标志
 * @param {Object} data.p.master 主机,1是,2否
 */
heartbeat.startRecord = async function (params = {}) {
    return common.sendPost(yssCaps.heartbeat + '/api/m/video/v20201219/start_record.ws', params);
};

/**
 * 清除录制状态
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Object} data.p.mirror 镜像[1是,2否]
 * @param {Object} data.p.esId 科目id
 * @param {Object} data.p.simulation 是否模拟[1是,2否]
 * @param {Object} data.p.baoKaoId 报考id
 * @param {Object} data.p.needHeart 心跳标志
 * @param {Object} data.p.master 机器状态[1为主机,2为辅机]
 */
heartbeat.clearRecordStatus = async function (params = {}) {
    return common.sendPost(yssCaps.heartbeat + '/api/m/video/v20201219/clear_record_status.ws', params);
};

