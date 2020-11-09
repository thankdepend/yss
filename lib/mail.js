const nodemailer = require('nodemailer');
const config = require('../data/caps');
const {
    common
} = require('./index');

const transport = nodemailer.createTransport({
    service: config.email.service,
    host: '192.168.18.202',
    secureConnection: true,
    port: 8888,
    auth: {
        // type: 'OAuth2',
        user: config.email.user,
        pass: config.email.pass,
    }
});

/**
 * 发送邮件
 * @param {String} recipient 收件人列表 逗号分隔
 * @param {object} msgs 
 */
const sendMail = async function (recipient, msgs) {
    return transport.sendMail({
        from: `"自动化用例报告" <${config.email.user}><${common.getCurrentDate}>`,
        to: recipient,
        subject: msgs.subject || '',
        text: msgs.text || '',
        html: msgs.html || ''
    }, function (error, response) {
        if (error) {
            console.log("邮件发送失败: " + error);
        } else {
            console.log('邮件发送完成: %j', response);
        }
    });
}

module.exports = {
    sendMail
};