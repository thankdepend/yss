
const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const stu = module.exports = {};



/**
 * 报名-院校搜索
 */
stu.seekCollege = async function (params = {}) {
    return httpRequest.post( yssCaps.stu + '/api/m/auth/college/v4/seekCollege.htm' , params);
};

/**
 * 报名
 */
stu.saveProf = async function (params = {}) {
    return httpRequest.post( yssCaps.stu + '/api/m/auth/apply/save_prof.htm' , params);
};
