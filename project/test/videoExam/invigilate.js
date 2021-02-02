const invigilateManage = require('../../help/applyComposite/videoTest/invigilateManage');
const yssLogin = require('../../help/base/yssLogin');
const school = require('../../../reqApi/platfrom/school')
const { common } = require('../../../lib/index');

/**
 * @alias 监考笔试类考试
 */

const schedule = {
    // checkStartTime: '', // 检录开始时间(视频考题使用)
    showQuesStartDate: common.getCurrentTime(),  // 审题开始时间
    shootStartDate: common.getCurrentTime(), // 录制开始时间
    shootEndDate: common.getCurrentTimeAfter(1), // 录制截止时间
    commitPaperEndDate: common.getCurrentTimeAfter(1), // 提交答卷截止时间
    commitVideoStartDate: common.getCurrentTimeAfter(1), // 提交视频开始时间
    latestInTime: '', // 最迟进入时间
}

const caseList = [
    // { title: '|审题模式不限倒计时', configParam: {} },
    // { title: '|审题模式网页手机同时审题', },
    // { title: '|视频考题', },
    // { title: '|迟到考生进入' },
    // { title: '|提交答卷截止时间已过' },
    // { title: '|阶段设置开启|候考阶段' }, // 抽题挪到考试开始后
    // { title: '|阶段设置开启|审题阶段' }, // 抽题挪到考试开始后
    // { title: '|阶段设置开启|准备阶段' }, // 抽题挪到考试开始后
]

for (let i = 2; i <= 2; i++) {
    describe('监考笔试', async function () {
        this.timeout(TESTCASE.timeout);
        let invigilate = invigilateManage.setupInvigilate();

        // 如果需要指定参数
        // invigilate.updateConstParams({
        //     schoolId: 45600, // 学校id
        //     kaoShiId: 13181,// 考试id
        //     kaoDianID: 740,// 考点id
        //     riChengID: 11110018,// 日程id
        //     zhuanYeId: 1224972,// 专业id
        //     esId: 3502,// 科目id
        // })
        // console.log(invigilate);
        let schoolData = {
            loginName: '45600',
            password: 'Yss45600'
        }

        before('登录-获取关键校验信息', async function () {
            // 院校登录
            await yssLogin.platfrom({
                loginName: schoolData.loginName,
                password: schoolData.password,
            })
            // 获取后台考题库
            await invigilate.getExaminationList()
            // 获取科目编辑页信息
            await invigilate.getExamSubjectEdit()
            // 用户登录
            await yssLogin.clientLogin({
                loginName: `haibei${i}`,
                password: 'Csk001',
            })
            // 进考场
            await invigilate.underwayExamByInvi();
        });
        after('将考生视频打回', async function () {
            await yssLogin.platfrom({
                loginName: schoolData.loginName,
                password: schoolData.password,
            })
            await invigilate.getAssignDetail()
            const getToken = await school.pwdAuth({
                authCode: `Yss${schoolData.loginName}`,
                optRemark: 'auto-repulseVideo',
                ticket: PLAT_TICKET
            });
            const token = getToken.result.datas.token;
            // console.log(token);
            const res = await school.repulseVideo({
                svId: invigilate.svId,
                token: token,
                optRemark: 'auto-repulseVideo',
                ticket: PLAT_TICKET
            })
            // console.log('视频打回', res);
        });
        describe('开始考试-监考笔试', async function () {
            before('抽考题', async function () {
                await invigilate.checkTimeByType();
            });
            it('校验考题', async function () {
                await invigilate.checkTimeByTypeAssert()
            });
            it('详情校验', async function () {
                await invigilate.subjectInfoAssert()
            });
        });
        describe('开始录制', async function () {
            it('开始录制', async function () {
                await invigilate.startRecordByInv();
            });
            it('校验照片是否是本人', async function () {
                await invigilate.checkAttestPhotoByInv()
            });
            it('保存截图', async function () {
                await invigilate.saveScreenshotByInv()
            });
            it('清除录制状态', async function () {
                await invigilate.clearRecordStatusByInv()
            });
        });
        describe('抽到题开始减次数', async function () {
            before('保存次数', async function () {
                await invigilate.saveCount()
            });
            it('校验考生录制次数', async function () {
                await invigilate.saveCountAssert()
            });
        });
        describe('提交考卷', async function () {
            before('提交考卷', async function () {
                await yssLogin.platfrom({
                    loginName: schoolData.loginName,
                    password: schoolData.password
                })
                // 确保能进入考试，自动调整考试时间
                await invigilate.saveSubjectByInv();

                // 交卷
                await yssLogin.clientLogin({
                    loginName: `haibei${i}`,
                    password: 'Csk001',
                })
                await invigilate.commitPaper();
            });
            it('科目详情', async function () {
                await invigilate.subjectInfoAssert()
            });
        });
        describe('提交视频', async function () {
            it('提交视频', async function () {
                await invigilate.checkAndcommitVideo()
            });
            it('考生考试结果', async function () {
                await invigilate.assignDetailAssert()
            });
            it('考生专业视频', async function () {
                await invigilate.studentSubjectVideoListByinvAssert()
            });
        });

    });
}
