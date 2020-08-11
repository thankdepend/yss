const {
    common
} = require('../../lib/index');
// const format = require('../../../data/format');
const yssCaps = require('../../data/caps');
const httpRequest = require('../../lib/httpRequest')
const user = module.exports = {};


/**
 * 保存考生个人信息
 * @param {Object} data
 * @param {Number} data.p.zhengJianLX 证件类型 1二代身份证，2护照，3港澳台
 * @param {Number} data.p.shenFenZH 身份证号
 * @param {String} data.p.kaoShengXM 考生姓名
 * @param {String} data.p.xingBie 性别（中文）
 * @param {TimerHandler} data.p.chuShengRQ 出生日期
 * @param {String} data.p.minZu 民族（中文）
 * @param {Number} data.p.tongXinDZExt 通信地址ext
 * @param {String} data.p.tongXinDZ 通信地址
 * @param {Number} data.p.addressee 收件人
 * @param {Number} data.p.shouJi 手机
 * @param {Number} data.p.tongXinYB 通信邮编
 * @param {Number} data.p.jiaZhangDH 家长电话
 * @param {Number} data.p.qQ QQ号
 * @param {String} data.p.xueLi 学历（中文）
 * @param {Number} data.p.stuType 学生类型 1小学生，以此类推
 * @param {Number} data.p.gaoKaoSFH 高考省份编号
 * @param {String} data.p.gaoKaoSF 高考省份（中文）
 * @param {String} data.p.zhengZhiMM 政治面貌（中文）
 * @param {String} data.p.suoZaiXX 所在学校
 * @param {Number} data.p.kaoShengHao 考生号，需要学生类型为高中生stuType=3
 * @param {String} data.p.yingWangJie 应往届（中文）
 * @param {String} data.p.wenLiKe 文理科（中文）
 */
user.saveStuinfo = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.user + '/api/m/auth/user/save_stuinfo.htm', params);
};

/**
 * 获取用户信息
 * @param {Object} data 
 */
user.getStuinfo = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.user + '/api/m/auth/user/get_stuinfo.htm', params);
};

/**
 * 检查用户是否完善分数线
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 */
user.checkNeedFillScore = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.user + '/api/m/auth/unite/checkNeedFillScore.htm', params);
};