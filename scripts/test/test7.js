const assert = require('assert');
const {
    Worker, MessageChannel, MessagePort, isMainThread, parentPort
} = require('worker_threads');
const yssLogin = require('../../project/help/base/yssLogin');
// 如果是主线程


async function threadTest () {
    if (isMainThread) {
        // 创建一个线程，名字为当前文件夹
        const worker = new Worker(__filename);
        // 创建消息管道
        const subChannel = new MessageChannel();
        console.log("subChannel.port1", subChannel.port1);
        // 利用这个线程发送消息，内容为[{ hereIsYourPort: subChannel.port1 }],并且把所有权交给subChannel.port1
        worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
        // 消息管道端口2监听，如果监听到，就打印
        subChannel.port2.on('message', (value) => {
            console.log('接收到:', value);
        });
        subChannel.port2.on('exit', (value) => {
            console.log('接收到:', value);
        });
    } else {
        // 如果不是主线程
        parentPort.once('message', (value) => {
            assert(value.hereIsYourPort instanceof MessagePort);
            // const res = await yssLogin.clientLogin()
            // console.log(res);
            console.log('value.hereIsYourPort', value.hereIsYourPort);
            value.hereIsYourPort.postMessage('工作线程正在发送此消息');
            // process.exit()
            value.hereIsYourPort.close();
        });
    }
}
describe('test td', async function () {
    console.log(
        1111
    );
    it('new thread', async function () {
        await threadTest();
    });
});


// (async () => {
//     if (isMainThread) {
//         // 创建一个线程，名字为当前文件夹
//         const worker = new Worker(__filename);
//         // 创建消息管道
//         const subChannel = new MessageChannel();
//         console.log("subChannel.port1", subChannel.port1);
//         // 利用这个线程发送消息，内容为[{ hereIsYourPort: subChannel.port1 }],并且把所有权交给subChannel.port1
//         worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
//         // 消息管道端口2监听，如果监听到，就打印
//         subChannel.port2.on('message', (value) => {
//             console.log('接收到:', value);
//         });
//         subChannel.port2.on('exit', (value) => {
//             console.log('接收到:', value);
//         });
//     } else {
//         // 如果不是主线程
//         parentPort.once('message', (value) => {
//             assert(value.hereIsYourPort instanceof MessagePort);
//             const res = await yssLogin.clientLogin()
//             console.log(res);
//             console.log('value.hereIsYourPort', value.hereIsYourPort);
//             value.hereIsYourPort.postMessage('工作线程正在发送此消息');
//             // process.exit()
//             value.hereIsYourPort.close();
//         });
//     }
// })()