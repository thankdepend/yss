const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const wish = module.exports = {};


/**
 * 获取用户留学院校列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p 
 */
wish.getQueryUserSubAbroadSchool = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.wish + '/api/m/auth/school/abroad/queryUserSubAbroadSchool.ws', params);
};

/**
 * 获取留学院校列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p 
 */
wish.getStudySchoolList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.wish + '/api/m/school/v190827/studySchoolList.ws', params);
};