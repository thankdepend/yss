const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');
const {
    common
} = require('../../lib/index');

const stu = module.exports = {};



/**
 * 报名-院校搜索
 * @param {Object} data
 * @param {Object} data.m 
 * @param {Object} data.p.keyword
 * @param {Object} data.p.curPage
 * @param {Object} data.p.pageSize
 */
stu.seekCollege = async function (params = {}) {
    return common.post(yssCaps.stu + '/api/m/auth/college/v4/seekCollege.htm', Object.assign({
        data: {
            m: "",
            p: {
                curPage: 1,
                pageSize: 100
            }
        }
    }, params));
};

/**
 * 查询专业
 * @param {Object} data
 * @param {String} data.m
 * @param {String} data.p
 * @param {Number} data.p.xueXiaoID 学校id
 * @param {Array} data.p.baoKaoBZList 报考标志，[1、2、3]
 */
stu.getProf = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_prof.htm', params);
};

/**
 * 报名
 * @param data
 * @param data.m 
 * @param data.p.riChengID 日程id
 */
stu.saveProf = async function (params = {}) {
    return common.post(yssCaps.stu + '/api/m/auth/apply/save_prof.htm', params);
};

/**
 * 创建报名订单
 * @param {Object} data
 * @param {Object} data.m
 * @param {Object} data.p
 * @param {Number} data.p.xueXiaoID
 * @param {Array} data.p.baoKaoIDs
 * @param {Object} data.p.sIds
 */
stu.addProfOrder = async function (params = {}) {
    return common.post(yssCaps.stu + '/api/m/auth/apply/add_prof_order.htm', params)
}

/**
 * 查询考点(考生用)
 * @param data
 * @param data.m 
 * @param data.p.xueXiaoID 学校id
 */
stu.getExamSite = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_exam_site.htm', params);
}

/**
 * 查询院校考点(考生用)
 */
stu.getSchoolSite = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/site/schoolSite/query.htm', params);
}



/**
 * 在线确认
 * @param data
 * @param data.m 
 * @param data.p.xueXiaoID 学校id
 */
stu.onlineAffirm = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_other_platform_applydata.htm', params);
}

/**
 * 提交视频
 * @param {Object} data
 * @param {Object} data.m 
 * @param {Number} data.p.esId  考试专业科目id
 * @param {Number} data.p.baoKaoId 报考id
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.zhuanYeId 专业id
 * @param {String} data.p.zhuanYeMC 专业名称
 * @param {Number} data.p.subjectCode 科目代码
 * @param {String} data.p.subjectName 科目名称
 * @param {Number} data.p.kaoShengID 考生id
 * @param {Number} data.p.shenFenZH 身份证号
 * @param {String} data.p.videoUrl 视频地址
 * @param {Object} data.p.shootArea 录制视频所在地区
 */
stu.commitVideo = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/commitVideo.ws', params);;
}

/**
 * 查询考试专业列表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 */
stu.queryExamProf = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_exam_prof.htm', params);
}

/**
 * 查询考试承诺书
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Object} data.p.schId 学校id
 * @param {Object} data.p.examId 考试id
 * @param {Object} data.p.baoKaoID 报考id
 */
stu.queryExamPromise = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_exam_promise.htm', params);
}

/**
 * 查询考试须知
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.schId 学校id
 * @param {Number} data.p.examId 考试id
 * @param {Number} data.p.examPointId 考试得分id
 * @param {Number} data.p.profId 专业id
 */
stu.queryExamNotice = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_exam_notice.htm', params);
}

/**
 * 查询科目列表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.riChengID 日程id(小鱼也是这么传的....)
 * @param {Number} data.p.baoKaoId 报考id
 * @param {Number} data.p.simulation 是否为模拟 0为否，1为是
 */
stu.querySubjectVideoList = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/querySubjectVideoInfo.htm', params);
}

/**
 * 选考模式科目列表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {Number} data.p.riChengID 日程id
 */
stu.stuVideoSubjectList = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/stu_video_subject_list.htm', params);
}

/**
 * 科目详情
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {Number} data.p.xueXiaoId 学校id
 * @param {String} data.p.subjectName 学校id
 * @param {String} data.p.zhuanYeMC 专业名称
 * @param {String} data.p.esId 科目id
 * @param {String} data.p.riChengId 日程id
 * @param {String} data.p.baseRiChengId 基类日程id
 * @param {String} data.p.svId 视频id
 * @param {String} data.p.drawQuestion 抽题模式
 * @param {String} data.p.checkTimeType 检查时间类型 【1-校验看题开始时间 2-校验拍摄截止时间 3-校验提交视频开始时间】
 */
stu.checkTimeByType = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/check_time_by_type.htm', params);
}



/**
 * 变更考生考试状态
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {Number} data.p.esId 
 * @param {Number} data.p.baoKaoId 报考id
 * @param {Number} data.p.examStatus 考试状态{100:'进考场',200:'',}
 */
stu.saveStudentExamStatus = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/student/log/saveStudentExamStatus.htm', params);
}

/**
 * 保存总数
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {Number} data.p.esId 科目id
 * @param {Number} data.p.subjectName 科目名
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.updateNum 更新数
 */
stu.saveCount = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/saveCount.htm', params);
}

/**
 * 查询申请公告
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {Number} data.p.schId 学校id
 * @param {Number} data.p.examId 考试id
 * @param {Number} data.p.examPointId 考点id
 */
stu.queryApplyNotice = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_apply_notice.htm', params);
}

/**
 * 查询考试计划
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {Number} data.p.kaoShiKDID 学校id
 * @param {Number} data.p.applyMode 考试id
 * @param {Number} data.p.kaoShiID 考点id
 * @param {Number} data.p.xueXiaoID 学校id
 */
stu.queryExamSchedule = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_exam_schedule.htm', params);
}

/**
 * 查询其他平台报名数据
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p 
 * @param {Number} data.p.kaoShiKDID 学校id
 * @param {Number} data.p.applyMode 考试id
 * @param {Number} data.p.kaoShiID 考点id
 * @param {Number} data.p.xueXiaoID 学校id
 */
stu.queryOtherPlatformApplyData = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_other_platform_applydata.htm', params);
}

/**
 * 检查照片
 * @param {Object} data
 * @param {Object} data.p
 * @param {String} data.p.videoCode 视频码
 * @param {Number} data.p.esId 科目id
 * @param {String} data.p.attestUrl 照片url
 * @param {Number} data.p.svId 视频id
 * @param {Number} data.p.kaoShengID 考生id
 * @param {Number} data.p.baoKaoId 报考id
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.master 
 * @param {Number} data.p.xueXiaoID 学校id
 * @param {Number} data.p.retryTimes 重试时间
 * @param {String} data.p.shenFenZH 身份证
 * @param {Number} data.p.zhuanYeId 专业id
 * @param {Number} data.p.fileSize 文件大小
 * @param {String} data.p.zhuanYeMC 专业名称
 * @param {Number} data.p.seId
 * @param {Number} data.p.subjectCode 科目码
 * @param {String} data.p.subjectName 科目名称
 * @param {String} data.m
 */
stu.attestPhoto = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/attestPhoto.ws', params);
}

/**
 * 保存截图
 * @param {Object} data
 * @param {Object} data.p
 * @param {String} data.p.screenshotUrl 截图url
 * @param {Number} data.p.svId 视频id
 * @param {String} data.m
 */
stu.saveScreenshot = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/save_screenshot.ws', params);
}

/**
 * 清除录制状态
 * @param {Object} data
 * @param {Object} data.p
 * @param {Number} data.p.mirror 镜像
 * @param {Number} data.p.esId 科目id
 * @param {Number} data.p.simulation 是否模拟，1为正式
 * @param {Number} data.p.baoKaoId 报考id
 * @param {Number} data.p.master 1
 * @param {String} data.m
 */
stu.clearRecordStatus = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/v20201219/clear_record_status.ws', params);
}

/**
 * 开始录制
 * @param {Object} data
 * @param {Object} data.p
 * @param {Number} data.p.mirror 镜像
 * @param {Number} data.p.esId 科目id
 * @param {Number} data.p.simulation 是否模拟，1为正式
 * @param {Number} data.p.baoKaoId 报考id
 * @param {Number} data.p.master 1
 * @param {String} data.m
 */
stu.startRecord = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/v20201219/start_record.ws', params);
}



/**
 * 报考专业查询接口(所有)
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m 
 */
stu.queryExamProf = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_exam_prof.ws', params);
}

/**
 * 允许选择科目列表（选考模式使用）
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m 
 * @param {Number} riChengID 日程id
 */
stu.allowChooseSubject = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/allow_choose_subject.htm', params);
}

/**
 * 保存选择科目
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m 
 * @param {Number} riChengID 日程id
 */
stu.saveSubjectChoose = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/save_subject_choose.htm', params);
}

/**
 * 考生视频科目列表（正式考）
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m 
 * @param {Number} riChengID 日程id
 */
stu.saveSubjectChoose = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/stu_video_subject_list.htm', params);
}

/**
 * 检查辅机状态
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m 
 * @param {Number} data.p.esId 科目id
 * @param {Number} data.p.examWay 考试道路 1为录播，2为直播
 * @param {Number} data.p.simulation 1为模拟，2为正式
 */
stu.checkSlaveStatus = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/check_slave_status.htm', params);
}

/**
 * 辅机获取考试视频信息
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m 
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.baoKaoId 报考id
 * @param {Number} data.p.esId 科目id
 * @param {Number} data.p.svId
 * @param {Number} data.p.simulation 0为非模拟，1为模拟考
 */
stu.getExamVideoInfo = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/get_exam_video_info.htm', params);
}

/**
 * 改变辅机状态
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m 
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.examWay 考试方式，1为录播，2为直播
 * @param {Number} data.p.esId 科目id
 * @param {Number} data.p.videoCode 视频码
 * @param {Number} data.p.simulation 2为非模拟，1为模拟考
 * @param {Number} data.p.slaveStatus 辅机状态 1为开始录制，2为结束录制
 */
stu.changeSlaveStatus = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/change_slave_status.htm', params);
}

/**
 * 辅机检查主机视频上传
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m 
 * @param {Number} data.p.svId 
 * @returns {
 *    @param videoCode  null
 *    @param check  false
 * }
 */
stu.checkMasterVideoUpload = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/check_master_video_upload.htm', params);
}

/**
 * 检查考试时间
 * @param {Object} data
 * @param {String} data.p
 * @param {Object} data.m
 * @param {Number} data.p.subjectName 科目名称
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.esId 科目id
 */
stu.checkAllowToExam = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/check_allow_to_exam.htm', params);
}

/**
 * 提交考试试卷
 * @param {Number} xueXiaoId 学校id
 * @param {String} subjectName 科目名
 * @param {String} zhuanYeMC 专业名称
 * @param {String} photoAttachment 照片地址
 * @param {Number} baoKaoId 报考id
 * @param {Number} yongHuID 用户id
 * @param {Number} esId 科目id
 * @param {Number} riChengId 日程id
 */
stu.commitPaper = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/commit_paper_by_union_mode.htm', params);
}

/**
 * 提交考试试卷
 * @param {Object} data
 * @param {String} data.p
 * @param {String} data.p.videoCode 视频码
 * @param {String} data.p.ticket 
 * @param {Number} data.p.esId 科目id
 * @param {Number} data.p.videoFileSize 视频大小
 * @param {Number} data.p.svId 视频id
 * @param {Number} data.p.kaoShengID 考生id
 * @param {Number} data.p.baoKaoId 报考id
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.shootTime 拍摄时间
 * @param {String} data.p.recordPhoto 录制照片url
 * @param {String} data.p.photoAttachment  附加照片url
 * @param {Number} data.p.xueXiaoID 学校id
 * @param {Number} data.p.stuVideoLength 视频长度（秒）
 * @param {String} data.p.shenFenZH 身份证
 * @param {Number} data.p.yongHuID 用户id
 * @param {String} data.p.videoUrl 视频url
 * @param {Number} data.p.zhuanYeId 专业id
 * @param {String} data.p.supplement
 * @param {String} data.p.zhuanYeMC 专业名称
 * @param {Number} data.p.seId
 * @param {String} data.p.shootArea
 * @param {Number} data.p.subjectCode 科目编号
 * @param {String} data.p.subjectName 科目名称
 * @param {String} data.m
 */
stu.commitVideo = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/commitVideo.ws', params);
}

/**
 * 保存报名登记表信息
 * @param {Number} userId 用户id
 * @param {String} userName  用户名
 * @param {Number} schoolId  学校id
 * @param {String} schoolName 学校名
 * @param {Number} examId   考试id
 * @param {String} examName  考试名称
 * @param {Number} pointId   考点id
 * @param {String} pointName 考点名
 * @param {Number} profId  专业id
 * @param {String} profName 专业名
 * @param {String} registrationFormUrl 注册表单url
 * @param {Number} baoKaoId 报考id
 */
stu.saveRegistrationForms = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/v210316/save_registration_forms.ws', params);
}

/**
 * 查询报名登记表信息
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.baoKaoId 报考id
 */
stu.queryRegistrationForms = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/v210316/query_registration_forms.ws', params);
}