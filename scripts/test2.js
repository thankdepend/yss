// const name = require('../../data/caps').name;

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

function add(x, y) {
    return x + y
}

module.exports = add;