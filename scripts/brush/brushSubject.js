const yysLogin = require('../../project/help/base/yssLogin');
const wishFillApp = require('../../reqApi/app/wishFill');
const {
    common
} = require('../../lib/index');
const basicData = require('../../data/basicData');
const platfromProb = require('../../reqApi/platfrom/prob');
const base = require('../../reqApi/platfrom/base');
const doc = require('../../project/data/doc.json');
const school = require('../../reqApi/platfrom/school');
const collegeManage = require('../../project/help/applyComposite/collegeManage');
const { assert } = require('chai');

/**
 * @param {Number} kaoShiMC 考试名称
 * @param {Number} zhuanYeMC 专业名称
 */
// 指定用户
let admin = {
    loginName: '10020',
    password: 'Ysk002'
}

let subJectInput = {
    kaoShiMC: '2021年本科招生考试',
    zhuanYeMC: '艺术设计',
};

/**
 * @param {Number} faceRecognition 人脸识别1为必须,2为不必须
 * @param {Number} allowAttachment 是否允许上传,[1是2否]
 * @param {Boolean} hasExamDirectUrl 是否有考试指令
 * @param {Boolean} subjectExtendDataUrl 是否配置多段考试指令
 * @param {Number} seeProblemOnRecordingPage 是否开启阶段[1是,2否]
 * @param {Boolean} hasWaitExam 是否有候考阶段
 * @param {Boolean} hasReview 是否有审题阶段
 * @param {Boolean} hasReady 是否有准备阶段
 * @param {Number} sampleType 0不抽题（仅抽一次）,5为录一次抽一次
 * @param {Boolean} hasShowPaperStage 是否开启试卷展示阶段
 * @param {Number} breakRecordStatus 是否开启答卷提交时间,[1是,2否]
 */

let caseList = [
    {
        title: '视频录制类|不开人脸|传图|不开审题|配置考试指令', configParam: {
            faceRecognition: 2, allowAttachment: 1, hasExamDirectUrl: true, subjectExtendDataUrl: true
        }
    },
    {
        title: '视频录制类|开人脸且不必须|传图|不开审题|配置考试指令', configParam: {
            faceRecognition: 1, mustRecognitionSuccess: 2, allowAttachment: 1, hasExamDirectUrl: true, subjectExtendDataUrl: true
        }
    },
    {
        title: '视频录制类|开人脸且不必须|传图|审题为手机倒计时|配置考试指令', configParam: {
            sampleType: 1, faceRecognition: 1, mustRecognitionSuccess: 2, allowAttachment: 1, hasExamDirectUrl: true, subjectExtendDataUrl: true
        }
    },
    {
        title: '视频录制类|开人脸且不必须|传图|不开审题|配置考试指令|候考阶段|审题阶段|准备阶段|审题模式:不抽题', configParam: {
            faceRecognition: 2, allowAttachment: 1, hasExamDirectUrl: true, subjectExtendDataUrl: true, seeProblemOnRecordingPage: 1, hasWaitExam: true, hasReview: true, hasReady: true, sampleType: 1
        }
    },
    {
        title: '视频录制类|开人脸且不必须|传图|不开审题|配置考试指令|候考阶段|审题阶段|准备阶段|审题模式:录一次抽一次', configParam: {
            faceRecognition: 2, allowAttachment: 1, hasExamDirectUrl: true, subjectExtendDataUrl: true, seeProblemOnRecordingPage: 1, hasWaitExam: true, hasReview: true, hasReady: true, sampleType: 5
        }
    },
    {
        title: '视频录制类|开人脸且不必须|传图|不开审题|配置考试指令|试卷展示阶段', configParam: {
            faceRecognition: 2, allowAttachment: 1, hasExamDirectUrl: true, subjectExtendDataUrl: true, hasShowPaperStage: true,
        }
    },
    {
        title: '视频录制类|开人脸且不必须|传图|不开审题|配置考试指令|允许中断录制:是', configParam: {
            faceRecognition: 2, allowAttachment: 1, hasExamDirectUrl: true, subjectExtendDataUrl: true, breakRecordStatus: 1
        }
    }
]

/**
 * @alias 网络考试院校端 
 */

describe(`刷科目`, async function () {
    this.timeout(TESTCASE.timeout);
    let college = collegeManage.setupCollege();
    for (let i = 1; i <= caseList.length; i++) {
        describe(`${caseList[i - 1].title}`, async function () {
            let ord;
            before('院校管理员登录', async function () {
                const res = await yysLogin.schoolAdmin(admin)
                // console.log(res);
            });
            it('新增科目', async function () {
                let baseData;
                // 如果subJectInput不为空
                if (Object.getOwnPropertyNames(subJectInput).length != 0) {
                    baseData = await college.searchByNameAll(subJectInput);
                    // console.log(baseData);
                    ord = await college.saveSubject({
                        kaoShiID: baseData.kaoShiID,
                        profId: baseData.zhuanYeID,
                        subjectName: caseList[i - 1].title
                    })
                } else {
                    throw new Error('没有指定的考试和专业')
                }

            });
            it('完善科目信息', async function () {

                let testCase = caseList[i - 1].configParam;
                // 科目保存参数



                let saveData = {
                    esId: college.esId, // 科目id
                    kaoShizyID: college.kaoShizyID, // 考试专业id
                    subjectName: caseList[i - 1].title, // 科目名称
                    faceRecognition: testCase.faceRecognition, // 人脸识别参数获取
                    allowAttachment: testCase.allowAttachment, // 图片上传参数获取
                    examContent: `${caseList[i - 1].title}-考试内容`, // 考试内容
                    examExplain: `${caseList[i - 1].title}-考试说明`, // 考试说明
                    ord: ord, // 序号
                }
                // 图片上传是否开启
                if (testCase.allowAttachment == 1) {
                    saveData.picExplain == `${caseList[i - 1].title}图片上传说明`;
                }
                // 是否有考试指令参数
                if (expect(testCase.hasExamDirectUrl).to.be.ok) {
                    saveData.examDirectUrl = 'http://img.artstudent.cn/pr/2021-01-21/b0712318dd594dba84cc9fa2b369f3a8.mp3'
                }
                // 是否配置多段考试指令
                if (expect(testCase.subjectExtendDataUrl).to.be.ok) {
                    saveData.subjectExtendDataUrl = 'http://img.artstudent.cn/pr/2021-01-21/16f595c1b01b49e6bdb4699e8dd2c38c.json'
                }
                // 人脸识别
                if (expect(testCase.faceRecognition).to.be.ok) {
                    // 开启状态
                    if (testCase.faceRecognition == 1) {
                        saveData.faceRecognition = 1;
                        saveData.recognitionConfidence = ''; // 置信度
                        saveData.mustRecognitionSuccess = testCase.mustRecognitionSuccess; // 是否必须通过，1是，2否
                    }
                    // 不开启状态
                    else {
                        saveData.recognitionConfidence = testCase.faceRecognition;
                    }
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
                }
                // 是否开启试卷展示阶段
                if (testCase.hasShowPaperStage) {
                    let showPaperTimeLength = 35;
                    saveData.showPaperStage = 1;
                    saveData.showPaperVoiceCommandsUrl = 'http://img.artstudent.cn/pr/2021-01-07/856c9133af1f463c81d5897016ca734b.mp3';
                    saveData.showPaperVoiceCommandsText = `请考生展示试卷，展示${showPaperTimeLength}秒`;
                    saveData.showPaperVoiceCommandsLength = 4;
                    saveData.showPaperTimeLength = showPaperTimeLength;
                }

                await college.saveSubjectInfo(saveData, 1)
            });
        });
    }
});

