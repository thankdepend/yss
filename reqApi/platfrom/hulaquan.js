const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const hulaquan = module.exports = {};

/**
 * 查询直播分类列表
 * @param {String} categoryName 分类名
 * @param {Number} status 状态 启用1，禁用2
 * @param {Number} curPage 1
 * @param {Number} pageSize 15
 */
hulaquan.getLiveCategoryList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/category/loadRoomCategoryData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/**
 * 
 * 查询直播间列表
 * @param {Number} roomId 直播间id 
 * @param {String} roomName 直播间名称
 * @param {String} beginRepDate 开始录制时间
 * @param {String} endRepDate 结束录制时间
 * @param {Number} anchorId 主播id
 * @param {Number} showFlag 展示标志
 * @param {Number} roomStatus 房间状态
 * @param {String} categoryName 分类名
 * @param {Number} categoryID 分类id
 * @param {Number} curPage
 * @param {Number} pageSize
 */
hulaquan.getLiveRoomList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/room/loadRoomData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/**
 * 保存直播分类
 * @param {Number} categoryID 直播分类id
 * @param {String} categoryName 分类名称
 * @param {Number} orderNum 排序号
 * @param {Number} status 状态1为开启，0为关闭
 */
hulaquan.saveRoomCategory = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/category/saveRoomCategory.htm', params);
};

/**
 * 保存直播任务
 * @param {Number} roomId 直播间id
 * @param {String} roomName 直播间名称
 * @param {String} categoryName 直播分类名称
 * @param {Number} categoryID 直播分类id
 * @param {String} startTime 直播开始时间
 * @param {String} anchorName 播主名称
 * @param {Number} anchorId 播主id
 * @param {Number} maxNum 工具人数（假人数）
 * @param {Number} orderNum 排序编号
 * @param {string} picUrl 直播间封面图
 * @param {Number} infoFlag 文稿标志 1为开启 2为关闭
 * @param {Number} infoId 文稿id
 * @param {Number} playBackFlag 回放标志 1为开启，0为关闭
 * @param {Number} commentFlag 评论标志 1为开启，0为关闭
 * @param {String} noticeContent 直播公告
 * @param {Number} iconList[0].showFlag 悬浮图开启标志 1为是，0为否
 * @param {Number} iconList[0].typeCode 类型码 100
 * @param {Number} iconList[0].icon 图片地址 http://img.artstudent.cn/pr/2020-08-04/29f7a5654cb44c30baee6c35450d1212.jpg
 * @param {Number} iconList[0].width 悬浮图宽度
 * @param {Number} iconList[0].height 悬浮图高度
 * @param {Number} iconList[0].url 
 */
hulaquan.saveRoom = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/room/saveRoom.htm', Object.assign({
        ticket: PLAT_TICKET
    }, params));
};

/**
 * 获取直播监管列表
 * @param {Number} roomId 直播间id
 * @param {String} roomName 直播间名称
 * @param {Number} curPage 
 * @param {Number} pageSize
 */
hulaquan.getLiveSuperviseList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/supervise/loadSuperviseData.htm', params);
};

/**
 * 直播回顾列表
 * @param {Number} roomId 直播间id
 * @param {String} roomName 直播间名称
 * @param {String} beginRepDate 开始录制时间
 * @param {String} endRepDate 结束录制时间
 * @param {Number} curPage
 * @param {Number} pageSize
 */
hulaquan.getLiveHistoryList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/room/loadHistoryData.htm', params);
};

/**
 * 直播预约列表
 * @param {Number} roomId 直播间id
 * @param {Number} userId 用户id
 * @param {String} nickName 用户昵称
 * @param {String} beginTime 开始时间
 * @param {String} endTime 结束时间
 * @param {Number} pushStatus 推送状态 1为已推送，2为未推送
 * @param {Number} curPage 
 * @param {Number} pageSize
 */
hulaquan.getLiveReserveList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/reserve/loadReserveData.htm', params);
};

/**
 * 直播记录列表
 * @param {Number} roomId 直播间id
 * @param {Number} userId 用户id
 * @param {Number} curPage 
 * @param {Number} pageSize
 */
hulaquan.getLiveReserveList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/reserve/loadReserveData.htm', params);
};

/**
 * 关闭直播间
 * @param {Number} roomId 房间id
 * @param {Number} totalNumBase 累计观看基数
 * @param {Number} reserveNumBase 预约基数
 * @param {Number} liveNumBase 实时在线基数
 */
hulaquan.closeVcloud = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/vcloud/web/closeVcloud.htm', params);
};

/**
 * 保存圈子类型
 * @param {Number} typeID 类型id
 * @param {Number} businessType 业务类型 2
 * @param {Number} typeLevel 类型等级 1
 * @param {Number} typeName 类型名
 * @param {Number} typeFlag 类型标志 1,2,3服务端写死
 * @param {Number} typeOrder 类型编号
 * @param {Number} icon 图
 * @param {Number} typeDescribe 描述信息
 */
hulaquan.saveType = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/groups/groupsType/saveType.htm', params);
};

/** 
 * 查询圈子类型列表 
 * @param {String} typeName 类型名称
 * @param {Number} businessType 业务类型 2
 * @param {Number} curPage 
 * @param {Number} pageSize 
 */
hulaquan.getgroupsTypeList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/groups/groupsType/loadData.htm', params);
};

/** 
 * 删除圈子类型 
 * @param {Number} typeID 类型id
 */
hulaquan.delType = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/groups/groupsType/deleteType.htm?', params);
};

/**
 * 新增圈子
 * @param {Number} groupID 圈子id
 * @param {String} schoolName  学校名称
 * @param {String} groupName  圈子名称
 * @param {Number} typeFlag  圈子类型标志
 * @param {Number} typeID  圈子类型id
 * @param {Number} verifyFlag  验证标记 3允许任何人
 * @param {Number} isHot  是否热门 1为是，0为否
 * @param {Number} stopFlag  停用标记 1为启用，0为停用
 * @param {String} iconURL  icon图   
 * @param {Number} schoolID   学校id
 * @param {String} provCityName 省份城市名 写死的北京市 东城区
 * @param {Number} proviceCode 省份编码 110000
 * @param {Number} cityCode 城市编码 110101
 * @param {String} remark  备注
 */
hulaquan.saveGroup = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/groups/group/saveGroup.htm', params);
};

/** 
 * 查询圈子列表
 * @param {Number} groupID 圈子id
 * @param {Number} typeID 圈子类型id
 * @param {String} groupName 圈子名称
 * @param {Number} typeFlag 圈子类型标志
 * @param {Number} verifyFlag 验证标记，3表示所有人
 * @param {Number} isHot 是否热门 1为是，0为否
 * @param {Number} stopFlag 停用标记 1为启用，0为停用
 * @param {Number} dissolveFlag 解散标记 未解散1，已解散2
 * @param {Number} auditFlag 审核标记 1表示已审核
 * @param {Number} curPage: 1
 * @param {Number} pageSize: 15
 */
hulaquan.getGroupList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/groups/group/loadData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/** 
 * 圈子成员
 * @param {Number} userID 用户id
 * @param {Number} groupID 圈子id
 * @param {Number} celebrity 是否是达成 1为是
 * @param {Number} curPage 1
 * @param {Number} pageSize 15
 */
hulaquan.groupUserList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/groups/groupUser/loadData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/** 
 * 解散圈子
 * @param {Number} typeID 类型id
 * @param {Number} groupID 圈子id
 * @param {Number} groupName 圈子名称
 */
hulaquan.dissolveGroup = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/groups/group/dissolveGroup.htm?', params);
};

/** 
 * 删除圈子 
 * @param {Number} groupID 类型id
 */
hulaquan.deleteGroup = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.hulaquan + '/auth/hulaquan/groups/group/deleteGroup.htm?', params);
};