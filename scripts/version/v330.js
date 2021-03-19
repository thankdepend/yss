const stuApp = require('../../reqApi/app/stu')
const yssLogin = require('../../project/help/base/yssLogin')

describe('3-17测试', async function () {
    this.timeout(TESTCASE.timeout)

    before('登录', async function () {
        // await yssLogin.platfrom({
        //     loginName: '11996',
        //     password: 'Yss11996',
        // });
        await yssLogin.clientLogin();
    });
    it('保存报名登记表信息', async function () {
        console.log(LOGINDATA);
        const res = await stuApp.saveRegistrationForms({
            data: {
                m: "",
                p: {
                    // userId: LOGINDATA.userId,
                    // userName: LOGINDATA.loginName,
                    // schoolId: 11996,
                    // schoolName: '测试环境院校',
                    // examId: 13153,
                    // examName: '2021年本科招生',
                    // pointId: 912,
                    // pointName: '亦闲考点',
                    // profId: 1224912,
                    // profName: '美术',
                    // registrationFormUrl: "https://art-exam-video-shanghai.oss-cn-shanghai.aliyuncs.com/upload_video/lizhiming.png;https://art-exam-video-shanghai.oss-cn-shanghai.aliyuncs.com/upload_video/lizhiming.png;https://art-exam-video-shanghai.oss-cn-shanghai.aliyuncs.com/upload_video/lizhiming.png",
                    // baoKaoId: 13,
                    "userId": 1080714,
                    "userName": "志薛兰",
                    "schoolId": 88881,
                    "schoolName": "蟋蟀-小鱼",
                    "examId": 13154,
                    "examName": "2021年本科招生",
                    "pointId": 612,
                    "pointName": "新艺考点",
                    "profId": 1223367,
                    "profName": "网络考试视频(一)",
                    "registrationFormUrl": "https://art-exam-video-shanghai.oss-cn-shanghai.aliyuncs.com/upload_video/lizhiming.png;https://art-exam-video-shanghai.oss-cn-shanghai.aliyuncs.com/upload_video/lizhiming.png;https://art-exam-video-shanghai.oss-cn-shanghai.aliyuncs.com/upload_video/lizhiming.png",
                    "baoKaoId": 2658517
                }
            }, ticket: TICKET
        })

        console.log(res);
        console.log(res.params);
    });
    it('查询已提交的登记表照片地址', async function () {
        const res = await stuApp.queryRegistrationForms({
            data: {
                m: '',
                p: {
                    baoKaoId: 13
                }
            }, ticket: TICKET
        })
        console.log(res.result.datas.registrationForms);
        console.log(res.params);
    });
});
