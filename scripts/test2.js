// const {
//     resolveContent
// } = require("nodemailer/lib/shared");
// const isEqual = require('lodash.isequal');
// // console.log(_.concat([1], [3, 4]));
// console.log(_.last([1, 2, 3]));


let obj = {
    a: 1,
    b: 2
}
obj.c = 3
console.log(obj);

// const buf1 = Buffer.alloc(10);
// console.log('手动创建buffer', buf1);
// console.log(buf1.toJSON());

// buf1.write("Buffer really rocks!");
// console.log('buf1', buf1.toString());

// const buf2 = Buffer.from('hello buffer');
// console.log('往buffer填充字符', buf2);

// const a = new Date().getTime()
// console.log(a);

// expect(undefine).to.be.undefined;

// function add(x, y) {
//     return x + y
// }

// module.exports = add;

// var p1 = Promise.resolve(3);
// var p2 = 1337;
// var p3 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 100, 'foo');
// });

// Promise.all([p1, p2, p3]).then(values => {
//     console.log(values);
// });

// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done');
//         setTimeout(reject, ms, 'undefined');
//     });
// }

// timeout(100).then((value) => {
//     console.log(value);
// });