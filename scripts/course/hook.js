/**
 * 除了describe和it外，有时候我们还需要加一些钩子函数协助测试
 * before:在it之前执行,一个生命周期只执行一次;after:在it之后执行,一个生命周期只执行一次;
 * beforeEach:在每个it之前都执行,一个生命周期会执行多次;afterEach:在每个it之后都执行,一个生命周期会执行多次
 */


// describe('测试套件', () => {
//     let num = 1
//     before(() => {
//         num += 1
//     });
//     it('测试num', () => {
//         console.log('打印一下', num);
//     });
// });

// describe('测试套件2', () => {
//     let num = 1
//     after(() => {
//         num -= 1
//         console.log('执行之后打印', num);
//     });
//     it('测试num2', () => {
//         console.log('测试num2打印', num);
//     });
// });

describe('测试套件', () => {
    let num = 10
    beforeEach(() => {
        num += 1
    });
    it('测试beforeEach1', () => {
        console.log('测试beforeEach1', num);
    });
    it('测试beforeEach2', () => {
        console.log('测试beforeEach2', num);
    });
});

// describe('测试套件', () => {
//     let num = 10
//     afterEach(() => {
//         num -= 1
//         console.log('afterEach', num);
//     });
//     it('测试afterEach1', () => {
//         console.log('测试afterEach1', num);
//     });
//     it('测试afterEach2', () => {
//         console.log('测试afterEach2', num);
//     });
// });


