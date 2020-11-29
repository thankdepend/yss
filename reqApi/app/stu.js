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
 * @param {Array} data.p.baoKaoBZList 报考标志，1、2、3
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
stu.querySubjectVideoInfo = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/querySubjectVideoInfo.htm', params);
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
 * @param {Number} data.p.esId 
 * @param {Number} data.p.subjectName 科目名
 * @param {Number} data.p.riChengId 日程id
 * @param {Number} data.p.updateNum 更新数
 */
stu.querySubjectVideoInfo = async function (params = {}) {
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
 * @param {*} esId 科目id
 * @param {*} attestUrl
 * @param {*} svId
 * @param {*} kaoShengID
 * @param {*} baoKaoId
 * @param {*} riChengId
 * @param {*} master
 * @param {*} xueXiaoID
 * @param {*} retryTimes
 * @param {*} shenFenZH
 * @param {*} zhuanYeId
 * @param {*} fileSize
 * @param {*} zhuanYeMC
 * @param {*} seId
 * @param {*} subjectCode
 * @param {*} subjectName
 */
stu.attestPhoto = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/attestPhoto.ws', params);
}

/**
 * 提交视频
 * @param {*} esId
 * @param {*} videoFileSize
 * @param {*} svId
 * @param {*} kaoShengID
 * @param {*} baoKaoId
 * @param {*} riChengId
 * @param {*} shootTime
 * @param {*} recordPhoto
 * @param {*} photoAttachment
 * @param {*} master
 * @param {*} xueXiaoID
 * @param {*} stuVideoLength
 * @param {*} shenFenZH
 * @param {*} yongHuID
 * @param {*} videoUrl
 * @param {*} zhuanYeId
 * @param {*} supplement
 * @param {*} zhuanYeMC
 * @param {*} seId
 * @param {*} shootArea
 * @param {*} subjectCode
 * @param {*} subjectName
 */
stu.commitVideo = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/commitVideo.ws', params);
}


/**
 * 检查考试时间到没到
 * @param {String} subjectName 科目名称
 * @param {Number} riChengId 日程id
 * @param {Number} esId 科目id
 */
stu.checkAllowToExam = async function (params = {}) {
    return common.sendPost(yssCaps.stu + '/api/m/auth/video/check_allow_to_exam.htm', params);
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




