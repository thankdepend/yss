var request = require('request');
var fs = require('fs');
const xlsx = require('node-xlsx');
// const argv = require('yargs').argv;

const workSheetsFromFile = xlsx.parse(`${__dirname}\\demo.xlsx`);

async function downloadFile (uri, filename, callback) {
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback);
}

if (!fs.existsSync('mp4')) {
    fs.mkdirSync('mp4');
}

console.log('Start download...');
describe('下载视频', async function () {
    for (let i = 1; i <= 3; i++) {
        it(`开始下载${i}`, async function () {
            const filename = 'mp4/shuwa-' + i + '.mp4';
            await downloadFile(
                workSheetsFromFile[0].data[i][workSheetsFromFile[0].data[i].length - 1],
                filename, function () {
                    console.log('Success: ' + filename + ' 下载完成！');
                });

        });
    }
});

