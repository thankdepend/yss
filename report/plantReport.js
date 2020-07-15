'use strict';
const caps = require('../data/caps');
const common = require('../lib/common');
const mail = require('../lib/mail');
const moment = require('moment');
const payRequestMock = require('../ecoolPlant/provide/payRequestMock');

const dingtalkRobot = require('../lib/dingtalkRobot');
// 微商城资产服务监控群
// https://oapi.dingtalk.com/robot/send?access_token=c67fd4f96023760b2a3577e38b5fa8f306a63a55e39fd2b8a171dc9c0f1a3b31
const dingtalkAccessToken = 'c67fd4f96023760b2a3577e38b5fa8f306a63a55e39fd2b8a171dc9c0f1a3b31';

const Mochawesome = require('./mochawesome');

class HtmlReport extends Mochawesome {
    constructor(runner, options) {
        super(runner, options);

        this.envName = {
            'plant_test': '测试',
            'plant_online': '线上',
        }[caps.name];
        if (!this.envName) throw new Error(`环境变量'${caps.name}'错误,请检查`);
        const isOnline = this.envName == '线上';

        let payMockFlag;

        runner.on('start', async function () {
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
        // ssReq.delWhiteByCache();

        const stats = output.stats;
        /** 邮件主题 */
        const subject = `【中台资产${common.getCurrentDate()}${this.envName}环境】自动化用例报告`;
        /** 收件人 */
        const addressee = this.envName != '线上' ? ['陆星欣<luxxhz@dingtalk.com>', '罗琦<jpw7169@dingtalk.com>'] : ['陆星欣<luxxhz@dingtalk.com>', '罗琦<jpw7169@dingtalk.com>', '刘军<gua5415@dingtalk.com>', '高孟忠<gaomengzhong@dingtalk.com>', '王林峰<svj2616@dingtalk.com>'];
        const atMobiles = stats.failures ? [18829897169, 13750850013] : [];
        const reportPath = this.envName == '测试' ? '中台测试' : `中台${this.envName}测试`;
        Promise.all([mail.sendMail(addressee.join(','), { subject: subject, html: `<table border=0 cellspacing=10><tr><th>总用例数</th><th>通过</th><th>失败</th></tr><tr><td>${stats.passes + stats.failures}</td><td>${stats.passes}</td><td>${stats.failures}</td></tr></table><a href="http://192.168.0.23:8081/jenkins/job/autotest/job/${reportPath}/result">日志链接</a>` }),
        dingtalkRobot.sendMsg(dingtalkAccessToken, {
            msgtype: 'text',
            text: { content: `result:中台资产${this.envName}环境执行完毕,用例数:${stats.passes + stats.failures},通过数:${stats.passes},失败数:${stats.failures}\n日志链接:http://192.168.0.23:8081/jenkins/job/autotest/job/${reportPath}/result` },
            at: {
                atMobiles: atMobiles,
                isAtAll: false
            }
        })
        ]);
        console.log(`\n测试结束 ${moment().format('YYYY-MM-DD HH:mm:ss:SSS')} \n   total=${stats.passes + stats.failures}, passes=${stats.passes}, failures=${stats.failures}, warns=${0}`);
        console.log(`执行完成`);
        exit && exit(0);
    }

}

module.exports = HtmlReport;