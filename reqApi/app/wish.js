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
 * @param {String} data.p.userName
 * @param {Number} data.p.professionId
 * @param {String} data.p.professionRemark 
 * @param {Number} data.p.willCountry 意向国家
 * @param {Number} data.p.phoneNumber
 * @param {Number} data.p.willTakeExam
 * @param {Number} data.p.studyBudget
 * @param {Number} data.p.profAvgScore
 * @param {Number} data.p.cultureAvgScore
 * @param {Number} data.p.parentPhone
 */
wish.addStudycollect = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/api/m/abroad/studycollect/addStudycollect.htm', params);
};