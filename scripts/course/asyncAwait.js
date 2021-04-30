/**
 * 异步好处：没有回调
 * 
 * and 在接口测试时，接口有时候不会立即响应，若下文依赖需要本次接口的数据，
 * 在同步情况下有可能接口没有返回值，下文就去取值，导致取到是空数据
 * 在这个情况下我们用了异步的手段处理，是一种取巧的做法
 */

it('外部异步1', async function () {
    await console.log(1);
});

describe('异步测试', async function () {
    it('内部异步1', async function () {
        await console.log(2);
    });
    it('内部异步2', async function () {
        await console.log(3);
    });
});
it('外部异步2', async function () {
    await console.log(4);
});




// it('外部同步1', function () {
//     console.log(1);
// });

// describe('同步测试', function () {
//     it('内部同步1', function () {
//         console.log(2);
//     });
//     it('内部同步2', function () {
//         console.log(3);
//     });
// });
// it('外部同步2', () => {
//     console.log(4);
// });

async function delay (ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// describe('测试', async function () {
//     let a;
//     it('延迟', async function () {
//         await delay(1000)
//         console.log('验收之后打印');
//         return a = 1;
//     });
//     it('', async function () {
//         console.log(a + 1);
//         // await console.log(2);
//     });

//     it('', async function () {

//         await console.log(3);
//     });
// });


function sleep (numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}


// describe('同步', function () {
//     // this.timeout(90000)
//     let a;
//     it('', function () {
//         sleep(1000)
//         return a = 1
//     });
//     it('', function () {
//         console.log(a + 1);
//     });

//     it('', function () {
//         console.log(3);
//     });
// });
