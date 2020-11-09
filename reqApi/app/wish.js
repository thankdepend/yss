const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const wish = module.exports = {};


/**
 * 获取用户订阅列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p 
 */
wish.queryUserSubAbroadSchool = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/api/m/auth/school/abroad/queryUserSubAbroadSchool.ws', params);
};

/**
 * 获取留学院校列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p 
 */
wish.getStudySchoolList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/api/m/school/v190827/studySchoolList.ws', params);
};

/**
 * 添加留学意向表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {String} data.p.userName 用户名
 * @param {Number} data.p.professionId 专业id
 * @param {String} data.p.professionRemark 专业备注
 * @param {Number} data.p.willCountry 意向国家
 * @param {Number} data.p.phoneNumber 手机号
 * @param {Number} data.p.willTakeExam 意向专业
 * @param {Number} data.p.studyBudget 学费预算
 * @param {Number} data.p.profAvgScore 专业平均分
 * @param {Number} data.p.cultureAvgScore 文化平均分
 * @param {Number} data.p.parentPhone 家长电话
 */
wish.addStudycollect = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/api/m/abroad/studycollect/addStudycollect.htm', params);
};

/**
 * 留学国家列表(研究生)
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 */
wish.queryAbroadCountryList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/api/m/country/abroad/201020/queryAbroadCountryList.htm', params);
};

/**
 * 留学国家详情(研究生)
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {String} data.p.countryId 国家id
 */
wish.getAbroadCountryDetail = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/api/m/country/abroad/201020/getAbroadCountryDetail.htm', params);
};
