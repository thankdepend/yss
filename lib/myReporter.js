const caps = require("../data/caps");
const mocha = require("mocha");
const moment = require("moment");
module.exports = myReporter;

function myReporter(runner) {
  mocha.reporters.Base.call(this, runner);

  let passes = 0, //用例通过数
    failures = 0; //用例失败数

  runner.on("start", function () {
    console.log(
      `测试开始${moment().format("YYYY-MM-DD HH:mm:ss:SSS")}, url=${
        caps.url
      }, name=${caps.name || "prob_test"}`
    );
  });

  //测试开始
  runner.on("test", function () {
    TESTCASE = {};
  });

  runner.on("pass", function (test) {
    passes++;
    // console.log(`pass: ${test.fullTitle()}`);
  });

  runner.on("fail", function (test, err) {
    failures++;
    let message = `\n fail: ${failures}.${test.fullTitle()}\n   time: ${moment().format(
      "YYYY-MM-DD HH:mm:ss:SSS"
    )}\n   登录信息: ${JSON.stringify(LOGINDATA)}`;
    if (TESTCASE.describe) message += `\n   describe: ${TESTCASE.describe}`;
    if (TESTCASE.expect) message += `\n   expect: ${TESTCASE.expect}`;
    // message += `\n   actual: ${err.message}`;
    console.log(message);
    console.log(` ${err.stack}`);
  });

  runner.on("end", function () {
    console.log(
      `\n测试结束${moment().format("YYYY-MM-DD HH:mm:ss:SSS")}: total=${
        passes + failures
      }, passes=${passes}, failures=${failures}`
    );
    process.exit(0);
  });
}
