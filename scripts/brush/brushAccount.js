const {
    common
} = require('../../lib/index');
const user = require('../../reqApi/platfrom/user');
const account = require('../../project/data/account');
const yysLogin = require('../../project/help/base/yssLogin');
const request = require('superagent');
const stu = require('../../reqApi/app/stu');
const fs = require('fs');
const xlsx = require('node-xlsx');
const argv = require('yargs').argv;

// const workSheetsFromFile = xlsx.parse(`${__dirname}/xiniu.xlsx`);
// console.log(workSheetsFromFile[0].data[1][0]);


describe('刷用户账号', async function () {
    this.timeout(TESTCASE.timeout);
    before('平台登录', async function () {
        platFromInfo = await yysLogin.platfrom({
            userType: 'ptzg'
        });
        console.log('平台登录', platFromInfo);
    });
    it('创建考生号', async function () {
        for (let a = 87; a <= 95; a++) {
            let params = {
                // yongHuMing: `${workSheetsFromFile[0].data[a][0]}`,
                yongHuMing: `lj100${a}`,
                yongHuKL: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 'Kfk001',
                agginYongHuKL: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 'Kfk001',
                yongHuLB: 100,
                XinXiYT: 1,
                // xueXiaoID: 66777,
                // kaoDianID: 644,
                ticket: PLAT_TICKET
            }
            // platFromInfo = await yysLogin.platfrom({loginName:'mh01',password:'Csk001'});
            // await common.delay(500);
            const res = await user.saveUser(params)
            console.log('保存用户请求', res);
            if (res.result.message === '保存成功') {
                console.log(a);
            }
        }
    });
});