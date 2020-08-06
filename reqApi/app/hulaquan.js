const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');
const common = require('../../lib/common');

const hulaquan = module.exports = {};



/**
 * 初始化直播间
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {String} data.p.roomId 直播间id
 */
hulaquan.initChartRoom = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/v1/vcloud/v200309/initChartRoom.htm', params);
};

/**
 * 统计数据
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.roomId 直播间id
 */
hulaquan.getStatisticData = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/auth/v1/vcloud/statisticData.htm', params);
};

/**
 * 直播统计基础设置
 * @param {Number} roomId 房间id
 * @param {Number} totalNumBase 累计观看基数
 * @param {Number} reserveNumBase 预约基数
 * @param {Number} liveNumBase 实时在线基数
 */
hulaquan.staticsBaseSet = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/room/staticsBaseSet.htm', params);
};

/**
 * 查看直播间列表（客户端）
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.curPage 
 * @param {Number} data.p.pageSize 
 * @param {Number} data.p.categoryID 分类id
 */
hulaquan.queryRoomList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/v1/vcloud/v190620/queryRoomList.htm', params);
};

/**
 * 当前在线人数
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.curPage 
 * @param {Number} data.p.pageSize 
 * @param {Number} data.p.categoryID 分类id
 */
hulaquan.playbackOrMaxLook = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/auth/vcloud/statistics/playbackOrMaxLook.htm', params);
};