'use strict';
const Base = require('mocha/lib/reporters/base');
const uuid = require('uuid');
const marge = require('mochawesome-report-generator');
const conf = require('mochawesome/src/config');
const utils = require('mochawesome/src/utils');

const { log, mapSuites } = utils;

// 已注册用例
const totalTestsRegistered = { total: 0 };

function consoleReporter(reporter) {
    if (reporter) {
        try {
            return require(`mocha/lib/reporters/${reporter}`);
        } catch (e) {
            log(`Unknown console reporter '${reporter}', defaulting to spec`);
        }
    }
    return require('mocha/lib/reporters/spec');
}

/**
 * 初始化html报告
 * @description 使用mochawesome
 * @param {Runner} runner
 */
class Report {
    constructor(runner, options) {
        let passes = 0, failures = 0, pending = 0;

        this.config = conf(options);

        // 报告参数
        this._eporterOptions = Object.assign({}, options.reporterOptions || {}, {
            reportFilename: this.config.reportFilename,
            saveHtml: this.config.saveHtml,
            saveJson: this.config.saveJson
        });

        // 重置注册的用例数
        totalTestsRegistered.total = 0;

        // 命令行使用spec报告输出
        Base.call(this, runner);

        const reporterName = this._eporterOptions.consoleReporter;
        if (reporterName !== 'none') {
            const ConsoleReporter = consoleReporter(reporterName);
            new ConsoleReporter(runner); // eslint-disable-line
        }

        let endCalled = false;

        // runner.on('start', async function () {

        // });

        // 执行钩子和用例将要执行前
        runner.on('suite', function (suite) {
            suite.uuid = uuid.v4();
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
            BASICDATA.url = '';
            BASICDATA.cliReqId = '';
        });
        // runner.on('test end', function (test) {

        // });
        runner.on('pass', function (test) {
            passes++;
        });
        runner.on('fail', function (test, err) {
            failures++;
            const errorMsg = `${test.titlePath().join('-')}\nurl:${BASICDATA.url}\ncliReqId:${BASICDATA.cliReqId}\nError: ${err.message}`;
            console.log(errorMsg);
        });
        runner.on('pending', function (test) {
            pending++;
            test.uuid = uuid.v4();
        });
        // 失败但即将重试时,只有重试非0时才会触发
        // runner.on('retry', function (test, err) {

        // });
        runner.on('end', () => {
            try {
                if (!endCalled) {
                    endCalled = true;

                    const rootSuite = mapSuites(this.runner.suite, totalTestsRegistered, this.config);

                    const obj = {
                        stats: this.stats,
                        results: [rootSuite],
                        meta: {
                            mocha: {
                                version: '5.2.0'
                            },
                            mochawesome: {
                                options: this.config,
                                version: '4.2.0'
                            },
                            marge: {
                                options: options.reporterOptions,
                                version: '1.0.0'
                            }
                        }
                    };

                    obj.stats.testsRegistered = totalTestsRegistered.total;

                    const _obj$stats = obj.stats,
                        tests = _obj$stats.tests,
                        testsRegistered = _obj$stats.testsRegistered;

                    const passPercentage = Math.round(passes / (testsRegistered - pending) * 1000) / 10;
                    const pendingPercentage = Math.round(pending / testsRegistered * 1000) / 10;

                    obj.stats.passes = passes;
                    obj.stats.passPercent = passPercentage;
                    obj.stats.pendingPercent = pendingPercentage;
                    obj.stats.other = passes + failures + pending - tests;
                    obj.stats.hasOther = obj.stats.other > 0;
                    obj.stats.skipped = testsRegistered - tests;
                    obj.stats.hasSkipped = obj.stats.skipped > 0;
                    obj.stats.failures = failures;

                    // 保存至done
                    this.output = obj;

                }
            } catch (e) {
                log('Problem with mochawesome: ' + e.stack, 'error');
            };
        });
    }

    /**
     * 替换mocha的done
     * @param {Object} output
     * @param {Object} options   report-generator参数
     * @param {Object} config
     * @param {Function} exit
     * @return {Promise}
     */
    done(failures, exit) {
        return marge.create(this.output, this._reporterOptions).then(function (_ref) {
            const [htmlFile, jsonFile] = _ref;
            if (!htmlFile && !jsonFile) {
                log('No files were generated', 'warn', this.config);
            } else {
                jsonFile && log('Report JSON saved to ' + jsonFile, null, this.config);
                htmlFile && log('Report HTML saved to ' + htmlFile, null, this.config);
            }
        }).catch((err) => {
            log(err, 'error', this.config);
        }).then(() => this.doneFin({ output: this.output, exit }));
    }

    doneFin(params) {
        //
    }
}

module.exports = Report;