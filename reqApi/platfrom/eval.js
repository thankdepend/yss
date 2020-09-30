const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const eval = module.exports = {};



/**
 * 获取老师信息
 */
eval.getTeacherInfo = async function (params = {}) {
    return common.sendPost(yssCaps.eval + '/api/m/auth/teacherEvaluation/v200929/get_teacher_info.ws', params);
};

/**
 * 获取评画列表
 */
eval.getEvaluationList = async function (params = {}) {
    return common.evalPost(yssCaps.eval + '/api/m/auth/teacherEvaluation/v200929/query_evaluation.ws', params);
};

/**
 * 获取打分项列表
 * @param {Number} classId 类别id
 * @param {Number} profId 专业id
 */
eval.getScoreItemList = async function (params = {}) {
    return common.evalPost(yssCaps.eval + '/api/m/auth/teacherEvaluation/v200929/query_score_item.ws', params);
};

/**
 * 提交批改
 * @param {Number} evaluationId 评画id
 * @param {String} modifyPaintUrl 评画url
 * @param {Number} score 分数
 * @param {Object} evaluationDetail 评画详情
 * @param {Object} teacherAssess 文字评论
 * @param {Object} voiceAssess 语音评论
 * @param {Array} scoreDetailList 打分列表
 * @param {Number} scoreDetailList[].itemId 打分项id
 * @param {Number} scoreDetailList[].itemName 打分项名
 * @param {Number} scoreDetailList[].score 分数
 */
eval.submitEvaluation = async function (params = {}) {
    return common.evalPost(yssCaps.eval + '/api/m/auth/teacherEvaluation/v200929/submit_evaluation.ws', params);
};

/**
 * 获取banner信息
 */
eval.getEvalBanner = async function (params = {}) {
    return common.sendPost(yssCaps.eval + '/api/m/auth/paint/v200929/get_evaluation_banner.ws', params);
};