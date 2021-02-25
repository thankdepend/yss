// const { common } = require('../../lib/index');
// let num = common.getRandomNum(1, 4);
// console.log(num);
// switch (num) {
//     case 1:
//         console.log('蜜獾');
//         break;
//     case 2:
//         console.log('海贝');
//         break;
//     case 3:
//         console.log('海豚');
//         break;
//     case 4:
//         console.log('河蟹');
//         break;
//     default:
//         break;
// }

const { expect } = require("chai")

// day1海豚 day2蜜獾 day3河蟹 day4海贝
// 增加一句废话
let obj = {
    aaa: 123,
    bb: 456
}
// delete obj.bb
console.log(obj);
// if (expect(obj.aaa).to.be.ok) {
//     console.log('success');
// }
