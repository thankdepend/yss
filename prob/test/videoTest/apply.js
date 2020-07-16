const {
    common
} = require('../../../lib/index');
const yysLogin = require('../../help/yssLogin');
const applyManage = require('../../help/applyManage');
const caps = require('../../../data/caps');
const account = require('../../data/account');
const audit = require('../../../reqApi/platfrom/audit')

describe('报名', async function () {
    this.timeout(TESTCASE.timeout);
    const apply = applyManage.setupApply();
    before('登录', async function () {
        let userInfo = {
            loginName: 'xyf33',
            password: 'Ysk002',
            device: 'm'
        }
        loginInfo = await yysLogin.clientLogin(userInfo).then(res => res.result.datas.user);
        // console.log('登录信息', loginInfo);
    });
    describe('新增考生', async function () {
        before('新增考生信息', async function () {
            const examineeJson = applyManage.mockExamineeJson();
            await apply.saveStuinfo(examineeJson);
        });
        it('查询考生信息', async function () {
            await apply.stuinfoAssert();
        });
        describe('图片上传', async function () {
            it('上传考生照片', async function () {
                await apply.uploadAuth()
            });
            it('上传身份证', async function () {
                await apply.uploadShenFen();
            });
            it('上传在籍证明', async function () {
                await apply.uploadProve()
            });
            it('上传录制考试视频', async function () {
                await apply.uploadVideo();
            });
            it('确认提交', async function () {
                await apply.uploadAuthCommit();
            });
            it('提交查询', async function () {
                await apply.queryUpload();
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
                    idcardNo: LOGINDATA.loginName,
                    ticket: PLAT_TICKET
                }).then(res => res.result.datas.page.dataList[0]);
                // 审核通过
                const res = await audit.auditAction({
                    psId: userAudit.psId,
                    auditFlag: userAudit.auditFlag,
                    applyTicket: userAudit.applyTicket,
                    ticket: PLAT_TICKET
                })
                console.log('审核通过', res);
            });
        });
    });

});