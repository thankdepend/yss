const common = require('../../lib/common');
const yssAccount = require('../data/account');
const caps = require('../../data/caps');
const base = require('../../reqApi/baseLogin')
const hulaquanApp = require('../../reqApi/app/hulaquan')

let baseInfo = module.exports = {};

/**
 * 获取呼啦圈用户信息
 */
baseInfo.getHlqUserInfo = async function () {
    const res = await hulaquanApp.getUserInfo({
        data: {
            p: {
                userID: LOGINDATA.userId,
            },
            m: ""
        },
        ticket: TICKET
    })
    HLQ_USERINFO = res.result.datas.obj

};