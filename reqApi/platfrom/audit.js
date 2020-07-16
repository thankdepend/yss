const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const audit = module.exports = {};

/**
 * 肖像审核-线上确认审核列表
 * @param {String} idcardNo 身份证号
 * @param {Number} auditFlag 待审核-1、审核通过1、审核不通过2
 * @param {Number} commitFlag 未提交0,、已提交1
 * @param {Number} begCommitDate
 * @param {Number} endCommitDate 
 * @param {Number} begDate 
 * @param {Number} endDate
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
audit.getAuditList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.audit + '/auth/admin/audit/auditListData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/**
 * 审核肖像-线上确认-审核
 * @param {Number} psId: 263750
 * @param {Number} auditFlag: 1
 * @param {Number} applyTicket: 1
 */
audit.auditAction = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.audit + '/auth/admin/audit/auditAction.htm', params);
};