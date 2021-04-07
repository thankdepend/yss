const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const monitor = module.exports = {};


/** 
 * 更新考试时间缓存
 * @param {Number} riChengId 日程id
 * @param {Number} userId 用户id
 * @param {Number} minutes 分钟
 */
monitor.updateExamDateCache = async function (params = {}) {
    return common.sendGet(yssCaps.monitor + `/auth/monitor/cache/updateExamDateCache.htm?`, params)
}