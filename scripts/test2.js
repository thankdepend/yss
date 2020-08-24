// const name = require('../../data/caps').name;

const {
    reject
} = require("lodash");
const {
    resolveContent
} = require("nodemailer/lib/shared");

// const account = {
//     yss_test: {
//         prob_user1: {
//             loginName: '330325',
//             passWord: 'Csk001',
//             device: 'm'
//         },
//         prob_user2: {
//             loginName: '330340',
//             passWord: 'Csk001',
//             device: 'm'
//         }
//     },
// }

// module.exports = account[name];

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

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
        setTimeout(reject, ms, 'undefined');
    });
}

timeout(100).then((value) => {
    console.log(value);
});