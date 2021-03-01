const {
    common
} = require('../../lib/index');
const yssCaps = require('../../data/caps');

const public = module.exports = {};
/**
 * 保存参数
 * @param {String} paramKey 参数键[EVALUATION_TEACHER_DEFAULT_PRICE]
 * @param {String} paramName 参数名
 * @param {Number} paramType 参数类型
 * @param {Number} paramValue 参数值
 * @param {Number} paramValueTemp 参数值模板
 * @param {String} remark 备注 
 * @param {Number} status 状态[1为启用]
 */
public.saveParam = async function (params = {}) {
    return common.sendPost(yssCaps.public + '/auth/admin/param/saveParam.htm', params);
};

