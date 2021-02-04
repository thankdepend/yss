const invigilateManage = require('../../help/applyComposite/videoTest/invigilateManage');
const yssLogin = require('../../help/base/yssLogin');
const school = require('../../../reqApi/platfrom/school');
const { common } = require('../../../lib/index');
const argv = require('yargs').argv;

/**
 * @alias 监考笔试类考试
 */


// 网络考试配置参数
const examOpt = {
    schoolId: 45600,
    kaoShiId: 13181,
    kaoDianID: 740,
    baoKaoId: '',
    riChengObj: {
        invigilate: 11110018, // 监考笔试类日程
    },
    esId: 3502,
    zhuanYeId: 1224972,
}

// 默认时间
const schedule = {
    checkStartTime: common.getCurrentTime(), // 检录开始时间(视频考题使用)
    showQuesStartDate: common.getCurrentTime(),  // 审题开始时间
    shootStartDate: common.getCurrentTime(), // 录制开始时间
    shootEndDate: common.getCurrentTimeAfter(1), // 录制截止时间
    commitPaperEndDate: common.getCurrentTimeAfter(1), // 提交答卷截止时间
    commitVideoStartDate: common.getCurrentTimeAfter(1), // 提交视频开始时间
    latestInTime: common.getCurrentTime(), // 最迟进入时间
}

// 用例集
const caseList = [
    { title: '|审题模式不限倒计时(正常考试)', configParam: { sampleType: 1 } },
    { title: '|审题模式网页手机同时审题', configParam: { sampleType: 3 } },
    { title: '|迟到考生进入', configParam: { latestInTime: schedule.latestInTime } },
    { title: '|视频考题', configParam: Object.assign({ ...schedule, videoExam: true }, { showQuesStartDate: common.getCurrentTimeAfter(1), shootStartDate: common.getCurrentTimeAfter(1), }) },
    {
        title: '|提交答卷截止时间已过', configParam: {
            commitEnd: true,
            showQuesStartDate: schedule.showQuesStartDate, shootStartDate: schedule.shootStartDate,
            shootEndData: schedule.shootEndData, commitPaperEndDate: common.getCurrentTime(), commitVideoStartDate: common.getCurrentTime()
        }
    },
    { title: '|阶段设置开启|候考阶段', configParam: { seeProblemOnRecordingPage: 1, hasWaitExam: true, sampleType: 1 } }, // 抽题挪到考试开始后
    { title: '|阶段设置开启|审题阶段', configParam: { seeProblemOnRecordingPage: 1, hasReview: true, sampleType: 1 } }, // 抽题挪到考试开始后
    { title: '|阶段设置开启|准备阶段', configParam: { seeProblemOnRecordingPage: 1, hasReady: true, sampleType: 1 } }, // 抽题挪到考试开始后
]

for (let i = 1; i <= caseList.length; i++) {
    describe(`监考笔试${caseList[i - 1].title}`, async function () {
        this.timeout(TESTCASE.timeout);

        let invigilate = invigilateManage.setupInvigilate(examOpt);

        // 如果需要指定参数
        invigilate.updateConstParams({
            schoolId: 45600, // 学校id
            kaoShiId: 13181,// 考试id
            kaoDianID: 740,// 考点id
            riChengID: 11110018,// 日程id
            zhuanYeId: 1224972,// 专业id
            esId: 3502,// 科目id
        })
        // console.log(invigilate);
        // 指定的学校
        let schoolData = {
            loginName: '45600',
            password: 'Yss45600'
        }

        let testCase = caseList[i - 1].configParam;

        before('登录-获取关键校验信息', async function () {
            let saveData = {};
            // 院校登录
            await yssLogin.platfrom({
                loginName: schoolData.loginName,
                password: schoolData.password,
            })

            // 如果有抽题模式
            if (testCase.sampleType) {
                await invigilate.saveSubjectByInv({
                    sampleType: testCase.sampleType
                });
            }

            // 如果有最迟进入时间
            if (testCase.latestInTime) {
                await invigilate.saveSubjectByInv({
                    latestInTime: testCase.latestInTime
                });
            }

            // 如果有检录开始时间
            if (testCase.videoExam) {
                await invigilate.saveSubjectByInv({
                    checkStartTime: testCase.checkStartTime
                });
            }

            // 如果答卷提交时间已过
            if (testCase.commitEnd) {
                delete testCase.commitEnd;
                await invigilate.saveSubjectByInv(testCase);
            }

            // 是否有候考阶段
            if (testCase.hasWaitExam) {
                let waitExamTimeLength = 30;// 候考时长
                saveData.seeProblemOnRecordingPage = 1; // 阶段开启
                saveData.openWaitStage = 1; // 候考阶段开启
                saveData.waitExamVoiceCommandsUrl = 'http://img.artstudent.cn/pr/2021-01-07/a1ce53370d5242048dff6c0acfb92715.mp3'; // 候考语音指令
                saveData.waitExamVoiceCommandsText = `开始候考，候考时间${waitExamTimeLength}秒`; // 候考阶段指令文案
                saveData.waitExamVoiceCommandsLength = 4; // 考试指令时长
                saveData.waitExamTimeLength = waitExamTimeLength; // 候考时长
                saveData.waitingNotes = '候考环节开始'; // 候考说明
                await invigilate.saveSubjectByInv(saveData);
            }

            // 是否有审题阶段
            if (testCase.hasReview) {
                let reviewTimeLength = 25; // 审题时长
                saveData.seeProblemOnRecordingPage = 1; // 阶段开启
                saveData.openReviewStage = 1; // 审题阶段开启
                saveData.reviewVoiceCommandsUrl = 'http://img.artstudent.cn/pr/2021-01-07/8973b7a1f743435d8722c1b53a9ff87e.mp3'; // 审题语音指令
                saveData.reviewVoiceCommandsText = `开始审题，审题时间${reviewTimeLength}秒`; // 审题阶段指令文案
                saveData.reviewVoiceCommandsLength = 4; // 审题指令时长
                saveData.reviewTimeLength = reviewTimeLength;
                await invigilate.saveSubjectByInv(saveData);
            }

            // 是否有准备阶段
            if (testCase.hasReady) {
                let readyTimeLength = 20 // 准备时长
                saveData.seeProblemOnRecordingPage = 1; // 阶段开启
                saveData.openReadyStage = 1; // 准备阶段开启
                saveData.readyVoiceCommandsUrl = 'http://img.artstudent.cn/pr/2021-01-07/6792becec6854ee7becf0eff08695335.mp3'; // 准备阶段指令
                saveData.readyVoiceCommandsText = `准备环节，准备时间${readyTimeLength}秒`; // 准备阶段指令文案
                saveData.readyVoiceCommandsLength = 3; // 准备指令时长
                saveData.readyTimeLength = readyTimeLength;
                saveData.showPaper = 1; // 是否在准备阶段展示试卷,[1是,2否]
                saveData.readyNotes = '准备阶段开始'; // 准备说明
                await invigilate.saveSubjectByInv(saveData);
            }

            // 获取后台考题库
            await invigilate.getExaminationList()
            // 获取科目编辑页信息
            await invigilate.getExamSubjectEdit()
            // 用户登录
            await yssLogin.clientLogin({
                loginName: `mihuan${i + 1}`,
                password: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 'Kfk001'
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
            // if (testCase.videoExam) {
            //     it('抽考题-并且断言时间未到', async function () {
            //         await invigilate.checkTimeByTypeAssert({ delay: true })
            //     });
            //     it('自动调整时间', async function () {
            //         // 院校登录
            //         await yssLogin.platfrom({
            //             loginName: schoolData.loginName,
            //             password: schoolData.password,
            //         })
            //         // 确保能进入考试，自动调整考试时间
            //         await invigilate.saveSubjectByInv(Object.assign(testCase.configParam, { showQuesStartDate: common.getCurrentTime(), shootStartDate: common.getCurrentTime() }));
            //         // 用户登录
            //         await yssLogin.clientLogin({
            //             loginName: `mihuan2${i}`,
            //             password: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 'Kfk001'
            //         })
            //     });

            // }
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
                    loginName: `mihuan${i + 1}`,
                    password: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 'Kfk001',
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
