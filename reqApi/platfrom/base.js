const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const base = module.exports = {};

/**
 * 添加院校
 * @param {*} params 
 */
base.toAddCollege = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/admin/college/toAddCollege.htm', params);
};


/**
 * 编辑院校
 */
base.doEditCollege = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/admin/college/doEditCollege.htm', params);
};


/**
 * 获取院校列表
 * @param xueXiaoMC 学校名称 
 * @param xueXiaoMH 院校代码
 * @param schoolType 学校类型 1已签约、2未签约、3其他
 * @param curPage
 * @param pageSize 
 */
base.getCollegeList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/admin/college/collegeListData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};


/**
 * 获取院校专业列表
 */
base.getGbProfClass = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/profession/getGbProfClass.htm', params);
};

/**
 * 获取志愿专业编号
 */
base.getZhuanYeBH = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/profession/getZhuanYeBH.htm', params);
};

/**
 * 保存院校常用专业库
 * @param {Number} zhuanYeBH 专业编号
 * @param {Number} cengJiMC 成绩名称
 * @param {Number} zhuanYeCJ 1
 * @param {Number} fuZhuanYe 0 副专业
 * @param {Number} zhuanYeID 专业id
 * @param {Number} zhuanYeMC 专业名称
 * @param {Number} guoBiaoDM_IN 国标
 */

base.saveBacthProfession = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/profession/saveBacthProfession.htm', params);
};

/**
 * 查询院校常用专业库列表
 * @param {Number} year 年份
 * @param {Number} currentFlag 
 * @param {String} zhuanYeMC 
 * @param {Number} curPage 页数
 * @param {Number} pageSize  每页展示
 */
base.getprofessionInfoList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/profession/professionInfoData.htm', params);
};

/**
 * 查看考试专业列表
 * @param {number} kaoShiID 考试id 
 * @param {Array} zhuanYeID 专业id  
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */
base.getExamProfList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/examProf/examProfListData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/**
 * 查看考试列表
 * @param {number} kaoShiND 考试年份 
 * @param {Array} sortList []
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */
base.getExamList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/exam/examListData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};


/**
 * 查看报名时间列表
 * @param {number} kaoShiID 考试id 
 * @param {Array} kaoDianID 考点id  
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */
base.getsiteDataList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/sitemanager/siteData.htm', params);
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

base.saveExamSchedule = async function (params = {}) {
    // return httpRequest.sendPost({api: yssCaps.login_url + '/' + 'login', body: params});
    return httpRequest.sendPost(yssCaps.school + '/auth/school/examschedule/saveExamSchedule.htm', params);
};

/**
 * 查看考试时间列表
 * @param {number} kaoShiID 考试id 
 * @param {Array} kaoDianID 考点id  
 * @param {number} curPage 页数
 * @param {number} pageSize 每页数
 */
base.getExamScheduleList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/examschedule/examScheduleData.htm', params);
};

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
base.saveSite = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/site/doAddSite.htm', params);
};

/**
 * 查看考点列表
 * @param {*} pageSize 15
 * @param {*} kaoDianQC 考点全称
 * @param {*} curPage 1
 */
base.getsiteInfoList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/site/siteInfoData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
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
base.saveExam = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.base + '/auth/school/exam/saveExam.htm', params);
};