'use strict';
const caps = require('../data/caps');
const common = require('../lib/common');
const mail = require('../lib/mail');
const moment = require('moment');

// const dingtalkRobot = require('../lib/dingtalkRobot');

const Mochawesome = require('./mochawesome');

class HtmlReport extends Mochawesome {
    constructor(runner, options) {
        super(runner, options);

        /** 环境名称 */
        this.envName = {
            'test': '测试',
        } [caps.name];
        if (!this.envName) throw new Error(`环境变量'${caps.name}'错误,请检查`);
        const isOnline = this.envName == '线上';

        runner.on('suite', function (suite) {
            if (isOnline && suite.title.includes('offline')) {
                suite.pending = true;
            }
        });

        runner.on('test', function (test) {
            if (isOnline && test.title.includes('offline')) {
                test.pending = true;
            }
        });
    }

    doneFin({
        output,
        exit
    }) {
        const stats = output.stats;
        /** 邮件主题 */
        const subject = `【艺术升app${common.getCurrentDate()}${this.envName}环境】自动化用例报告`;
        /** 收件人 */
        const addressee = ['徐谢靠<xuxiekao@dingtalk.com>'];

        let reportPath;
        switch (this.envName) {
            case '测试':
                reportPath = 'auto_yys';
                break;
            default:
                break;
        }
        // Promise.all([mail.sendMail(addressee.join(','), { subject: subject, html: `<table border=0 cellspacing=10><tr><th>总用例数</th><th>通过</th><th>失败</th></tr><tr><td>${stats.passes + stats.failures}</td><td>${stats.passes}</td><td>${stats.failures}</td></tr></table><a href="http://192.168.0.23:8081/jenkins/job/autotest/job/${reportPath}/result">日志链接</a>` })]);
        console.log(`\n测试结束 ${moment().format('YYYY-MM-DD HH:mm:ss:SSS')} \n   total=${stats.passes + stats.failures}, passes=${stats.passes}, failures=${stats.failures}, warns=${0}`);
        console.log(`执行完成`);
        exit && exit(0);
    }

}

module.exports = HtmlReport;