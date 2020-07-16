const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const college = module.exports = {};

/**
 * 添加院校
 * @param {*} params 
 */
college.toAddCollege = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/admin/college/toAddCollege.htm', params);
};


/**
 * 编辑院校
 */
college.doEditCollege = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/admin/college/doEditCollege.htm', params);
};