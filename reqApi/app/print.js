const {
    common
} = require('../../lib/index');
// const format = require('../../../data/format');
const yssCaps = require('../../data/caps');
// const httpRequest = require('../../lib/httpRequest')
const print = module.exports = {};

/**
 * 报名确认列表
 * @param data
 * @param data.m 
 * @param data.p.baoKaoBZ 报考标志 1未提交 2已提交 3已生效 4已关闭 5作废
 */
print.getAffirmList = async function (params = {}) {
    return common.sendPost(yssCaps.print + '/api/m/auth/apply/v4/query_online_confirm.htm', params);
}