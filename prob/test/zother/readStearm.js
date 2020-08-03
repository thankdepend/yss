var fs = require('fs');
var path = require('path');
var stream = require('stream');

// // 读取_dirname(当前路径)的文件
const imgBuf = fs.readFile(path.join(__dirname, "./imgtest.txt"), function (error, result) {
    console.log('err', error);
    console.log('success', result);
    return result;
});
console.log(imgBuf);

// 创建一个bufferstream
var bufferStream = new stream.PassThrough();
//将Buffer写入
bufferStream.end(new Buffer('Test data.'));
//进一步使用
const a = bufferStream.pipe(process.stdout)
console.log('流', a);


// const stream1 = fs.createReadStream('./imgtest.txt', {
//     start: 90,
//     end: 99
// })
// console.log(stream1);

// // var file = path.resolve('C:\\Users\\86132\\AppData\\Local\\Temp\\upload_a50b8715113137b914c6cd9efe0c11ab');
// // console.log(file);
// var rs = fs.createReadStream(file, {
//     highWaterMark: 5
// });
// console.log('rs-------------', rs);
// // var file2 = path.resolve('prob/test/zother/imgtest.txt');
// const ws = fs.createWriteStream('rs');
// console.log('ws--------------', ws);

// var dataArr = [], //存储读取的结果集合
//     len = 0;

// /*
//  *  1.读取结果为Buffer对象
//  */
// rs.on('data', function (chunk) {
//     console.log(Buffer.isBuffer(chunk));
//     dataArr.push(chunk);
//     len += chunk.length;
// });
// rs.on('end', function () {
//     var result = Buffer.concat(dataArr, len).toString();
//     console.log(result);
// });