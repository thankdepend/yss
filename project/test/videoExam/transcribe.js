const transcribeManage = require('../../help/applyComposite/videoTest/transcribeManage');
const yssLogin = require('../../help/base/yssLogin');
const { common } = require('../../../lib/index');

/**
 * @alias 视频录制类考试
 */
describe('视频录制类', async function () {
    this.timeout(TESTCASE.timeout);
    let transcribe = transcribeManage.setupTranscribe()

    before('登录-获取关键校验信息', async function () {
        // // 院校登录
        // await yssLogin.platfrom({
        //     loginName: '13166',
        //     password: 'Yss13166',
        // })
        // // 获取后台考题库
        // await invigilate.getExaminationList()
        // // 获取科目编辑页信息
        // await invigilate.getExamSubjectEdit()
        // 用户登录
        await yssLogin.clientLogin({
            loginName: 'mihuan32',
            password: 'Csk001',
        })
        // 进考场
        await transcribe.underwayExamByTran();
    });
    describe('开始考试-视频录制', async function () {
        it('抽考题', async function () {
            await transcribe.checkTimeByType();
        });
        // it('校验考题', async function () {
        //     await transcribe.checkTimeByTypeAssert()
        // });
        // it('详情校验', async function () {
        //     await transcribe.subjectInfoAssert()
        // });
    });
    describe('开始录制', async function () {
        it('开始录制', async function () {
            await transcribe.startRecordByTran();
        });
        it('校验照片是否是本人', async function () {
            await transcribe.checkAttestPhotoByTran()
        });
        it('保存截图', async function () {
            await transcribe.checkAttestPhotoByTran()
        });
        it('清除录制状态', async function () {
            await transcribe.clearRecordStatusByTran()
        });
    });
    describe('录制完成-保存次数', async function () {
        it('录制完成-保存次数', async function () {
            await transcribe.saveCount()
        });
    });
    describe('提交考卷', async function () {
        it('提交考卷', async function () {
            await transcribe.commitPaper();
        });
        // it('科目详情', async function () {
        //     await invigilate.subjectInfoAssert()
        // });
    });
});