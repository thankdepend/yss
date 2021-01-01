'use strict';
const fs = require('fs');
const path = require('path');

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

// let caps;

// if (envName == 'online') {
//     caps = {
//         audit: 'http://audit.artstudent.cn',
//         user: 'http://user.artstudent.cn',
//         prob: 'http://prob.artstudent.cn',
//         base: 'http://base.artstudent.cn',
//         pool: 'http://pool.artstudent.cn',
//         college: 'http://college.artstudent.cn',
//         school: 'http://school.artstudent.cn',
//         stu: 'http://stu.artstudent.cn',
//         guide: 'http://guide.artstudent.cn',
//         notice: 'http://notice.artstudent.cn',
//         fillCenter: 'http://fillCenter.artstudent.cn',
//         fileCenter: 'http://fileCenter.artstudent.cn',
//         fillCenterOnline: 'https://filecenter.artstudent.cn',
//         pay: 'http://pay.artstudent.cn',
//         index: 'http://index.artstudent.cn',
//         hulaquan: 'http://hulaquan.artstudent.cn',
//         info: 'http://info.artstudent.cn',
//         public: 'http://public.artstudent.cn',
//         wish: 'http://wish.artstudent.cn',
//         crm: 'http://crm.artstudent.cn',
//         xyk: 'http://xyk.artstudent.cn',
//         print: 'http://print.artstudent.cn',
//         eval: 'eval.artstudent.cn',
//         advert: 'http://advert.artstudent.cn',
//         examvideo: 'http://examvideo.artstudent.cn',
//         sys: 'http://sys.artstudent.cn',
//         examlog: 'http://examlog.artstudent.cn',

//         name: 'online',
//     }
// } else {
//     caps = {
//         url: 'http://192.168.18.202:18000',
//         login_url: 'http://192.168.18.202:10100',
//         upload_url: '192.168.18.202:23000',
//         audit: 'http://audit.51bm.net.cn',
//         user: 'http://user.51bm.net.cn',
//         prob: 'http://prob.51bm.net.cn',
//         base: 'http://base.51bm.net.cn',
//         pool: 'http://pool.51bm.net.cn',
//         college: 'http://college.51bm.net.cn',
//         school: 'http://school.51bm.net.cn',
//         stu: 'http://stu.51bm.net.cn',
//         guide: 'http://guide.51bm.net.cn',
//         notice: 'http://notice.51bm.net.cn',
//         fillCenter: 'http://fillCenter.51bm.net.cn',
//         fileCenter: 'http://fileCenter.51bm.net.cn',
//         fillCenterOnline: 'https://filecenter.artstudent.cn',
//         pay: 'http://pay.51bm.net.cn',
//         index: 'http://index.51bm.net.cn',
//         hulaquan: 'http://hulaquan.51bm.net.cn',
//         info: 'http://info.51bm.net.cn',
//         public: 'http://public.51bm.net.cn',
//         wish: 'http://wish.51bm.net.cn',
//         crm: 'http://crm.51bm.net.cn',
//         xyk: 'http://xyk.51bm.net.cn',
//         print: 'http://print.51bm.net.cn',
//         eval: 'eval.51bm.net.cn',
//         advert: 'http://advert.51bm.net.cn',
//         examvideo: 'http://examvideo.51bm.net.cn',
//         sys: 'http://sys.51bm.net.cn',
//         examlog: 'http://examlog.51bm.net.cn',

//         name: 'test',
//     };
// }

// 开发环境： http://192.168.18.200  测试环境： http://192.168.18.202   演示环境、线上环境：域名


let caps = {
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

if (envName == 'test') {
    caps = {
        analysis: 'http://192.168.18.202:7000',
        index: 'http://192.168.18.202:10000',
        user: 'http://192.168.18.202:10100',
        base: 'http://192.168.18.202:10200',
        aftexam: 'http://192.168.18.202:10400',
        pay: 'http://192.168.18.202:10500',
        news: 'http://192.168.18.202:10600',
        filecenter: 'http://192.168.18.202:10700',
        notice: 'http://192.168.18.202:10800',
        monitor: 'http://192.168.18.202:10900',
        sys: 'http://192.168.18.202:11000',
        hulaquan: 'http://192.168.18.202:12000',
        report: 'http://192.168.18.202:13000',
        advert: 'http://192.168.18.202:15000',
        xyk: 'http://192.168.18.202:16000',
        wish: 'http://192.168.18.202:17000',
        prob: 'http://192.168.18.202:18000',
        member: 'http://192.168.18.202:20200',
        public: 'http://192.168.18.202:20300',
        info: 'http://192.168.18.202:20400',
        pool: 'http://192.168.18.202:20500',
        stu: 'http://192.168.18.202:20600',
        print: 'http://192.168.18.202:20700',
        school: 'http://192.168.18.202:20800',
        menu: 'http://192.168.18.202:20900',
        guide: 'http://192.168.18.202:22000',
        audit: 'http://192.168.18.202:23000',
        examvideo: 'http://192.168.18.202:24000',
        course: 'http://192.168.18.202:25000',
        live: 'http://192.168.18.202:26000',
        eval: 'http://192.168.18.202:27000',
        examlog: 'http://192.168.18.202:28000',
        crm: 'http://192.168.18.202:40000',
    }
}

const envCaps = {
    test: {
        url: 'http://192.168.18.202:18000',
    },
    pre: {
        url: 'http://192.168.18.202:18000',
    },
    dev: {
        url: 'http://192.168.18.200:18000',
    },
    online: {
        url: 'http://192.168.18.202:18000',
    }
};


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

caps.mysql = {
    test: {
        host: '192.168.18.203',
        userName: 'root',
        password: 'testtest',
        port: 3307,
    }
}

module.exports = caps;