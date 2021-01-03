const yssLogin = require('../../help/base/yssLogin');
const stuApp = require('../../../reqApi/app/stu');
const userApp = require('../../../reqApi/app/user');
const examvideo = require('../../../reqApi/platfrom/examvideo');
const school = require('../../../reqApi/platfrom/school');
const { common } = require('../../../lib/index');

describe.skip('双机位网络考试', async function () {
    this.timeout(TESTCASE.timeout);
    before('主机登录', async function () {
        await yssLogin.clientLogin({
            loginName: 'mihuan21',
            password: 'Csk001'
        });
    });
    describe('视频录制类', async function () {
        let masterStatus;
        after('视频打回', async function () {
            await yssLogin.platfrom({
                loginName: '13166',
                password: 'Yss13166'
            });
            // 查询考生考试结果查询
            const examResData = await examvideo.getExaminerAssignDetailList({
                showSubject: 1,
                showSchedule: 1,
                kaoShiID: 13047,
                kaoDianID: 731,
                riChengId: 11108262,
                riChengID: 11108262,
                esId: 1701,
                videoLengthComPare: '',
                commitFlag: 1,
                paperCommitFlag: '',
                stuIDCard: '',
                stuName: '',
                zhunKaoZH: 'mihuan21',
                curPage: 1,
                pageSize: 15,
            })
            const videoInfo = examResData.result.datas.page.dataList[0];
            // 视频打回两步走,获取token，打回
            await school.pwdAuth({
                authCode: 'Yss13166',
                optRemark: `视频打回-${common.getCurrentDate()}`,
            });
            await school.resetVideo({
                svId: videoInfo.svId,
                authCode: 'Yss13166',
                optRemark: `视频打回-${common.getCurrentDate()}`,
            });
        });
        it('改变用户状态为进考场', async function () {
            const res = await stuApp.saveStudentExamStatus({
                data: {
                    m: "",
                    p: {
                        esId: 1701,
                        baoKaoId: 2622186,
                        examStatus: 200
                    }
                }, ticket: TICKET
            })
            console.log(res);
        });
        it('主机获取科目列表', async function () {
            await stuApp.querySubjectVideoList({
                data: {
                    "m": "",
                    "p": {
                        "riChengId": 11108262,
                        "riChengID": 11108262,
                        "baoKaoId": 2622186,
                        "simulation": 0
                    }
                }, ticket: TICKET
            });
        });
        it('检查主机状态', async function () {
            masterStatus = await stuApp.checkSlaveStatus({
                data: {
                    m: "",
                    p: {
                        esId: 1701,
                        examWay: 1,
                        simulation: 2
                    }
                }, ticket: TICKET
            })
            console.log(masterStatus);
        });

        it('辅机登录', async function () {
            const res = await userApp.multiTerninalLogin({
                data: {
                    p: {
                        "ticket": TICKET,
                        "userId": LOGINDATA.userId,
                        "udid": LOGINDATA.loginUdid,
                        "videoCode": masterStatus.result.datas.videoCode,
                        "localUserId": LOGINDATA.userId,
                        "businessCode": 1,
                        // params: {
                        //     esId: 1701,
                        //     svId: 9438,
                        //     baoKaoId: 2622594,
                        //     riChengId: 11108262,
                        //     qrcodePageType: 1,
                        //     videoCode: 'v1607936223980',
                        //     sampleType: 0,
                        //     businessCode: 1,
                        //     demo: 2
                        // }
                    }, m: ""
                }
            })
            console.log(res);
        });
        it('辅机获取视频考试信息', async function () {
            const res = await stuApp.getExamVideoInfo({
                data: {
                    m: "",
                    p: {
                        riChengId: 11108262,
                        baoKaoId: 2622186,
                        esId: 1701,
                        svId: 9438,
                        simulation: 0
                    }
                }, ticket: TICKET
            })
            console.log(res);
        });
        it.skip('辅机开始录制', async function () {
            await stuApp.changeSlaveStatus();
        });
        it.skip('辅机结束录制', async function () {
            await stuApp.changeSlaveStatus();
        });
        it.skip('检查主机提交状态', async function () {
            await stuApp.checkMasterVideoUpload()
        });
        it.skip('上传视频（这里先跳过）', async function () {

        });
        it.skip('主机提交', async function () {

        });
        it.skip('检查主机提交状态', async function () {
            await stuApp.checkMasterVideoUpload()
        });
        it.skip('检查考试时间', async function () {
            await stuApp.checkAllowToExam({
                data: {
                    "m": "",
                    "p": {
                        "esId": 1701,
                        "examWay": 1,
                        "riChengId": 11108262,
                        "slaveStatus": 2,
                        "videoCode": "v1607938229651",
                        "simulation": 2
                    }
                }
            });
        });
    });
});