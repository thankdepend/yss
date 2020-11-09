// const common = require('../../../lib/common');
const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const prob = module.exports = {};



/**
 * 查询概率用户
 */
prob.getProbUser = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.prob + '/auth/prob/wishuser/doLoadData.htm' ,params);
};

/**
 * 修改概率用户次数
 */
prob.saveModifyNumEdit = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.prob + '/auth/prob/wishuser/saveModifyNumEdit.htm' ,params);
};

/**
 * 查询概率统考数据列表（统计计算公式）
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
    return httpRequest.sendPost(yssCaps.prob + '/auth/prob/jointScoreExpression/loadJointScoreExpressionData.htm' ,params);
};