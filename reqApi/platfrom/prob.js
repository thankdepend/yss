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