// const common = require('../../../lib/common');
const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const prob = module.exports = {};



/**
 * 查询概率用户
 */
prob.getProbUser = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost( yssCaps.prob + '/auth/prob/wishuser/doLoadData.htm' ,params);
};

/**
 * 修改概率用户次数
 */
prob.saveModifyNumEdit = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost( yssCaps.prob + '/auth/prob/wishuser/saveModifyNumEdit.htm' ,params);
};
