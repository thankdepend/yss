/**
 * 废话不多说，我们开始测试一个加法函数
 */

const { expect } = require('chai');

function add (a, b) {
    return Number(a + b);
}

function add2 (a, b) {
    return a + b;
}

// const num = add(1, 2)
// console.log(num);

describe('加法测试', () => {
    it('测试计算值', () => {
        const num = add(3, 4)
        // 期望、实际
        expect(add2(3, 4)).to.be.equal(num)
    });
});

// // 这是一台自动贩卖机
// function vendingMachine (type) {
//     if (type == 'kola') {
//         return 'kola'
//     } else if (type == 'sprite') {
//         return 'sprite'
//     } else {
//         return '未知物品'
//     }
// }

// describe('自动贩卖机', () => {
//     // kola、sprite、fanta
//     it('出货测试', () => {
//         let type = 'fanta'
//         const res = vendingMachine(type)
//         expect(type).to.be.equal(res)
//     });
// });