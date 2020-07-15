'use strict';
const caps = require('../data/caps');
const common = require('../lib/common');
const mail = require('../lib/mail');

const _assign = require('babel-runtime/core-js/object/assign');
const _assign2 = _interopRequireDefault(_assign);
const _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');
const _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Base = require('mocha/lib/reporters/base');
const Spec = require('mocha/lib/reporters/spec');
const uuid = require('uuid');
const marge = require('mochawesome-report-generator');
const conf = require('mochawesome/dist/config');
const utils = require('mochawesome/dist/utils');

const log = utils.log,
    getPercentClass = utils.getPercentClass,
    mapSuites = utils.mapSuites;

// 已注册用例
const totalTestsRegistered = { total: 0 };

/**
 * 替换mocha的done
 * @param {Object} output   
 * @param {Object} options   report-generator参数
 * @param {Object} config    
 * @param {Function} exit
 * @return {Promise} 
 */
function done({ output, options, config, exit }) {
    return marge.create(output, options).then(function (_ref) {
        const _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            htmlFile = _ref2[0],
            jsonFile = _ref2[1];

        if (!htmlFile && !jsonFile) {
            log('No files were generated', 'warn', config);
        } else {
            jsonFile && log('Report JSON saved to ' + jsonFile, null, config);
            htmlFile && log('Report HTML saved to ' + htmlFile, null, config);
        }
    }).catch(function (err) {
        log(err, 'error', config);
    }).then(function () {
        // console.log(output);
        const stats = output.stats;
        /** 邮件主题 */
        const subject = `【笑铺日记${common.getCurrentDate()}${envName}环境】自动化用例报告】`;
        /** 收件人 */
        // const addressee = ['陆星欣<luxxhz@dingtalk.com>'];
        const addressee = [/*'易俊杰<eric2671@dingtalk.com>', '邱相师<qiuxiangshi@dingtalk.com>', '李正磊<lizhenglei5100@dingtalk.com>',*/'谢星<uoz1890@dingtalk.com>'];
        /** 内容 */
        const text = `要么忙着生存要么赶着去死，人总要做点什么。 ---肖申克的救赎`;

        Promise.all([mail.sendMail(addressee.join(','), { subject: subject, text: text, html: `<table border=0 cellspacing=10><tr><th>总用例数</th><th>通过</th><th>失败</th></tr><tr><td>${stats.passes + stats.failures}</td><td>${stats.passes}</td><td>${stats.failures}</td></tr></table><a href="http://192.168.0.23:8081/jenkins/job/autotest/job/auto_shopDiary/result">日志链接</a>` })]);
        console.log(`\n测试结束 ${moment().format('YYYY-MM-DD HH:mm:ss:SSS')} \n   total=${stats.passes + stats.failures}, passes=${stats.passes}, failures=${stats.failures}, warns=${0}`);
        console.log(`执行完成`);
        exit && exit(0);
    });
}

/**
 * 初始化html报告
 * @description 使用mochawesome
 * @param {Runner} runner
 */
function HtmlReport(runner, options) {
    const envName = {
        'cs3d2': '测试',
        'cs3d1': '审核',
        'sd_online': '线上',
    }[caps.name];
    if (!envName) throw new Error(`环境变量'${caps.name}'错误,请检查`);
    const isOnline = envName == '线上';

    const _this = this;
    this.config = conf(options);

    // 报告参数 
    const reporterOptions = (0, _assign2.default)({}, options.reporterOptions || {}, {
        reportFilename: this.config.reportFilename,
        saveHtml: this.config.saveHtml,
        saveJson: this.config.saveJson
    });

    this.done = function (failures, exit) {
        return done({ output: _this.output, options: reporterOptions, config: _this.config, exit });
    };

    // 重置注册的用例数
    totalTestsRegistered.total = 0;

    Base.call(this, runner);

    // 命令行使用spec报告输出
    new Spec(runner);

    let endCalled = false;

    // 执行钩子和用例将要执行前
    runner.on('suite', function (suite) {
        if (isOnline && suite.title.includes('offline')) {
            suite.pending = true;
        }
    });
    // runner.on('suite end', function (suite) {

    // });
    runner.on('hook', function (hook) {
        hook.uuid = uuid.v4();
    });
    // runner.on('hook end', function (hook) {

    // });
    runner.on('test', function (test) {
        test.uuid = uuid.v4();
        if (isOnline && test.title.includes('offline')) {
            test.pending = true;
        }
    });
    // runner.on('test end', function (test) {

    // });
    runner.on('pass', function (test) {
        // passNum++;
    });
    runner.on('fail', function (test, err) {
        // failNum++;
        const errorMsg = `${test.titlePath().join('-')}\nError: ${err.message}`;
        console.log(errorMsg);
    });
    runner.on('pending', function (test) {
        test.uuid = uuid.v4();
    });
    // 失败但即将重试时,只有重试非0时才会触发
    // runner.on('retry', function (test, err) {

    // });
    runner.on('end', function () {
        try {
            if (!endCalled) {
                endCalled = true;

                const allSuites = mapSuites(_this.runner.suite, totalTestsRegistered, _this.config);

                const obj = {
                    stats: _this.stats,
                    suites: allSuites,
                    copyrightYear: new Date().getFullYear()
                };

                obj.stats.testsRegistered = totalTestsRegistered.total;

                const _obj$stats = obj.stats,
                    passes = _obj$stats.passes,
                    failures = _obj$stats.failures,
                    pending = _obj$stats.pending,
                    tests = _obj$stats.tests,
                    testsRegistered = _obj$stats.testsRegistered;

                const passPercentage = Math.round(passes / (testsRegistered - pending) * 1000) / 10;
                const pendingPercentage = Math.round(pending / testsRegistered * 1000) / 10;

                obj.stats.envName = envName;
                obj.stats.passes = passes;
                obj.stats.passPercent = passPercentage;
                obj.stats.pendingPercent = pendingPercentage;
                obj.stats.other = passes + failures + pending - tests;
                obj.stats.hasOther = obj.stats.other > 0;
                obj.stats.skipped = testsRegistered - tests;
                obj.stats.hasSkipped = obj.stats.skipped > 0;
                obj.stats.failures -= obj.stats.other;
                obj.stats.passPercentClass = getPercentClass(passPercentage);
                obj.stats.pendingPercentClass = getPercentClass(pendingPercentage);

                // 保存至done
                _this.output = obj;

            }
        } catch (e) {
            log('Problem with mochawesome: ' + e.stack, 'error');
        }
    });

}

module.exports = HtmlReport;