const {
    common
} = require("../../lib/index");

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
 * @param {*} profID
 */
wish.saveAbroadSchool = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/abroadSchool/saveAbroadSchool.htm', params);
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
 * 保存院校类别
 * @param {Number} typeFlag 类别标志
 * @param {Number} typeID 类别id
 * @param {String} typeName 院校类型名称
 * @param {Number} ord 排序id
 */
wish.saveWishschooltype = async function (params = {}) {
    return common.sendPost(yssCaps.wish + '/auth/wish/wishschooltype/doSave.htm', params);
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