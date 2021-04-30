/**
 * 有时候会存在多个describe或者多个it，
 * 但是如果我们只想执行一个，或者跳过某个
 * mocha提供2个关键词进行操作
 * only、skip
 */

// describe('我是普通人', () => {
//     it('普通人测试', () => {
//         console.log('打印普通人');
//     });
// });
// describe.only('我是Only那个', () => {
//     it('only测试', () => {
//         console.log('打印only')
//     });
// });

//  ----------------------------

// describe('我是普通人', () => {
//     it('普通人测试', () => {
//         console.log('打印普通人');
//     });
// });
// let i = 1;
// if (i == 2) {
//     describe.skip('我是Only那个', () => {
//         it('only测试', () => {
//             console.log('打印only')
//         });
//     });
// }


//  ----------------------------

// describe('it的only测试', () => {
//     it('普通用例', () => {
//         console.log('打印普通用例')
//     });
//     it.only('only测试用例', () => {
//         console.log('打印only用例')
//     });
// });

//  ----------------------------


describe('it的skip测试', () => {
    it.skip('普通用例', () => {
        console.log('打印skip用例')
    });
    it('普通测试用例', () => {
        console.log('打印普通用例')
    });
});