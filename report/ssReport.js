'use strict';
const caps = require('../data/caps');
const common = require('../lib/common');
const mail = require('../lib/mail');
const moment = require('moment');
const ssReq = require('../ss/help/ssReq');
const payRequestMock = require('../ecoolPlant/provide/payRequestMock');

const dingtalkRobot = require('../lib/dingtalkRobot');
// 微商城服务监控群
const dingtalkAccessToken = 'e7fa21089cfbb092dd68c505f8728db6c5d9be6cbf072ff7c71231574bcd17cc';

const Mochawesome = require('./mochawesome');

class HtmlReport extends Mochawesome {
    constructor(runner, options) {
        super(runner, options);

        /** 环境名称 */
        this.envName = {
            'ss_test': '测试1',
            'ss_test2': '测试2',
            'ss_chk': '审核',
            'ss_pre': '预发',
            'ss_online': '线上',
        }[caps.name];
        if (!this.envName) throw new Error(`环境变量'${caps.name}'错误,请检查`);
        const isOnline = this.envName == '线上';

        let payMockFlag;

        runner.on('start', async () => {
            if (!isOnline) payMockFlag = await payRequestMock.selectAndUpdatePayRequestMockFlag();
        });

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

        runner.on('end', () => {
            if (!isOnline && Number(payMockFlag) != 1) payRequestMock.updatePayRequestMockFlag(payMockFlag);
        });

    }

    doneFin({ output, exit }) {
        // console.log(output);
        // 删除缓存中的白名单数据
        ssReq.delWhiteByCache();

        const stats = output.stats;
        /** 邮件主题 */
        const subject = `【微商城${common.getCurrentDate()}${this.envName}环境】自动化用例报告`;
        /** 收件人 */
        const addressee = this.envName != '线上1' ? ['陆星欣<luxxhz@dingtalk.com>', '罗琦<jpw7169@dingtalk.com>', '叶建兵<yejianbing1303@dingtalk.com>', '徐谢靠<xuxiekao@dingtalk.com>', '杨萃苹<ptk7315@dingtalk.com>'] :
            ['欧工<qq272963@dingtalk.com>', '茅智俊<mzjsoul@dingtalk.com>', '陆星欣<luxxhz@dingtalk.com>', '罗琦<jpw7169@dingtalk.com>', '叶建兵<yejianbing1303@dingtalk.com>', '徐谢靠<xuxiekao@dingtalk.com>', '杨萃苹<ptk7315@dingtalk.com>'];

        const reportPath = this.envName == '测试1' ? '微商城测试环境' : `微商城${this.envName}测试`;
        Promise.all([mail.sendMail(addressee.join(','), { subject: subject, html: `<table border=0 cellspacing=10><tr><th>总用例数</th><th>通过</th><th>失败</th></tr><tr><td>${stats.passes + stats.failures}</td><td>${stats.passes}</td><td>${stats.failures}</td></tr></table><a href="http://192.168.0.23:8081/jenkins/job/autotest/job/${reportPath}/result">日志链接</a>` }),
        dingtalkRobot.sendMsg(dingtalkAccessToken, {
            msgtype: 'text',
            text: { content: `微商城${this.envName}环境执行完毕,用例数:${stats.passes + stats.failures},通过数:${stats.passes},失败数:${stats.failures}\n日志链接:http://192.168.0.23:8081/jenkins/job/autotest/job/${reportPath}/result` },
            at: { isAtAll: false },
        })]);
        console.log(`\n测试结束 ${moment().format('YYYY-MM-DD HH:mm:ss:SSS')} \n   total=${stats.passes + stats.failures}, passes=${stats.passes}, failures=${stats.failures}, warns=${0}`);
        console.log(`执行完成`);
        exit && exit(0);
    }

}

module.exports = HtmlReport;