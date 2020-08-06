const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');

const notice = module.exports = {};

/**
 * 推送消息列表（平台端）
 * @param businessId   
 * @param queryType 
 * @param pushType 推送类型
 * @param beginSendDate 开始时间
 * @param endSendDate 结束时间
 * @param senderName 发送人姓名
 * @param msgContent 消息文本
 * @param curPage
 * @param pageSize 
 */
notice.loadPushData = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.notice + '/auth/notice/push/pushmessage/loadPushData.htm', Object.assign({
        curPage: 1,
        pageSize: 15
    }, params));
};

/**
 * 推送消息 
 * @param queryType
 * @param receiverIdJson 用户id
 * @param msgContent 消息内容
 * @param pop 是否弹窗 1为不弹，2为弹
 * @param url ysk://link?http://www.baidu.com
 */

notice.pushMessageSend = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.notice + '/auth/notice/push/pushmessage/pushMessageSend.htm', params);
};