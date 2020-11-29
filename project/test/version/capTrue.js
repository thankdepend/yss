const user = require('../../../reqApi/app/user');
const stu = require('../../../reqApi/app/stu');
const examvideo = require('../../../reqApi/app/examVideo');
const print = require('../../../reqApi/app/print')
const fileCenter = require('../../../reqApi/app/fileCenter')
const yssLogin = require('../../help/yssLogin')

// A部抓包

describe('报名', async function () {
    before('', async function () {

    });
    it('检查用户是否完善分数线', async function () {
        // 这个没啥用，就前端调一下
        // http://user.51bm.net.cn/api/m/auth/unite/checkNeedFillScore.htm
        await user.checkNeedFillScore({
            data: { "m": "", "p": {} }
        });
    });
    it('搜索院校', async function () {
        // http://stu.51bm.net.cn/api/m/auth/college/v4/seekCollege.htm
        await stu.seekCollege({
            data: { "m": "", "p": { "keyword": "中共", "curPage": 1, "pageSize": 100 } }
        });
    });
    it('查询院校专业列表', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/apply/query_prof.htm
        await stu.getProf({
            data: {
                "m": "", "p": { "xueXiaoID": 13166, "baoKaoBZList": [1, 2, 3] }
            },
            ticket: TICKET
        });
    });
    it('查询考点', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/apply/query_exam_site.htm
        await stu.getExamSite({
            data: { "m": "", "p": { "xueXiaoID": 13166 } }
        })
    });
    it('查询申请公共', async function () {
        // 不知道干嘛的
        // http://stu.51bm.net.cn/api/m/auth/apply/query_apply_notice.htm
        await stu.queryApplyNotice({
            data: { "m": "", "p": { "schId": "13166", "examId": "12937", "examPointId": "642", "profId": "1223677" } }
        });
    });
    it('查询院校考点', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/site/schoolSite/query.htm
        await stu.getSchoolSite({
            data: { "m": "", "p": { "xueXiaoID": "13166", "kaoShiID": "12937", "KaiTongBZ": 1 } }
        });
    });
    it('查询考试计划', async function () {
        // http://stu.51bm.net.cn/api/m/auth/apply/query_exam_schedule.htm
        await stu.queryExamSchedule({
            data: { "m": "", "p": { "kaoShiKDID": "1241560", "applyMode": null, "kaoShiID": "12937", "xueXiaoID": "13166" } }
        })
    });
    it('报名', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/apply/save_prof.htm
        await stu.saveProf({
            data: { "m": "", "p": { "riChengID": "11107843" } }
        })
    });
    it('创建报名订单', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/apply/add_prof_order.htm
        await stu.addProfOrder({
            data: { "m": "", "p": { "xueXiaoID": "13166", "baoKaoIDs": [2619346], "sIds": "" } }
        });
    });
    it('查询其他平台报名数据', async function () {
        // http://stu.51bm.net.cn/api/m/auth/apply/query_other_platform_applydata.htm
        await stu.queryOtherPlatformApplyData({
            data: { "m": "", "p": { "shenFenZH": "330327" } }
        })
    });
});

describe('网络考试(普通模式)', async function () {
    before('考生登录', async function () {
        // http://user.51bm.net.cn/login
        await yssLogin.clientLogin()
    });
    it('查询考试专业列表', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/apply/query_exam_prof.htm
        await stu.queryExamProf({
            data: { "m": "", "p": {} }
        })
    });
    it('查询考试承诺书', async function () {
        // http://stu.51bm.net.cn/api/m/auth/apply/query_exam_promise.htm
        await stu.queryExamPromise({
            data: { "m": "", "p": { "schId": 13166, "examId": 12937, "baoKaoID": 2619346 } }
        })
    });
    it('查询报考状态', async function () {
        // ***
        // http://examvideo.51bm.net.cn/api/m/auth/live/stuQueue/queryBaoKaoStatus.htm
        await examvideo.queryBaoKaoStatus({
            data: { "m": "", "p": {} }
        })
    });
    it('在线确认列表', async function () {
        // ***
        // http://print.51bm.net.cn/api/m/auth/apply/v4/query_online_confirm.htm
        await print.getAffirmList({
            data: { "m": "", "p": { "baoKaoBZ": 3 } }
        });
    });
    it('在线确认', async function () {
        // ***
        // http://print.51bm.net.cn/api/m/auth/apply/commit_online_confirm.htm
        await print.saveAffirm({
            data: { "m": "", "p": { "baoKaoIDs": [2619358], "xueXiaoID": "13166" } }
        })
    });

    it('保存学生考试状态', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/student/log/saveStudentExamStatus.htm
        await stu.saveStudentExamStatus({
            data: { "m": "", "p": { "esId": 895, "baoKaoId": 2619297, "examStatus": 500 } }
        })
    });
    it('查询考试专业', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/apply/query_exam_prof.htm
        await stu.queryExamProf({
            data: { m: '', p: {} }
        });
    });
    it('查询科目视频信息列表', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/video/querySubjectVideoInfo.htm
        await stu.querySubjectVideoInfo({
            data: { "m": "", "p": { "riChengId": 11107838, "riChengID": 11107838, "baoKaoId": 2619297, "simulation": 0 } }
        })
    });
    it('保存学生考试状态', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/student/log/saveStudentExamStatus.htm
        await stu.saveStudentExamStatus({
            data: { "m": "", "p": { "esId": 895, "baoKaoId": 2619297, "examStatus": 100 } }
        })
    });
    it('考生信息上传（截图）', async function () {
        // ***
        // http://filecenter.51bm.net.cn/api/m/auth/file/v202007/ossUploadInfo.ws
        await fileCenter.ossUploadInfo({
            data: { "p": { "provinceNo": "340000" }, "m": "" }
        })
    });
    it('认证是否是本人', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/video/attestPhoto.ws
        await stu.attestPhoto();
    });
    it('查询科目视频信息列表', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/video/querySubjectVideoInfo.htm
        await stu.querySubjectVideoInfo({
            data: { "m": "", "p": { "riChengId": 11107838, "riChengID": 11107838, "baoKaoId": 2619297, "simulation": 0 } }
        })
    });
    it('上传视频', async function () {
        // ***
        // http://filecenter.51bm.net.cn/api/m/auth/file/v202007/ossUploadInfo.ws
        await fileCenter.ossUploadInfo({
            data: { "p": { "provinceNo": "340000" }, "m": "" }
        })
    });
    it('检查考试时间到没到', async function () {
        // http://stu.51bm.net.cn/api/m/auth/video/check_allow_to_exam.htm
        await stu.checkAllowToExam({
            data: { "m": "", "p": { "subjectName": "美术理论（普通）", "riChengId": 11107838, "esId": 895 } }
        })
    });
    it('提交视频', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/video/commitVideo.ws
        await stu.commitVideo({
            data: { "p": { "ticket": "oJ0neJmEMv$2VG1jOVBRPT07TlRjeE56VStOekF4TmpjPTs2Ng==", "esId": 895, "videoFileSize": 163965222, "svId": 2764, "kaoShengID": "246682", "baoKaoId": 2619414, "riChengId": 11107838, "shootTime": "1604578366610", "recordPhoto": "http://art-video.artstudent.cn/photo/demo/13166/1223644/895/8b4bca0f878f41a0b5957585df082062_uid1076183.jpg", "photoAttachment": "http://art-video.artstudent.cn/img/demo/13166/1223644/895/e7c69764aab24fbea53fc535c1c1cfab_uid1076183.jpg;http://art-video.artstudent.cn/img/demo/13166/1223644/895/372666e7c7ac4683a565d63c1a642e5d_uid1076183.jpg", "master": 1, "xueXiaoID": 13166, "stuVideoLength": "556", "shenFenZH": "330329", "yongHuID": 1076183, "videoUrl": "http://art-video.artstudent.cn/pr/demo/13166/1223644/895/54b3debdd81542679e68b1d9c94c3355_uid1076183.mp4", "zhuanYeId": 1223644, "supplement": "", "zhuanYeMC": "美术", "seId": "", "shootArea": " ", "subjectCode": "1", "subjectName": "美术理论（普通）" }, "m": "" }
        })
    });
});

describe('网络考试(客观题-同时考)', async function () {
    before('考生登录', async function () {
        // http://user.51bm.net.cn/login
        await yssLogin.clientLogin()
    });
    it('查询科目视频信息列表', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/video/querySubjectVideoInfo.htm
        await stu.querySubjectVideoInfo({
            data: { "m": "", "p": { "riChengId": 11107838, "riChengID": 11107838, "baoKaoId": 2619297, "simulation": 0 } }
        })
    });
    it('检查时间类型', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/video/check_time_by_type.htm
        // {"m":"","p":{"xueXiaoId":"13166","subjectName":"美术高级进阶（统一模式-随机指令）","zhuanYeMC":"美术","esId":904,"riChengId":11107838,"checkTimeType":1}}
    });
    it('添加运转记录', async function () {
        // ***
        //{"p":{"list":[{"createTime":"2020-11-05 20:21:08","esId":895,"id":"1","operateLog":"submitSuccess","userId":1076183}]},"m":""}
    });
    it('保存学生考试状态', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/student/log/saveStudentExamStatus.htm
        await stu.saveStudentExamStatus({
            data: { "m": "", "p": { "esId": 895, "baoKaoId": 2619297, "examStatus": 200 } }
        })
    });
    it('查询试卷问题列表', async function () {
        // http://stu.51bm.net.cn/api/m/auth/video/examination_paper_question_list.htm
    });
    it('认证是否是本人', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/video/attestPhoto.ws
        await stu.attestPhoto();
    });
    it('保存学生考试状态', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/student/log/saveStudentExamStatus.htm
        await stu.saveStudentExamStatus({
            data: { "m": "", "p": { "esId": 895, "baoKaoId": 2619297, "examStatus": 300 } }
        })
    });
    it('保存考试问题答案', async function () {
        // http://stu.51bm.net.cn/api/m/auth/video/save_examination_paper_question_result.htm
        // {"m":"","p":{"userAnswerId":1420,"questionId":97,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]}}
    });
    it('提交答卷', async function () {
        // http://stu.51bm.net.cn/api/m/auth/video/save_examination_paper_question_result_all.htm
        // {"m":"","p":{"paperResultList":[{"userAnswerId":1405,"questionId":64,"userQuestionAnswer":"C","xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1406,"questionId":70,"userQuestionAnswer":"C","xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1407,"questionId":65,"userQuestionAnswer":"C","xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1408,"questionId":358,"userQuestionAnswer":"D","xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1409,"questionId":354,"userQuestionAnswer":"D","xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1410,"questionId":123,"userQuestionAnswer":"C","xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1411,"questionId":90,"userQuestionAnswer":2,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1412,"questionId":86,"userQuestionAnswer":2,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1413,"questionId":87,"userQuestionAnswer":2,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1414,"questionId":112,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1415,"questionId":88,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1416,"questionId":150,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1417,"questionId":67,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1418,"questionId":95,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1419,"questionId":96,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1420,"questionId":97,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]},{"userAnswerId":1421,"questionId":111,"userQuestionAnswer":1,"xueXiaoId":"13166","kaoShiId":"12937","zhuanYeId":1223644,"esId":903,"baoKaoID":"2619414","simulationQuesIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421],"userAnswerIdList":[1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421]}]}}
    });
    it('提交论述题答案', async function () {
        // http://stu.51bm.net.cn/api/m/auth/video/commit_paper_by_union_mode.htm
        // {"m":"","p":{"xueXiaoId":"13166","subjectName":"美术理论进阶（客观题）","zhuanYeMC":"美术","photoAttachment":"http://art-video.artstudent.cn/img/demo/13166/1223644/903/fa59d13793f6484b93225af28f9586dd_uid1076183.jpg","baoKaoId":"2619414","yongHuID":"1076183","esId":903,"riChengId":11107838}}
    });
    it('保存学生考试状态(视频录制完成)', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/student/log/saveStudentExamStatus.htm
        await stu.saveStudentExamStatus({
            data: { "m": "", "p": { "esId": 895, "baoKaoId": 2619297, "examStatus": 300 } }
        })
    });
    it('保存学生考试状态(图片上传完成)', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/student/log/saveStudentExamStatus.htm
        await stu.saveStudentExamStatus({
            data: { "m": "", "p": { "esId": 895, "baoKaoId": 2619297, "examStatus": 400 } }
        })
    });
    it('保存学生考试状态(提交视频中)', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/student/log/saveStudentExamStatus.htm
        await stu.saveStudentExamStatus({
            data: { "m": "", "p": { "esId": 895, "baoKaoId": 2619297, "examStatus": 490 } }
        })
    });
    it('保存学生考试状态(提交视频完成)', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/student/log/saveStudentExamStatus.htm
        await stu.saveStudentExamStatus({
            data: { "m": "", "p": { "esId": 895, "baoKaoId": 2619297, "examStatus": 500 } }
        })
    });
    it('提交视频', async function () {
        // ***
        // http://stu.51bm.net.cn/api/m/auth/video/commitVideo.ws
        await stu.commitVideo({
            data: { "p": { "ticket": "oJ0neJmEMv$2VG1jOVBRPT07TlRjeE56VStOekF4TmpjPTs2Ng==", "esId": 895, "videoFileSize": 163965222, "svId": 2764, "kaoShengID": "246682", "baoKaoId": 2619414, "riChengId": 11107838, "shootTime": "1604578366610", "recordPhoto": "http://art-video.artstudent.cn/photo/demo/13166/1223644/895/8b4bca0f878f41a0b5957585df082062_uid1076183.jpg", "photoAttachment": "http://art-video.artstudent.cn/img/demo/13166/1223644/895/e7c69764aab24fbea53fc535c1c1cfab_uid1076183.jpg;http://art-video.artstudent.cn/img/demo/13166/1223644/895/372666e7c7ac4683a565d63c1a642e5d_uid1076183.jpg", "master": 1, "xueXiaoID": 13166, "stuVideoLength": "556", "shenFenZH": "330329", "yongHuID": 1076183, "videoUrl": "http://art-video.artstudent.cn/pr/demo/13166/1223644/895/54b3debdd81542679e68b1d9c94c3355_uid1076183.mp4", "zhuanYeId": 1223644, "supplement": "", "zhuanYeMC": "美术", "seId": "", "shootArea": " ", "subjectCode": "1", "subjectName": "美术理论（普通）" }, "m": "" }
        })
    });
});

describe('', async function () {

});