const { common } = require("../../lib/index");
const yssCaps = require('../../data/caps');
const wish = module.exports = {};

/**
 * 保存留学院校
 * @param {*} mainPicture 图片字符串（多图以，分割）
 * @param {*} srviceTypeIDs 
 * @param {*} chinaSrviceTypeIDs
 * @param {*} tagNames
 * @param {String} profIDs 专业id列表
 * @param {*} enrollRequire
 * @param {*} enrollTargets
 * @param {*} profCategorys
 * @param {*} budgets
 * @param {Number} schoolID 学校id
 * @param {*} insertFlag
 * @param {Number} schoolCode 学校编码
 * @param {String} englishName 英文名称
 * @param {String} schoolName 学校名称
 * @param {String} hotOrder 院校排序
 * @param {String} showOrder 列表排序
 * @param {Number} groupID 圈子id
 * @param {Number} extOrder 热门院校排序
 * @param {Number} extHotFlag 国外院校列表标记
 * @param {String} logo 图片
 * @param {Number} attribute 办学属性id
 * @param {String} sellingPoint 卖点
 * @param {Number} internatRanking 国际排名
 * @param {Number} profRanking 专业排名
 * @param {Number} countryID 国别id
 * @param {String} countryName 国别名称
 * @param {*} labelList 
 * @param {*} locate
 * @param {*} admissionCall
 * @param {*} onlineConsult
 * @param {*} enrollTarget
 * @param {*} profCategory
 * @param {Number} budget
 * @param {*} basicInfo
 * @param {*} lodgCondit
 * @param {Number} hotFlag
 * @param {*} recommendOrder
 * @param {*} enrollBase
 * @param {*} enrollStartTime
 * @param {*} enrollEndTime
 * @param {*} baseSub
 * @param {*} status
 * @param {*} applicatStatus
 * @param {*} applicatCondit
 * @param {*} chinaGainPlanUrl
 * @param {*} applicateUrl
 * @param {String} costReference 直申费用参考
 * @param {Number} chinaExamStatus 中国区选拔考试 1为启用，2为禁用
 * @param {String} chinaApplicatCondit 中国区选拔申请
 * @param {String} chinaCostReference 中国区选拔费用参考
 * @param {Number} profLabelType 专业标签类型,1为选择，2为填写
 * @param {Number} profID
 */
wish.saveAbroadSchool = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/abroadSchool/saveAbroadSchool.htm', params);
};

/**
 * 删除留学院校
 * @param {Number} schoolID 
 */
wish.deleteAbroadSchool = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/abroadSchool/deleteAbroadSchool.htm', params);
};


/**
 * 查询留学院校列表
 * @param {Number} profID 专业id
 * @param {Number} schoolID 学校id
 * @param {String} englishName 英语名称
 * @param {String} likeSchoolName 学校名称模糊搜索
 * @param {Number} attribute 办学属性
 * @param {Number} countryID 国别id
 * @param {Number} curPage
 * @param {Number} pageSize
 */
wish.abroadSchoolList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/abroadSchool/loadAbroadSchoolData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params))
};


/**
 * 保存留学专业
 * @param {Number} profID 专业ID
 * @param {Number} profLevel 专业等级
 * @param {Number} paProfID 父级专业ID
 * @param {String} paProfName 父级专业名称
 * @param {Number} paProfCode 父级编码 
 * @param {Number} profCode 专业编码
 * @param {String} profName 专业名称
 */
wish.saveAbroadProf = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/abroadProf/saveAbroadProf.htm', params)
};

/**
 * 删除留学专业
 * @param {Number} profID 专业ID
 */
wish.deleteAbroadProf = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/abroadProf/deleteAbroadProf.htm', params)
};

/**
 * 查询留学专业列表
 * @param {Number} profLevel 专业等级
 * @param {String} profCode 专业编码
 * @param {String} profName 专业名称
 * @param {Number} curPage
 * @param {Number} pageSize
 */
wish.abroadProfList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/abroadProf/loadAbroadProfData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params))
};

/**
 * 保存留学院校类别
 * @param {Number} typeFlag 类别标志
 * @param {Number} typeID 类别id
 * @param {String} typeName 院校类型名称
 * @param {Number} ord 排序id
 */
wish.saveWishschooltype = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/wishschooltype/doSave.htm', params);
};

/**
 * 删除留学院校类别
 * @param {Number} typeID 类别id
 */
wish.deleteWishschooltype = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/wishschooltype/doDelete.htm', params);
};

/**
 * 院校类别列表
 * @param {Number} likeTypeName 院校类型名称
 * @param {Number} typeFlag 选择标记类别
 * @param {Number} curPage
 * @param {Number} pageSize
 */
wish.doWishSchoolTypeList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/wishschooltype/doWishSchoolTypeData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/**
 * 保存院校资讯分类
 * @param {Number} infoTypeID 资讯类型ID
 * @param {String} infoTypeName 资讯类型名称
 * @param {Number} schoolID 学校ID
 * @param {Number} showInGuide 是否展示在指南[1是，2否]
 * @param {Number} showOrder 排序编号
 * @param {Number} shown 是否显示[1是，2否]
 * @param {String} description 描述
 */
wish.saveSchoolInfoType = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolInfoType/saveSchoolInfoType.htm', params);
};

/**
 * 删除院校资讯分类
 * @param {Number} infoTypeID 资讯类型ID
 */
wish.deleteSchoolInfoType = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolInfoType/deleteSchoolInfoType.htm', params);
};

/**
 * 院校资讯分类列表
 * @param {String} infoTypeName 咨询类别名称
 * @param {Number} schoolID 学校ID
 * @param {Number} curPage
 * @param {Number} pageSize
 */
wish.schoolInfoTypeList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolInfoType/loadSchoolInfoTypeData.htm', params);
};

/**
 * 保存院校资讯
 * @param {Number} schoolInfoID 院校资讯ID
 * @param {Number} saveType 保存类型[默认值1]
 * @param {Number} schoolID 学校ID
 * @param {Number} infoTypeID 资讯类型ID
 * @param {Number} infoID 资讯ID
 * @param {String} infoTitle 资讯标题
 * @param {Number} infoIDCheckbox 【不知道干嘛的，与infoIdListString保持一致】
 * @param {Number} infoIdListString 资讯ID
 * @param {Number} topFlag 停用标志[默认为空]
 */
wish.saveSchoolInfo = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolInfo/saveSchoolInfo.htm', params);
};

/**
 * 删除院校资讯
 * @param {Number} schoolInfoID 院校资讯ID
 */
wish.deleteSchoolInfo = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolInfo/deleteSchoolInfo.htm', params);
};

/**
 * 院校资讯列表
 * @param {Number} schoolID 学校ID
 * @param {Number} infoID 资讯ID
 * @param {String} infoTitle 资讯标题
 * @param {String} releaseTimeStart 发布开始时间
 * @param {String} releaseTimeEnd 发布结束时间
 * @param {Number} curPage 页数
 * @param {Number} pageSize 每页个数
 */
wish.schoolInfoList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolInfo/loadSchoolInfoData.htm', params);
};

/**
 * 院校筛选列表
 * @alias 没有参数
 */
wish.listForSelector = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolBase/listForSelector.htm', params);
};

/**
 * 查询资讯列表
 * @param {String} infoTitle 资讯标题
 */
wish.queryHlqInfoList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolInfo/queryHlqInfoList.htm', params);
};

/**
 * 意向用户管理列表
 * @param {String} userName 用户名
 * @param {String} willCountry 意向国家
 * @param {Number} studyBudget  留学预算
 * @param {Number} consultGrade 意愿等级
 * @param {Number} signType 是否签约[1是，2否]
 * @param {Number} curPage
 * @param {Number} pageSize
 */
wish.studycollectList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/util/abroad/studycollect/loadStudycollectData.htm', params);
};

/**
 * 研究生留学国家列表
 * @param {Number} countryId 国家id
 * @param {String} countryName 国家名称
 * @param {Number} curPage 1
 * @param {Number} pageSize 15
 */
wish.loadAbroadCountryData = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/abroad/abroadCountry/loadAbroadCountryData.htm', params);
};

/**
 * 计划外专业类别列表
 * @param {Number} typeId 类别ID
 * @param {String} typeName 类别名称
 * @param {Number} curPage 1
 * @param {Number} pageSize 15
 */
wish.schoolOutOfPlanTypeList = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/schoolOutOfPlanType/loadSchoolOutOfPlanTypeData.htm', params);
};

