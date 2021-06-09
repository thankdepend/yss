// const common = require('../../../lib/common');
const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');
const { common } = require('../../lib/index');

const prob = module.exports = {};



/**
 * 查询概率用户
 */
prob.getProbUser = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.prob + '/auth/prob/wishuser/doLoadData.htm', params);
};

/**
 * 修改概率用户次数
 */
prob.saveModifyNumEdit = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.prob + '/auth/prob/wishuser/saveModifyNumEdit.htm', params);
};

/**
 * 查询概率统考数据列表（统考计算公式）
 * @param id 数据id
 * @param dataYear 年份
 * @param schoolID 学校id
 * @param provinceID 省份id
 * @param jointProfTypeID 统考专业类型
 * @param artsOrSciences 文理科 1为文、2为理
 * @param enrollBasisType 录取方式类型
 * @param profName 专业名
 * @param curPage 页数
 * @param pageSize 每页数
 */
prob.getJointScoreList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.prob + '/auth/prob/jointScoreExpression/loadJointScoreExpressionData.htm', params);
};

/**
 * 查询概率校考数据列表（校考计算公式）
 * @param id 数据id
 * @param dataYear 年份
 * @param schoolID 学校id
 * @param provinceID 省份id
 * @param jointProfTypeID 统考专业类型
 * @param artsOrSciences 文理科 1为文、2为理
 * @param enrollBasisType 录取方式类型
 * @param profName 专业名
 * @param curPage 页数
 * @param pageSize 每页数
 */
prob.getSchoolScoreExpressionList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.prob + '/auth/prob/schoolScoreExpression/loadSchoolScoreExpressionData.htm', params);
};

/**
 * 获取省批次信息（后台）
 * @param lineId 数据id
 * @param dataYear 年份
 * @param provinceID 省份id
 * @param jointProfTypeID 统考专业类型
 */
prob.getProvinceBatchLine = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.prob + '/auth/prob/provinceBatchLine/loadProvinceBatchLineData.htm', params);
};

/**
 * 查询全部用户
 * @param {Number} userID 用户id
 * @param {String} userName 用户名
 * @param {Number} provinceID 省份id
 * @param {Number} artsOrSciences 文理科别
 */
prob.queryAllUser = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.prob + '/auth/prob/wishuser/queryAllUser.htm', params);
};

/**
 * 查询同步记录列表
 * @param {String} syncTable 同步表
 * @param {Number} dataSyncStatus 数据同步状态
 * @param {Number} provinceID 省份id
 * @param {String} initiator 发起人
 */
prob.syncRecordList = async function (params = {}) {
    return common.sendPost(yssCaps.prob + '/auth/prob/pool/loadSyncRecordData.htm', params);
};

/**
 * 查询同步一条记录
 * @param {Number} id 同步id
 */
prob.syncOneRecord = async function (params = {}) {
    return common.sendPost(yssCaps.prob + '/auth/prob/pool/syncOneRecord.htm', params);
};

/**
 * 保存用户省份修改次数
 * @param {Number} userID 用户id
 * @param {Number} userName 用户名
 * @param {Number} rovinceName 高考省份
 * @param {Number} jointProfTypeName 统考类别
 * @param {Number} artsOrSciencesStr 文理科别
 * @param {Number} collEntrExamScore 高考分数
 * @param {Number} jointExamScore 统考分数
 * @param {Number} probabilityModProvNum 省份信息已修改次数
 * @param {Number} modifyNum 高考分数已修改次数
 * @param {Number} modifyJointScoreNum 统考分数已修改次数
 * @param {Number} englishModifyNum  英语分已修改次数
 * @param {Number} chineseModifyNum  语文分已修改次数
 * @param {Number} jointRank  统考位次
 * @param {Number} comprehensiveRank  综合分位次
 * @param {Number} englishScore  英语成绩
 * @param {Number} chineseScore  语文成绩
 * @param {Number} modifyComprehensiveRankNum 综合分位次
 * @param {Number} modifyJointRankNum 统考位次已修改次数
 * @param {Number} modifyJointProfTypeNum 统考类别已修改次数
 * @param {Number} probabilityCanModProvNum 省份信息可修改次数
 * @param {Number} canModifyJointProfTypeNum  统考类别可修改次数
 * @param {Number} canModifyCollEntrNum  高考分数可修改次数
 * @param {Number} canModifyJointScoreNum  统考分数可修改次数
 * @param {Number} chineseLeftNum  中文可修改次数
 * @param {Number} englishLeftNum  英语分可修改次数
 * @param {Number} canModifyJointRankNum  统考位次可修改次数
 * @param {Number} canModifyComprehensiveRankNum  综合分位次可修改次数
 * @param {Number} remark 备注
 */
prob.saveModifyNumEdit = async function (params = {}) {
    return common.sendPost(yssCaps.prob + '/auth/prob/wishuser/saveModifyNumEdit.htm', params);
};

