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


let bhArr = [3,5,7,1]

let max = bhArr.reduce(function(a , b){
    return b > a ? b : a;
});
console.log(max);

const {common} = require('../lib/index');

console.log(common);

// const a = common.getRandomStr(5)
// console.log(a);

// const monthArr = ['1-2月','3-4月','5-6月','7-8月','9-10月','11-12月']
// const params = {
//     kaoShiYF: `${monthArr[common.getRandomNum(0,monthArr.length-1)]}`
// };
// console.log(params);
// console.log(`${new Date().getFullYear()}`);



