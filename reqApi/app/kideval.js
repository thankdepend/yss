const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const kideval = module.exports = {};


/**
 * 语音转文字
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.voiceAssess 语音地址
 */
kideval.transAudio = async function (params = {}) {
    return common.sendPost(yssCaps.kideval + '/api/m/auth/teacherEvaluation/v210602/trans_audio.htm', params);
};

/**
 * 考生端作品列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.hotFlag 热门标记
 */
kideval.queryEvaluationList = async function (params = {}) {
    return common.sendPost(yssCaps.kideval + '/api/m/auth/paint/v210602/query_evaluation_list.ws', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/**
 * 考生端作品详情
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.evaluationId 评画id
 */
kideval.queryEvaluationDetail = async function (params = {}) {
    return common.sendPost(yssCaps.kideval + '/api/m/auth/paint/v210602/query_evaluation_detail.ws', params);
};

