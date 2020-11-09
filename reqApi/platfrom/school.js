// const common = require('../../../lib/common');
const httpRequest = require('../../lib/httpRequest')
const { common } = require('../../lib/index')
const yssCaps = require('../../data/caps');

const school = module.exports = {};


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
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examProf/saveExamProfAdd.htm', params);
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
    return httpRequest.sendPost(yssCaps.school + '/auth/school/sitemanager/saveExamSite.htm', params);
};



/**
 * 保存报考须知
 * @param {*} sysCtrolId 
 * @param {*} examId 考试id
 * @param {*} examPointId 0
 * @param {Number} profId 专业id
 * @param {String} defValue 正文
 * @param {*} remark 须知类型，5为承诺书
 */

school.saveApplyNotice = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost(yssCaps.school + '/auth/school/applynotice/saveApplyNotice.htm', params);
};

/**
 * 查询报考须知列表
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */

school.applyNoticeList = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost(yssCaps.school + '/auth/school/applynotice/applyNoticeData.htm', params);
};

/**
 * 保存不允许日期冲突
 * @param {number} kaoShiID 考试id
 * @param {number} isSchedConflict 0为是，1为否
 */
school.saveSchedConflict = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examschedule/saveSchedConflict.htm', params);
};

/**
 * 保存允许跨考点考试
 * @param {number} kaoShiID 考试id
 * @param {number} isCrossPiont 1为是，2为否
 */
school.saveCrossPiont = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examschedule/saveCrossPiont.htm', params);
};

/**
 * 相同考试专业是否可重报
 * @param {number} kaoShiID 考试id
 * @param {number} isCrossPiont 1为是，2为否
 */
school.saveCrossPiont = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examschedule/saveCrossPiont.htm', params);
};

/**
 * 保存相同考试专业是否可重报
 * @param {number} kaoShiID 考试id
 * @param {number} isProfReject 1为是，2为否
 */
school.saveProfReject = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examschedule/saveProfReject.htm', params);
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
    return httpRequest.sendPost(yssCaps.school + '/auth/school/ticketarrange/examScheduleData.htm', params);
};

/**
 * 生成准考证
 * @param {number} riChengID 日程id
 * @param {number} ticketlen 准考证长度
 * @param {number} num 准考证个数
 * @param {number} ticketNoticeNum 准考证取号预警数
 */
school.generateTicket = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/school/ticketarrange/generate.htm', params);
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
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examprofsubject/saveExamProfSub.htm', params);
};

/**
 * 查询专业考试科目详情
 * @param {number} kaoShiID 考试id
 */
school.examProfgetDetail = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/util/examProf.htm', params);
};

/**
 * 查询专业考试科目列表
 * @param {number} curPage 页数
 * @param {number} pageSize 每页个数
 * @param {number} kaoShiID 考试id
 * @param {number} zhuanYeID 专业id
 */
school.examProfgetList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examprofsubject/examProfSubData.htm', params);
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
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examprofsubject/saveSubjectInfo', params);
};

/**
 * 保存试卷题目
 * @param {Number} questionId 问题id
 * @param {Number} paperIdVal:
 * @param {Number} questionName 问题名称
 * @param {Number} questionAnswer 答案
 * @param {Number} questionType 问题类型，1为单选，2为多选，3为判断，4为简答
 * @param {Number} paperId 试卷id
 * @param {String} paperName 考卷名 
 * @param {Number} orderNum 排序号
 * @param {Array} questionItemJson 问题json
 * @param {String} questionItemJson[obj.option] 问题选项
 * @param {String} questionItemJson[obj.description] 问题简述
 */
school.saveExaminationPaperQuestion = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examinationPaperQuestion/saveExaminationPaperQuestion.htm', params);
};

/**
 * 保存试卷题目
 * @param {Number} esId 科目id
 * @param {Number} kaoShizyID 考试专业id
 * @param {Number} examMode 考试模式[1:视频录制模式，2:监考笔试模式,3:直播面试模式,4:客观题模式,5:仅提交作品]
 * @param {String} subjectName 科目名称
 * @param {Number} showQuesMode 
 * @param {Number} shootLimitType 拍摄限制
 * @param {Number} maxShootCount 拍摄次数限制
 * @param {Number} maxSaveCount 最大保存次数
 * @param {Number} allowStuExplain 
 * @param {*} attachmentExplain
 * @param {Number} allowAttachment 图片上传个数
 * @param {String} picExplain 图片上传说明
 * @param {Number} externalDeviceCheck 外部设备检测[1为检测，2为关闭]
 * @param {Number} commitPaperPre 提前交卷开关[1为允许，2为不允许]
 * @param {Number} localStoreFlag 本地视频上传[1为不允许，2为允许]
 * @param {Number} subjectTotalScore 科目总分
 * @param {Number} riChengID 日程id
 * @param {*} kaoShiRQSM
 * @param {Number} ord 科目序号
 * @param {Number} videoLength 时长总（秒 ）
 * @param {Number} minute 时长（分）
 * @param {Number} second 时长（秒）
 * @param {String} timeExplain 考试时长说明
 * @param {Number} screenStatus 
 * @param {Number} definition
 * @param {Number} cameraDirection 拍摄方向
 * @param {Number} sampleType
 * @param {*} examiningTime
 * @param {Number} drawQuesLimit
 * @param {Number} localVideoUploadFlag 本地视频上传标志[1为允许，2为不允许]
 * @param {Number} clientUploadFlag 客户端上传标志[1为允许，2为不允许]
 * @param {Number} showStatus 
 * @param {String} webUploadVedioStartTime 电脑端上传考卷开始时间
 * @param {String} webUploadVedioEndTime 电脑端上传考卷结束时间
 * @param {String} checkStartTime 检录开始时间
 * @param {String} showQuesStartDate 审题开始时间
 * @param {String} closeQuesDate 关闭考题时间
 * @param {String} shootStartDate 录制开始时间
 * @param {String} shootEndDate 录制结束时间
 * @param {String} commitPaperEndDate 提交答卷截止时间
 * @param {String} commitVideoStartDate 提交视频开始时间
 * @param {String} videoTempUrl 样例视频
 * @param {String} examDirectUrl 考试指令
 * @param {String} randomDirectUrl 随机指令
 * @param {String} randomContent 随机文案
 * @param {Number} randomDirectTimeMinutes 随机分钟
 * @param {Number} randomDirectTimeSeconds 随机秒数
 * @param {Number} timeOrder 播放时间顺序[1为顺序，2为倒序]
 * @param {String} examContent 考试内容
 * @param {String} videoListTip 录制说明
 * @param {String} examExplain 考试说明
 * @param {String} shootExamPromise 考生承诺书
 */
school.saveSubjectInfo = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examprofsubject/saveSubjectInfo.htm', params);
};

/**
 * 考试列表工具
 * @param {number} 
 * @param {number} 
 * @param {number} 
 * @param {number} 
 */
school.utilExamList = async function (params = {}) {
    return common.sendGet(yssCaps.school + '/api/m/auth/school/client/util/examList.htm', params);
};

/**
 * 文本生成语音
 * @param {Number} esId 科目id
 * @param {String} convertTextStr 文本字符
 * @param {String} waitSecondsStr 等待时间 '1,2'
 */
school.getTextConvertAudioUrl = async function (params = {}) {
    return common.sendGet(yssCaps.school + '/auth/school/examprofsubject/getTextConvertAudioUrl.htm', params);
};

