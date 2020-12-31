const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const examvideo = module.exports = {};


/**
 * 获取考生考试结果
 * @param {Number} showSubject 1
 * @param {Number} showSchedule 1
 * @param {Number} kaoShiID 考试id
 * @param {Number} kaoDianID 考点id
 * @param {Number} riChengId 日程id
 * @param {Number} riChengID 日程id
 * @param {Number} esId 科目id
 * @param {Number} videoLengthComPare 主辅机录制时长
 * @param {Number} commitFlag 视频提交状态
 * @param {Number} paperCommitFlag 考卷提交状态
 * @param {Number} stuIDCard 考生证件号
 * @param {Number} stuIDCard 考生证件号
 * @param {Number} stuName 考试姓名
 * @param {Number} zhunKaoZH 准考证号
 * @param {Number} curPage 1
 * @param {Number} pageSize 15
 */
examvideo.getExaminerAssignDetailList = async function (params = {}) {
    return common.sendPost(yssCaps.examvideo + '/auth/school/assignDetail/loadExaminerAssignDetailData.htm', Object.assign({
        curPage: 1,
        pageSize: 15,
    }, params));
};