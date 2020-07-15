'use strict';
const caps = require('../data/caps');
const common = require('../lib/common');
const mail = require('../lib/mail');
const moment = require('moment');
// const ssReq = require('../ss/help/ssReq');
// const payRequestMock = require('../ecoolPlant/provide/payRequestMock');

// const dingtalkRobot = require('../lib/dingtalkRobot');
// 微商城服务监控群
// const dingtalkAccessToken = 'e7fa21089cfbb092dd68c505f8728db6c5d9be6cbf072ff7c71231574bcd17cc';

const Mochawesome = require('./mochawesome');

class HtmlReport extends Mochawesome {
    constructor(runner, options) {
        super(runner, options);

        /** 环境名称 */
        this.envName = {
            'app1': '审核',
            'abz1': '线上',
        }[caps.name];
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

    doneFin({ output, exit }) {
        // console.log(output);
        // 删除缓存中的白名单数据
        // ssReq.delWhiteByCache();

        const stats = output.stats;
        /** 邮件主题 */
        const subject = `【商陆花一代${common.getCurrentDate()}${this.envName}环境】自动化测试报告`;
        /** 收件人 */
        // const addressee = ['叶建兵<yejianbing1303@dingtalk.com>'];
        const addressee = ['欧工<qq272963@dingtalk.com>', '薛锋<hzlaxf@dingtalk.com>', '舒琼<toshuqiong@dingtalk.com>',
            '汪凯阳<wangkaiyang@hzecool.com>', '付琛<fuchen4313@dingtalk.com>',
            '陆星欣<luxxhz@dingtalk.com>', '叶建兵<yejianbing1303@dingtalk.com>'];

        let reportPath;
        switch (this.envName) {
            case '审核':
                reportPath = 'auto_slh1_app1';
                break;
            default:
                break;
        }
        Promise.all([mail.sendMail(addressee.join(','), { subject: subject, html: `<table border=0 cellspacing=10><tr><th>总用例数</th><th>通过</th><th>失败</th></tr><tr><td>${stats.passes + stats.failures}</td><td>${stats.passes}</td><td>${stats.failures}</td></tr></table><a href="http://192.168.0.23:8081/jenkins/job/autotest/job/${reportPath}/result">日志链接</a>` })]);
        console.log(`\n测试结束 ${moment().format('YYYY-MM-DD HH:mm:ss:SSS')} \n   total=${stats.passes + stats.failures}, passes=${stats.passes}, failures=${stats.failures}, warns=${0}`);
        console.log(`执行完成`);
        exit && exit(0);
    }

}

module.exports = HtmlReport;
