const common = require('../lib/common');
// const format = require('../../../data/format');
const yssCaps = require('../data/caps');
const httpRequest = require('../lib/httpRequest')
const wish = module.exports = {};


/**
 * 保存用户(新接口)
 */

wish.saveUser = async function (params = {}) {
    return httpRequest.post( yssCaps.prob + '/api/m/auth/wish/user/v200630/saveUser.htm' ,{ ...params});
};

/**
 * 概率用户查询(新接口)
 */

wish.getUser = async function (params = {}) {
    return httpRequest.post( yssCaps.prob + '/api/m/auth/wish/user/v200630/getUser.htm' ,{ ...params});
};