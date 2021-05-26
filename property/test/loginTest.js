const { common } = require('../../lib/index');
const ssAccount = require('../../project/data/account');
const caps = require('../../data/caps');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const LogAnalysis = require('../help/logAnalysis');
const yssLogin = require('../../project/help/base/yssLogin')


const logAnalysis = new LogAnalysis();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt(`请输入客户数量，totalNum数量: `);
rl.prompt();

rl.on('line', async function (line) {
    if (line == 'close') {
        rl.close();
    }

    const [userNum, totalNum = 1] = line.trim().split(',').map(ele => Number(ele));
    console.log(`userNum:`, userNum);
    console.log(`totalNum:`, totalNum);

    if (typeof userNum != 'number') {
        return;
    }
    let code = 12800000000;
    // console.log(code);
    logAnalysis.start();
    for (let index = 0; index < totalNum; index++) {
        await common.delay(1000);
        const promises = new Array(userNum).fill({}).map((ele, index) => {
            code++;
            // console.log(code);
            return yssLogin.clientLogin().then((res) => {
                // console.log(res);
                // console.log(`\nres=${JSON.stringify(res)}`);
                logAnalysis.add(res);
                // console.log(`${res.opTime},${res.duration}`);
                const data = res.result;
                console.log(data);
            }).catch(err => {
                logAnalysis.addFail(err);
                console.log(err);
            });
        });

        Promise.all(promises)
            .then(res => {
                console.log(`执行完成`);
                console.log(logAnalysis.getInfo());
                // rl.prompt();
            })
            .catch(err => console.log(err))
        // .finally(console.log(`${ params.userNum }个用户并发登录结束`));
    }
});



rl.on('close', () => {
    console.log(`登录测试完成`);
    console.log(logAnalysis.getInfo());
    process.exit(0);
});
