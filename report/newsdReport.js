'use strict';
const caps = require('../data/caps');
const common = require('../lib/common');
const mail = require('../lib/mail');
const moment = require('moment');

const Mochawesome = require('./mochawesome');

class HtmlReport extends Mochawesome {
    constructor(runner, options) {
        super(runner, options);

        this.envName = {
            'cs3d2': '测试',
            'cs3d1': '审核',
            'cs3d3': 'd3',
            'sd_online': '线上',
            'sd_cg4': '线上cg4',
            'cs3d5': '合库测试',
        }[caps.name];
        this.siteName = {
            'cs3d2': '_d2',
            'cs3d1': '_d1',
            'cs3d3': '_d3',
            'sd_cg4': '_cg4',
            'cs3d5': '_d5',
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
        const stats = output.stats;
        /** 邮件主题 */
        const subject = `【笑铺日记${common.getCurrentDate()}${this.envName}环境】自动化用例报告`;
        /** 收件人 */
        // const addressee = ['陆星欣<luxxhz@dingtalk.com>', '罗琦<jpw7169@dingtalk.com>'];
        const addressee = ['谢星<uoz1890@dingtalk.com>', '曹亚贞<caoyazhen6371@dingtalk.com>'];
        // , '易俊杰<eric2671@dingtalk.com>', '邱相师<qiuxiangshi@dingtalk.com>', '李正磊<lizhenglei5100@dingtalk.com>'
        /** 内容 */
        const text = `要么忙着生存要么赶着去死，人总要做点什么。 ---肖申克的救赎`;

        Promise.all([mail.sendMail(addressee.join(','), { subject: subject, text: text, html: `<table border=0 cellspacing=10><tr><th>总用例数</th><th>通过</th><th>失败</th></tr><tr><td>${stats.passes + stats.failures}</td><td>${stats.passes}</td><td>${stats.failures}</td></tr></table><a href="http://192.168.0.23:8081/jenkins/job/autotest/job/auto_shopDiary${this.siteName}/result">日志链接</a>` })]);
        console.log(`\n测试结束 ${moment().format('YYYY-MM-DD HH:mm:ss:SSS')} \n   total=${stats.passes + stats.failures}, passes=${stats.passes}, failures=${stats.failures}, warns=${0}`);
        console.log(`执行完成`);
        exit && exit(0);
    }
};

module.exports = HtmlReport;