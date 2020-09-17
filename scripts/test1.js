// console.log('hello ',process.argv[4]);

// let yargs = require('yargs')
// .alias('n','name')
// // .boolean('n')
// // .boolean('env')
// // console.log('hello ',argv.env);
// // console.log('hi ',argv.name);
// // console.log('hi ',argv._);
// console.log(yargs.parse());
// // console.log(yargs);
// console.log('hhh',yargs.argv.name);
// console.log('gg',yargs.argv.env);

// const caps = require('../data/caps');

// console.log(caps);

// var fs = require('fs')

// const path = require('path')
// const ps = path.join('../prob/doc/mnls.jpg')
// console.log(ps);
// const a = require('../prob/data/doc.json');
// const b = require('../prob/doc/mnls.jpg');
// console.log(b);
// var fs = require('fs');
//   var data = fs.readFileSync('../prob/doc','utf-8');
// console.log(data);

const {
    common
} = require('../lib/index');
// const doc = require('../prob/data/doc.json');
// let a = doc.pre.peolpe.longUrl[common.getRandomNum(0, doc.pre.peolpe.longUrl.length - 1)]
// console.log(a);
// let a = ['男', '女'][common.getRandomNum(0, ['男', '女'].length - 1)];
// console.log(a);

// const h = {
//     createdOn: 1594349469000,
//     complete: false,
//     createdOnStr: '2020-07-10 10:51:09',
//     modifiedOnStr: '2020-07-20 16:41:34'
// }

// let obj = {}
// let obj = {
//     /** createdOn */
//     this.createdOn = '';
// };
// console.log(Object.keys(h))
// let s = ``
// Object.keys(h).forEach((key) => {
//     s += `/** ${key} */ \n this.${key}=''; \n`
// })
// eval(s)
// console.log(s);

// const yssLogin = require('../prob/help/yssLogin');

// const add = require('./test2');
// const common = require('../lib/common');

// it('测试1', function () {
//     function add(x, y) {
//         console.log('add函数计算', x + y);
//         return x + y
//     };
//     const a = add(1, 2);
//     console.log('返回值', a);
// });

// it('测试2', function () {
//     console.log('打印返回值', add(1, 2));
// });

// const res = common.getCurrentTimeAfter(0.5)
// console.log(res);

// const arr = [1197792, 1197775, 1197777, 1197790]
// anchorID = arr[common.getRandomNum(0, arr.length - 1)];
// console.log(anchorID);


// word.replace(/^\s*|\s*$/g, '');
// const a = common.getCurrentBefore(24);
// console.log(a);

// console.profile('MyLabel');
// console.time("strat")
// const bf = Buffer.alloc(10);
// console.log(bf);
// const bf2 = Buffer.allocUnsafe(10)
// console.log(bf2);
// const bf3 = Buffer.from([1, 2, 3]);
// console.log(bf3);
// const bf4 = Buffer.from([257, 257.5, -255, '1']);
// console.log(bf4);
// const bf5 = Buffer.from('test')
// console.log(bf5);
// const bf6 = Buffer.from('hello world', 'utf8')
// console.log(bf6.toString('hex'));
// console.timeEnd('strat')
// console.profileEnd('MyLabel');


const fs = require('fs');
const path = require('path');
const {
    error
} = require('console');
console.log(__dirname);
console.log((`${__dirname}\\test2.js`));
fs.open(path.join(__dirname, 'art.jpg'), 'r', (err, fd) => {
    if (err) throw new Error(err);
    console.log('读取成功');
    console.log(fd);
    let buffer = Buffer.from('hello', 'utf8')
    fs.writeFile(fd, buffer, (err, bytesWritten, buffer) => {
        if (err) {
            throw err;
        }

        console.log('写入成功.');
        // 打印出buffer中存入的数据
        console.log(bytesWritten, buffer.slice(0, bytesWritten).toString());

        // 关闭文件
        fs.close(fd);
    })
    // fs.Stats(fd, function (err, stats) {
    //     if (err) {
    //         throw new Error(err)
    //     }
    //     console.log(stats);
    //     fs.close(fd, function () {
    //         console.log('close');
    //     })
    // })
    // fs.close()
})