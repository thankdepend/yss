const { random } = require('lodash');
const { common } = require('../../lib/index');
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

let pointNum = common.getRandomNum(1, 5);
let pointconTent = new Array(pointNum).fill({})

let allPoint = pointconTent.map(() => {
    let obj = {};
    obj.commentStr = common.getPoetry();
    obj.pointX = Math.random().toFixed(3);
    obj.pointY = Math.random().toFixed(3);
    obj.type = 1;
    obj.voiceTime = 0;
    return obj
})
console.log('bbb', allPoint);


a = 10
a = ['a']