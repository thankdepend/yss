const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const eval = module.exports = {};


/**
 * 保存评画内容（考生）
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.teacherId 老师id
 * @param {Number} data.p.teacherUserId 老师用户id
 * @param {Number} data.p.teacherName 老师名称
 * @param {Number} data.p.classId 类别id
 * @param {Number} data.p.className 类别名称
 * @param {Number} data.p.profId 专业id
 * @param {Number} data.p.profName 专业名称
 * @param {Number} data.p.paintUrl 评画url
 * @param {Number} data.p.describe 评画描述
 */
eval.saveStuEvaluation = async function (params = {}) {
    return common.evalPost(yssCaps.eval + '/api/m/auth/paint/v200929/save_stu_evaluation.htm', params);
};

/**
 * 保存评画订单
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.evaluationId 评画id
 * @param {Number} data.p.teacherId 老师id
 * @param {Number} data.p.userDiscountsID 优惠券id
 */
eval.commitEvaluationOrder = async function (params = {}) {
    return common.evalPost(yssCaps.eval + '/api/m/auth/paint/v200929/commit_evaluation_order.htm', params);
};


/**
 * 获取老师信息
 */
eval.getTeacherInfo = async function (params = {}) {
    return common.evalPost(yssCaps.eval + '/api/m/auth/teacherEvaluation/v200929/get_teacher_info.ws', params);
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

/** 
 * 查询评画列表（考生）
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Object} data.p.curPage
 */
eval.queryMyEvaluation = async function (params = {}) {
    return common.evalPost(yssCaps.eval + '/api/m/auth/paint/v200929/query_my_evaluation.htm', params);
};


