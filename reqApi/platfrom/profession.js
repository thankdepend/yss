const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const profession = module.exports = {};

/**
 * 获取院校专业列表
 */
profession.getGbProfClass = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/profession/getGbProfClass.htm', params);
};

/**
 * 获取志愿专业编号
 */
profession.getZhuanYeBH = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/profession/getZhuanYeBH.htm', params);
};

/**
 * 保存院校常用专业库
 * @param {Number} zhuanYeBH 专业编号
 * @param {Number} cengJiMC 成绩名称
 * @param {Number} zhuanYeCJ 1
 * @param {Number} fuZhuanYe 0 副专业
 * @param {Number} zhuanYeID 专业id
 * @param {Number} zhuanYeMC 专业名称
 * @param {Number} guoBiaoDM_IN 国标
 */

profession.saveBacthProfession = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/profession/saveBacthProfession.htm', params);
};

/**
 * 查询院校常用专业库列表
 * @param {Number} year 年份
 * @param {Number} currentFlag 
 * @param {String} zhuanYeMC 
 * @param {Number} curPage 页数
 * @param {Number} pageSize  每页展示
 */
profession.getprofessionInfoList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/profession/professionInfoData.htm', params);
};