const {
    common
} = require('../../../lib/index');
const yysLogin = require('../../help/base/yssLogin');
const fillManage = require('../../help/applyComposite/fillManage');
const caps = require('../../../data/caps');
const account = require('../../data/account');
const audit = require('../../../reqApi/platfrom/audit')
const fs = require('fs');
const xlsx = require('node-xlsx');
const argv = require('yargs').argv;

const workSheetsFromFile = xlsx.parse(`${__dirname}/xiniu.xlsx`);
// console.log(workSheetsFromFile);
// console.log(workSheetsFromFile[0].data[1][1]);


/**
 * @alias 完善信息-审核一条龙
 */

for (let i = 1; i <= 1; i++) {
    describe.skip('完善信息与审核', async function () {
        this.timeout(TESTCASE.timeout);
        const fill = fillManage.setupFill();
        before('登录', async function () {
            let userInfo = {
                loginName: `${workSheetsFromFile[0].data[i][0]}`,
                password: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 'Kfk001',
                device: 'm'
            }
            await yysLogin.clientLogin(userInfo);
            // console.log('登录信息', LOGINDATA);
        });

        describe('新增考生', async function () {
            it('新增考生信息', async function () {
                const examineeJson = fillManage.mockExamineeJson({
                    shenFenZH: `${workSheetsFromFile[0].data[i][0]}`,
                    kaoShengXM: `${workSheetsFromFile[0].data[i][1]}`
                });
                await fill.saveStuinfo(examineeJson);
            });
            it('查询考生信息', async function () {
                await fill.stuinfoAssert();
            });
            describe('图片上传', async function () {
                it('上传考生照片', async function () {
                    await fill.uploadAuth()
                });
                it('上传身份证', async function () {
                    await fill.uploadShenFen();
                });
                it('上传在籍证明', async function () {
                    await fill.uploadProve()
                });
                it('上传录制考试视频', async function () {
                    await fill.uploadVideo();
                });
                it('确认提交', async function () {
                    await fill.uploadAuthCommit();
                });
                it('提交查询', async function () {
                    await fill.queryUpload();
                });
            });
            describe('客服审核', async function () {
                let userAudit;
                before('客服主管登录', async function () {
                    platFromInfo = await yysLogin.platfrom(account[caps.name].kf);
                    console.log('平台登录', platFromInfo);
                });
                it('审核通过', async function () {
                    // 获取psid
                    userAudit = await audit.getAuditList({
                        auditFlag: -1,
                        idcardNo: LOGINDATA.loginName,
                        ticket: PLAT_TICKET
                    }).then(res => res.result.datas.page.dataList[0]);
                    // console.log('审核信息', userAudit);
                    // 审核通过
                    const res = await audit.auditAction({
                        psId: userAudit.psId,
                        // auditFlag: userAudit.auditFlag,
                        // applyTicket: userAudit.applyTicket,
                        auditFlag: 1,
                        applyTicket: 1,
                        ticket: PLAT_TICKET
                    })
                    // console.log('审核通过', res);
                    if (res.result.message === '操作成功') {
                        console.log(i);
                    }
                });
            });
        });

    });
}
