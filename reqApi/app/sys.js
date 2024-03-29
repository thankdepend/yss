const yssCaps = require('../../data/caps');
const { common } = require('../../lib/index')
const sys = module.exports = {};


/**
 * 检查app版本
 * @param {number} data.p.appType app类型 
 * @param {number} data.p.version 版本
 * @param {Number} data.p.platform 平台编号 1
 * @param {Object} data.m
 */

sys.checkVersion = async function (params = {}) {
    return common.sendPost(yssCaps.sys + '/api/m/app/check_version.ws', {
        ...params
    });
};

/**
 * 查询网络考试消息通知
 */
sys.queryOnlineExamNews = async function (params = {}) {
    return common.sendPost(yssCaps.sys + '/api/m/schoolNews/query_online_exam_news.htm', {
        ...params
    });
};



