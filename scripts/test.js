// let a  = '{"aa":"ssssss"}';
// let b = JSON.parse(a)
// console.log(b);
// let c = JSON.stringify(b)
// console.log(c);
// const doc = require('../prob/data/doc.json')
// const common = require('../lib/common')
// console.log(doc.test.school[common.getRandomNum(0,doc.test.school.length)]);

// let d = 'loginName=zyzg001&password=Csk001'
// let e = JSON.parse(d)
// console.log(e);

// 校考计算p0 + p1
// const a = -1*((100 - 30)/100)*5.1
// console.log(a + 0.45);


// let bhArr = [3, 5, 7, 1]

// let max = bhArr.reduce(function (a, b) {
//     return b > a ? b : a;
// });
// console.log(max);

// const {
//     common
// } = require('../lib/index');

// console.log(common);

// const a = common.getRandomStr(5)
// console.log(a);

// const monthArr = ['1-2月','3-4月','5-6月','7-8月','9-10月','11-12月']
// const params = {
//     kaoShiYF: `${monthArr[common.getRandomNum(0,monthArr.length-1)]}`
// };
// console.log(params);
// console.log(`${new Date().getFullYear()}`);


// let ddd = "mocha prob/test/videoTest --env=pre --report mocha-allure-reporter -s 500 --recursive --reporter ./lib/myReporter"
// const doc = require('../prob/data/doc.json');
// const account = require('../prob/data/account')
// const caps = require('../data/caps');

// let a = doc[caps.name].school[1]
// console.log(a);
// let b = {
//     '荣耀play3': 'd0:05:e4:6d:80:c7',
//     'iphone6p': '60:F8:1D:43:68:30',
//     'vivoU3x': '6c:d9:4c:3a:b8:15',
//     'vivoZ5': '3c:86:d1:0b:ad:63',
//     '蜜獾自用-iphonex': '1C:36:BB:AE:B2:FB',
//     '猪猪自用1': '44:59:E3:9A:88:2B',
//     '猪猪自用2': '90:F0:52:58:26:47',
// }

// let a = new Map();
// a.set(123, {
//     hh: 1,
//     jj: 2
// })
// a.set(456, {
//     gg: 3,
//     kk: 4
// })
// console.log(a);
// for (let i of a.keys()) {
//     console.log(i);
// }
// console.log(a.keys());
const {
    common
} = require('../lib/index')
const yysLogin = require('../prob/help/yssLogin')
const fs = require('fs');
const yssCaps = require('../data/caps');
var path = require('path');

const upl = module.exports = {}

upl.queryUpload = async function (params = {}) {
    return common.sendPost(yssCaps.fileCenter + '/api/m/auth/file/upload.ws', params);
};

// let url = 'http://filecenter.51bm.net.cn/api/m/auth/file/upload.ws'

describe('测试图片上传', async function () {
    this.timeout(TESTCASE.timeout);
    const readerStream = fs.createWriteStream(path.join(__dirname, 'art.jpg'));
    it('上传', async function () {
        loginAccount = {
            loginName: 'dingding061',
            password: 'Ysk001',
            device: 'm'
        }
        loginInfo = await yysLogin.clientLogin(loginAccount).then(res => res.result.datas.user);
        console.log('登录', loginInfo);
        const res = await upl.queryUpload({
            ticket: TICKET,
            idCard: 'dingding061',
            file: readerStream
        })
        console.log(readerStream);
        console.log(res);

    });
});