const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const eval = module.exports = {};



/**
 * 保存评画老师
 * @param {Number} teacherId 老师id
 * @param {String} teacherName 老师名称
 * @param {String} className 类别名称
 * @param {Number} classId 类别id
 * @param {String} profTag 专业标签
 * @param {String} profIds 专业id
 * @param {Number} baseModifyTimes 修改次数(预设值)
 * @param {Number} identityAuthFlag 认证标志
 * @param {Number} orderNo 排序字段
 * @param {String} introduction 老师简介
 * @param {String} detail 老师介绍
 */
eval.saveTeacher = async function (params = {}) {
    return common.evalPost(yssCaps.eval + '/auth/user/teacher/saveTeacher.htm', params);
};

/**
 * 获取评画老师类别列表
 * @param {Number} classId 类别id 
 * @param {String} className 类别名称
 * @param {Number} curPage 1
 * @param {Number} pageSize 15
 */
eval.getClassList = async function (params = {}) {
    return common.sendPost(yssCaps.eval + '/auth/base/profClass/loadProfClassData.htm', Object.assign({
        curPage: 1,
        pageSize: 15,
    }, params));
};

/**
 * 获取评画老师列表
 * @param {Number} teacherId 老师id
 * @param {Number} teacherName 老师姓名
 * @param {Number} userId 用户id 
 * @param {Number} classId 类别id
 * @param {Number} profId 专业id
 * @param {Number} identityAuthFlag 认证标志
 * @param {Number} curPage
 * @param {Number} pageSize
 */
eval.getTeacherList = async function (params = {}) {
    return common.sendPost(yssCaps.eval + '/auth/user/teacher/loadTeacherData.htm', Object.assign({
        curPage: 1,
        pageSize: 15,
    }, params));
};
