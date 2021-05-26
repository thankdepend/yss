const userApp = require('../../reqApi/app/user');
const user = require('../../reqApi/platfrom/user');
const fs = require('fs');

describe.skip('修改密码', async function () {
    it('获取问题', async function () {
        const res = await userApp.getQuestion({
            data: {
                p: { "shenFenZH": "xyf1", "zhengJianLX": 4 },
                m: ''
            }
        })
        console.log(res);
    });
    it('校验问题', async function () {
        const res = await userApp.verifyQuestion({
            data: { "p": { "shenFenZH": "XYF1", "daAn": "爸爸" }, "m": "" }
        })
        console.log(res);
    });
    it('设置新密码', async function () {
        const res = await userApp.setNewPwd({
            data: {
                p: { "shenFenZH": "XYF169", "daAn": "爸爸m", "yongHuKL": "Xyf1234", "type": 1 },
                m: ''
            }

        })
        console.log('打印', res);
    });
});

describe('千校千面', async function () {
    it('验证答案', async function () {
        const res = await user.secondStep({
            shenFenZH: 'xyf169',
            authCode: 'enef8',
            // sid: '13dc3a7a779742a386eb94a6795eb66e',
        })
        console.log('验证答案', res);
        fs.writeFile('daAn.html', `${res.result.replace(/(\\n)|(\\r)|(\\t)/g, '')}`, 'utf8', function (error) {
            if (error) {
                console.log(error);
                return false;
            }
            console.log('写入成功');
        })
    });
    it('设置新密码', async function () {
        const res = await user.setNewPwd({
            shenFenZH: 'xyf182',
            findType: 1,
            wenTi: '爸爸的姓名是什么',
            answer: '爸爸',
            xingYongHuKL: 'Dbc123',
            qrxingYongHuKL: 'Dbc123',
        });
        console.log(JSON.stringify(res.result));

        fs.writeFile('index.html', `${res.result.replace(/(\\n)|(\\r)|(\\t)/g, '')}`, 'utf8', function (error) {
            if (error) {
                console.log(error);
                return false;
            }
            console.log('写入成功');
        })

    });
});