const {
    common
} = require('../../lib/index')
const yssCaps = require('../../data/caps');

const guide = module.exports = {};



/**
 * 查询是否购买指南
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
guide.quickBuy = async function (params = {}) {
    return common.sendPost(yssCaps.guide + '/api/m/auth/guide/goods/quickBuy.htm', params);
};

/**
 * 查询指南用户
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
guide.queryUser = async function (params = {}) {
    return common.sendPost(yssCaps.guide + '/api/m/auth/guide/user/query.htm', params);
};

/**
 * 指南省份专业类型列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
guide.provinceProfTypeList = async function (params = {}) {
    return common.sendPost(yssCaps.guide + '/api/m/auth/guide/provinceProfType/provinceProfTypeList.htm', params);
};

/**
 * 指南公告列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p
 */
guide.getAnnouceList = async function (params = {}) {
    return common.sendPost(yssCaps.guide + '/api/m/guide/annouceList.htm', Object.assign({
        curPage: 1
    }, params));
}

/**
 * 保存指南用户
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p.provinceName 省份名称
 * @param {Object} data.p.provinceID 省份名称
 * @param {Object} data.p.jointProfTypeID 专业id
 * @param {Object} data.p.jointProfTypeName 专业名称
 * @param {Object} data.p.artsOrSciences 文理科id，1为文，2为理
 */
guide.saveGuideUser = async function (params = {}) {
    return common.sendPost(yssCaps.guide + '/api/m/auth/guide/user/save.htm', params);
}

/**
 * 指南统考类型列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p.provinceId 省份id
 * @param {Object} data.p.artsOrSciences 文理科id
 * @param {Object} data.p.jointProfTypeId 专业id
 */
guide.getGuideUnifiedTypeList = async function (params = {}) {
    return common.sendPost(yssCaps.guide + '/api/m/auth/guide/joint/index.htm', params);
}

/**
 * 指南政策列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p.curPage 页数
 */
guide.getPolicyList = async function (params = {}) {
    return common.sendPost(yssCaps.guide + '/api/m/auth/guide/joint/policyList.htm', params);
}

/**
 * 指南院校列表
 * @param {Object} data
 * @param {String} data.m
 * @param {Object} data.p.provinceId 省份id
 * @param {Object} data.p.jointProfTypeId 专业id
 * @param {Object} data.p.curPage 页数
 * @param {Object} data.p.artsOrSciences 文理科id，1为文，2为理
 */
guide.getJointSchoolList = async function (params = {}) {
    return common.sendPost(yssCaps.guide + '/api/m/auth/guide/joint/jointSchoolList.htm', Object.assign({
        curPage: 1
    }, params));
}