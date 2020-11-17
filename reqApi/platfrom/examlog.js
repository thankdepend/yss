const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const examlog = module.exports = {};


/**
 * 获取考生进程统计
 * @param {Number} teacherId 老师id
 * @param {Number} teacherName 老师姓名
 * @param {Number} userId 用户id 
 * @param {Number} classId 类别id
 * 
 */
examlog.getStudentStateDataList = async function (params = {}) {
    return common.sendPost(yssCaps.examlog + '/auth/examLog/studentState/loadStudentStateData.htm', Object.assign({
        curPage: 1,
        pageSize: 15,
    }, params));
};


