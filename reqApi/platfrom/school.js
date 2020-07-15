// const common = require('../../../lib/common');
const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const school = module.exports = {};


/**
 * 添加考点
 * @param {Number} kaoDianID 考点id
 * @param {String} kaoDianJC 考点简称
 * @param {String} kaoDianQC 考点全程 
 * @param {String} kaoDianSZSFMC 考点省份名称
 * @param {Number} kaoDianSZSF  考点省份编号
 * @param {String} kaoDianSZSMC 考点城市名称
 * @param {Number} kaoDianSZS 考点城市编号
 * @param {String} kaoDianSZQMC 考点区名称
 * @param {Number} kaoDianSZQ 考点区编号
 * @param {String} kaoDianDZ 地址
 * @param {Number} longitude 经度
 * @param {Number} latitude 纬度
 * @param {Number} checkType
 */
school.saveSite= async function (params = {}) {
    return httpRequest.sendPost( yssCaps.base + '/auth/school/site/doAddSite.htm' ,params);
};

/**
 * 查看考点列表
 * @param {*} pageSize 15
 * @param {*} kaoDianQC 考点全称
 * @param {*} curPage 1
 */
school.getsiteInfoList= async function (params = {}) {
    return httpRequest.sendPost( yssCaps.base + '/auth/school/site/siteInfoData.htm' ,Object.assign({curPage:1,pageSize:15},params));
};


/**
 * 保存考试
 * @param {*} kaoShiID 考试id 
 * @param {*} kaoShiMC 考试名称
 * @param {*} kaoShiND 考试年份
 * @param {*} kaoShiYF 考试月份
 * @param {*} xianKaoZYS 限考志愿数
 * @param {*} zhiYuanShu 志愿专业数
 * @param {*} kaiTongBZ 开通标志 1为开通2为不开通
 */
school.saveExam= async function (params = {}) {
    return httpRequest.sendPost( yssCaps.base + '/auth/school/exam/saveExam.htm' ,params);
};

/**
 * 查看考试列表
 * @param {number} kaoShiND 考试年份 
 * @param {Array} sortList []
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */
school.getExamList = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.base + '/auth/school/exam/examListData.htm' , Object.assign({curPage:1,pageSize:15},params));
};

/**
 * 保存考试专业
 * @param {*} sysControl 
 * @param {*} examProfTypeID_IN 
 * @param {*} kaoShiID 考试id
 * @param {*} profTypeId 
 * @param {*} profType 
 * @param {*} zhuanYeID 专业id
 */
school.saveExamProfAdd = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examProf/saveExamProfAdd.htm' ,params);
};

/**
 * 查看考试专业列表
 * @param {number} kaoShiID 考试id 
 * @param {Array} zhuanYeID 专业id  
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */
school.getExamProfList = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.base + '/auth/school/examProf/examProfListData.htm' , Object.assign({curPage:1,pageSize:15},params));
};

/**
 * 保存报名时间
 * @param {*} kaoShiKDID 
 * @param {*} kaoDianIDs  
 * @param {*} kaoShiID 考试id
 * @param {*} kaoDianID 考点id
 * @param {*} visible 该考点是否只在省考点显示报名入口 0为是1为否
 * @param {*} xianKaoZYS 专业id
 * @param {*} wangBaoKSSJ 网上报名时间
 * @param {*} wangBaoJSSJ 网上截止报名时间
 * @param {*} wangShangQRKSSJ 网上确认时间
 * @param {*} wangShangQRJSSJ 网上截止确认时间
 */

school.saveExamSite = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost( yssCaps.school + '/auth/school/sitemanager/saveExamSite.htm' ,params);
};

/**
 * 查看报名时间列表
 * @param {number} kaoShiID 考试id 
 * @param {Array} kaoDianID 考点id  
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */
school.getsiteDataList = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.base + '/auth/school/sitemanager/siteData.htm' ,params);
};

/**
 * 保存考试时间
 * @param {*} kaoShiID 考试id
 * @param {*} kaoDianID 考点id
 * @param {*} zhuanYeID 专业id
 * @param {*} shenChaBTF 审查标志，2为不审查
 * @param {*} xianKaoZYS 专业id
 * @param {*} kaoShiRQ 考试日期
 * @param {*} examStartTime 考试开始时间
 * @param {*} examEndTime 考试结束时间
 * @param {*} kaoShiRQSM 考试日期简称
 * @param {*} baoMingFei 报名费
 * @param {*} orderNo 显示序号
 * @param {*} xianBaoRS 限报人数
 * @param {*} zhiYuanShu 志愿数
 * @param {*} beiZhu 考试科目时间说明
 * @param {*} zhunKaoZZDY 准考证说明
 * @param {*} videoUploadStartTime
 * @param {*} videoUploadEndTime
 * @param {*} countdownLength 考试时间
 * @param {*} allowSimulation 是否允许模拟，1为是，2为否
 * @param {*} limitOfgender 性别要求，3为不限
 * @param {*} language 新疆考生计划类型 0为不限
 */

school.saveExamSchedule = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examschedule/saveExamSchedule.htm' ,params);
};

/**
 * 查看考试时间列表
 * @param {number} kaoShiID 考试id 
 * @param {Array} kaoDianID 考点id  
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */
school.getExamScheduleList= async function (params = {}) {
    return httpRequest.sendPost( yssCaps.base + '/auth/school/examschedule/examScheduleData.htm' ,params);
};

/**
 * 保存报考须知
 * @param {*} sysCtrolId 
 * @param {*} examId 考试id
 * @param {*} examPointId 0
 * @param {*} profId 0
 * @param {*} defValue 正文
 * @param {*} remark 须知类型，5为承诺书
 */

school.saveApplyNotice = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost( yssCaps.school + '/auth/school/applynotice/saveApplyNotice.htm' ,params);
};

/**
 * 查询报考须知列表
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */

school.applyNoticeList = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost( yssCaps.school + '/auth/school/applynotice/applyNoticeData.htm' ,params);
};

/**
 * 保存不允许日期冲突
 * @param {number} kaoShiID 考试id
 * @param {number} isSchedConflict 0为是，1为否
 */
school.saveSchedConflict = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examschedule/saveSchedConflict.htm' ,params);
};

/**
 * 保存允许跨考点考试
 * @param {number} kaoShiID 考试id
 * @param {number} isCrossPiont 1为是，2为否
 */
school.saveCrossPiont = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examschedule/saveCrossPiont.htm' ,params);
};

/**
 * 相同考试专业是否可重报
 * @param {number} kaoShiID 考试id
 * @param {number} isCrossPiont 1为是，2为否
 */
school.saveCrossPiont = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examschedule/saveCrossPiont.htm' ,params);
};

/**
 * 保存相同考试专业是否可重报
 * @param {number} kaoShiID 考试id
 * @param {number} isProfReject 1为是，2为否
 */
school.saveProfReject = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examschedule/saveProfReject.htm' ,params);
};

/**
 * 查询准考证规则列表
 * @param {number} riChengID 日程id
 * @param {number} hasTicket false
 * @param {number} prefix 前缀
 * @param {number} len 准考证长度
 * @param {number} startNum 初始号
 * @param {number} ticketNoticeNum 准考证取号预警数
 */
school.saveTicketRule = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/ticketarrange/examScheduleData.htm' ,params);
};

/**
 * 生成准考证
 * @param {number} riChengID 日程id
 * @param {number} ticketlen 准考证长度
 * @param {number} num 准考证个数
 * @param {number} ticketNoticeNum 准考证取号预警数
 */
school.generateTicket = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/ticketarrange/generate.htm' ,params);
};

/**
 * 保存专业考试科目
 * @param {Array} examProfSubject 日程id
 * @param {number} examProfSubject.kaoShiID 考试id
 * @param {number} examProfSubject.profId 
 * @param {number} examProfSubject.ord     1为专业考试科目，2为网络考试科目
 * @param {number} examProfSubject.subjectName 科目名称
 * @param {string} examProfSubject.remark 备注
 * @param {number} examProfSubject.shootFlag
 * @param {Array} examProfSubject.shootType
 * @param {string} examProfSubject.scoreScanStr
 * @param {number} examProfSubject.calculateMode 模式，1为专业考试科目，2为网络考试科目
 */
school.saveExamProfSub = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examprofsubject/saveExamProfSub.htm' ,params);
};

/**
 * 查询专业考试科目详情
 * @param {number} kaoShiID 考试id
 */
school.examProfgetDetail = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/util/examProf.htm' ,params);
};

/**
 * 查询专业考试科目列表
 * @param {number} curPage 页数
 * @param {number} pageSize 每页个数
 * @param {number} kaoShiID 考试id
 * @param {number} zhuanYeID 专业id
 */
school.examProfgetList = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examprofsubject/examProfSubData.htm' ,params);
};

/**
 * 保存专业考试科目
 * @param {number} esId 日程id
 * @param {number} kaoShizyID 考试志愿id
 * @param {number} ord  1
 * @param {number} videoLength  视频长度(单位秒)
 * @param {number} minute 视频长度(单位分钟)
 * @param {number} second 
 * @param {String} timeExplain 时长说明
 * @param {number} screenStatus 1
 * @param {number} definition 3
 * @param {number} cameraDirection 1
 * @param {number} sampleType 0
 * @param {number} examiningTime 
 * @param {number} examMode 1
 * @param {String} subjectName 科目名称
 * @param {number} shootLimitType 2
 * @param {number} maxShootCount 20
 * @param {number} maxSaveCount 3
 * @param {number} allowStuExplain 0
 * @param {number} allowAttachment 0
 * @param {number} showQuesMode 0
 * @param {number} subjectTotalScore 分数上限
 * @param {String} examContent 考试内容
 * @param {String} examExplain 考试说明
 * 
 */
school.saveSubjectInfo = async function (params = {}) {
    return httpRequest.sendPost( yssCaps.school + '/auth/school/examprofsubject/saveSubjectInfo' ,params);
};