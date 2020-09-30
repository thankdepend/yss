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
 * 查询考试（考生用）
 * @param data
 * @param data.m 
 * @param data.p.xueXiaoID 学校id
 */
stu.getExamSite = async function () {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_exam_site.htm', params);
}

/**
 * 查询考点（考生用）
 */
stu.getSchoolSite = async function () {
    return common.sendPost(yssCaps.stu + '/api/m/auth/site/schoolSite/query.htm', params);
}



/**
 * 在线确认
 * @param data
 * @param data.m 
 * @param data.p.xueXiaoID 学校id
 */
stu.onlineAffirm = async function () {
    return common.sendPost(yssCaps.stu + '/api/m/auth/apply/query_other_platform_applydata.htm', params);
}