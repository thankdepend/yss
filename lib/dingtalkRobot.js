const common = require('./common');

const dingtalkRobot = module.exports = {};

dingtalkRobot.sendMsg = async function (accessToken, msg = {}) {
    return common.superagent.post(`https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`)
        .send(msg)
        .then((response) => {
            // console.log(`response=${JSON.stringify(response)}`);
        }).catch((err) => {
            console.warn(`请求失败:\n${JSON.stringify(err)}`);
        })
};
