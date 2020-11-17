'use strict';
const fs = require('fs');
const path = require('path');

let caps = {
    url: 'http://192.168.18.202:18000',
    login_url: 'http://192.168.18.202:10100',
    upload_url: '192.168.18.202:23000',
    audit: 'http://audit.51bm.net.cn',
    user: 'http://user.51bm.net.cn',
    prob: 'http://prob.51bm.net.cn',
    base: 'http://base.51bm.net.cn',
    pool: 'http://pool.51bm.net.cn',
    college: 'http://college.51bm.net.cn',
    school: 'http://school.51bm.net.cn',
    stu: 'http://stu.51bm.net.cn',
    guide: 'http://guide.51bm.net.cn',
    notice: 'http://notice.51bm.net.cn',
    fillCenter: 'http://fillCenter.51bm.net.cn',
    fileCenter: 'http://fileCenter.51bm.net.cn',
    fillCenterOnline: 'https://filecenter.artstudent.cn',
    pay: 'http://pay.51bm.net.cn',
    index: 'http://index.51bm.net.cn',
    hulaquan: 'http://hulaquan.51bm.net.cn',
    info: 'http://info.51bm.net.cn',
    public: 'http://public.51bm.net.cn',
    wish: 'http://wish.51bm.net.cn',
    crm: 'http://crm.51bm.net.cn',
    xyk: 'http://xyk.51bm.net.cn',
    print: 'http://print.51bm.net.cn',
    eval: 'eval.51bm.net.cn',
    advert: 'http://advert.51bm.net.cn',
    examvideo: 'http://examvideo.51bm.net.cn',
    sys: 'http://sys.51bm.net.cn',
    examlog: 'http://examlog.51bm.net.cn',

    name: 'test',
};
// console.log(`testTaskId=${caps.testTaskId}`);

const envCaps = {
    test: {
        url: 'http://192.168.18.202:18000',
    },
    pre: {
        url: 'http://192.168.18.202:18000',
    }
};

const argv = require('yargs')
    .option('env', {
        alias: 'envName',
        // default: 'slh2_test',
        describe: '运行环境',
        type: 'string'
    })
    .help('h')
    .alias('h', 'help')
    .usage('Usage: mocha xxx.js [options]')
    .example('mocha test --env=test', 'adev3环境下运行test目录下所有用例')
    .argv;
// console.log(`argv = ${JSON.stringify(argv)}`);

const envName = argv.env;
// caps.name = envName;
if (envName) {
    if (envCaps[envName]) {
        // Object.assign(caps, envCaps[envName]);
        caps.name = envName;
    } else {
        console.error(`环境名称'${envName}'错误,请确认\n可使用环境:${Object.keys(envCaps)}`);
        process.exit();
    };
};


if (argv.myCaps) {
    caps = JSON.parse(fs.readFileSync(path.join(__dirname, './myCaps.json')));
};


/**
 * 更新当前环境配置
 * @description 切换环境时使用
 * @param {object} params
 * @param {string} params.name 环境名称
 */
caps.updateEnvByName = params => {
    if (!envCaps[params.name]) {
        throw new Error(`更新环境失败,环境名称'${envName}'错误,请确认\n可使用环境:${Object.keys(envCaps)}`);
    };
    Object.assign(caps, envCaps[params.name]);
    caps.name = params.name;
};

caps.email = {
    service: 'smtp.163.com',
    user: 'thank_depend@163.com',
    password: 'OAFEESVMKDCDSGEX',
    // service: 'smtp.qq.com',
    // user: '1204825668@qq.com',
    // password: 'dpvxbrwcsaxoiggh',
};

module.exports = caps;