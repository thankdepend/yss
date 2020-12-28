const { common } = require('../../../lib/index');
const hulaquanApp = require('../../../reqApi/app/hulaquan')
const crm = require('../../../reqApi/platfrom/crm');

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

/**
 * 获取crm登录ticket
 */
baseInfo.getCrmTicket = async function (params) {
    // 不设默认值
    const res = await crm.getUserCanLogin(params)
    // CRM_TICKET = res.result.ticket;
    return res.result.datas.canLogin;
};