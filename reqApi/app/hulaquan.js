const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');
const common = require('../../lib/common');

const hulaquan = module.exports = {};

/**
 * 呼啦圈-用户个人中心
 * @param {Object} data
 * @param {Object} data.p 
 * @param {String} data.p.userID
 * @param {String} data.m 
 */
hulaquan.getUserInfo = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/my/info/info/v3/get.ws', params);
};

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

/**
 * 获取话题列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
hulaquan.getQueryTopicList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/v1/que/queTopic/v190827/queryTopicList.ws', params);
};

/**
 * 获取热门问题列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.curPage 当前页
 * @param {Number} data.p.topicCateID 话题分类ID
 */
hulaquan.getQueryHotQueList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/v1/que/queQuestion/v200630/queryHotQueList.ws', params);
};

/**
 * 获取问题列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.curPage 当前页
 * @param {Number} data.p.topicCateID 话题分类ID
 */
hulaquan.getQueryQueList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/v1/que/queQuestion/v191029/queryQueList.ws', params);
};

/**
 * 获取话题下的问题列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.curPage 当前页
 * @param {Number} data.p.topicCateID 话题分类ID
 */
hulaquan.getQueryTopicQueList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/v1/que/queQuestion/v190827/queryTopicQueList.ws', params);
};

/**
 * 获取用户的问题列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 * @param {Number} data.p.curPage 当前页
 * @param {Number} data.p.userID 用户ID
 */
hulaquan.getQueryUserQueList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/v1/que/queQuestion/queryUserQueList.ws', params);
};


/**
 * 获取圈子
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 */
hulaquan.getGroupQuery = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/auth/groups/v3/groupQuery.ws', params);
};

/**
 * 获取帖子列表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.curPage 当前页
 */
hulaquan.getWaterfallList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/groups/post/v3/waterfall_query.ws', params);
};

/**
 * 获取推荐圈子列表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.pageSize 页数
 */
hulaquan.getRecommendGroup = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/groups/v3/recommendGroup.ws', params);
};

/**
 * 获取圈子类型列表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 */
hulaquan.getQueryGroupType = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/groups/v3/queryGroupType.ws', params);
};

/**
 * 获取圈子详情
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.groupID 圈子ID
 */
hulaquan.getGroupDetail = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/groups/v3/details.ws', params);
};

/**
 * 获取帖子列表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.groupID 圈子ID
 * @param {Number} data.p.curPage 当前页
 * @param {Number} data.p.pageSize 页数
 */
hulaquan.getPostQuery = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/groups/post/v3/query.ws', params);
};

/**
 * 获取帖子详情
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.postID 帖子ID
 */
hulaquan.getPostDetail = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/groups/post/v3/detail.ws', params);
};

/**
 * 资讯检查
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 */
hulaquan.getInfoCheck = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/auth/my/info/v3/check.ws', params);
};

/**
 * 用户发帖
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.postType 帖子类型
 * @param {Number} data.p.groupID 圈子ID
 * @param {String} data.p.location 位置信息
 * @param {String} data.p.content 帖子内容
 */
hulaquan.getPostAdd = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/auth/groups/post/v3/add.ws', params);
};

/**
 * 帖子查询
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 */
hulaquan.getVisitQuery = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/auth/my/visit/v191126/query.ws', params);
};

/**
 * 
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.curPage 当前页
 */
hulaquan.getVisitQuery = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/auth/my/drawschedule/v3/query.ws', params);
};

/** 
 * 加入圈子-客户端
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p
 * @param {Number} data.p.groupID 组id
 */
hulaquan.addFaction = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/auth/groups/group/v3/add.ws', params);
};

/** 
 * 查询圈子组列表
 * @param {Object} data
 * @param {String} data.m 
 * @param {Object} data.p.groupType 分组类型
 * @param {Number} data.p.curPage 当前页
 */
hulaquan.queryGroupsList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/api/m/groups/v4/queryGroups.ws', params);
};