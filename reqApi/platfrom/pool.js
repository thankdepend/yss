const httpRequest = require('../../lib/httpRequest')
const yssCaps = require('../../data/caps');
const { common } = require('../../lib/index');

const pool = module.exports = {};


/**
 * 查询省批次列表
 * @param {Number} dataYear 年份
 * @param {Number} provinceId 省份id
 * @param {Number} batchName 批次名
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
pool.getProvinceBatchList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/year/provinceBatch/loadProvinceBatchData.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 新增省文理信息
 * @param {Number} id 
 * @param {Number} dbDataYear 
 * @param {Number} dataYear 年份id
 * @param {Number} provinceId 省份id
 * @param {String} provinceName 省份名称
 * @param {Number} aos 文理科id
 * @param {String} aosName 文理科名称
 */
pool.saveProvinceAos = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/year/provinceAos/saveProvinceAos.htm', params);
};

/**
 * 删除省文理信息
 * @param {Number} id 
 */
pool.deleteProvinceAos = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/year/provinceAos/deleteProvinceAos.htm', params);
};


/**
 * 查询省文理信息
 * @param {Number} dataYear 年份
 * @param {Number} provinceId 省份id
 * @param {Number} aos 文理科id
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
pool.getProvinceAosList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/year/provinceAos/loadProvinceAosData.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 新增省统考类别
 * @param {Number} id 
 * @param {Number} dbDataYear 
 * @param {Number} dataYear 年份id
 * @param {Number} provinceId 省份id
 * @param {Number} jointCategoryId 统考类别id
 */
pool.saveProvinceJointCategory = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/year/provinceJointCategory/saveProvinceJointCategory.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 删除省统考类别
 * @param {Number} id
 */
pool.getProvinceAosList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/year/provinceJointCategory/deleteProvinceJointCategory.htm', params);
};

/**
 * 查询省统考类别
 * @param {Number} dataYear 年份
 * @param {Number} provinceId 省份id
 * @param {Number} jointCategoryId 统考类别
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
pool.getProvinceJointCategoryList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/year/provinceJointCategory/loadProvinceJointCategoryData.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 查询省统考类别
 * @param {Number} dataYear 年份
 * @param {Number} provinceId 省份id
 * @param {Number} jointCategoryId 统考类别
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
pool.getProvinceJointCategoryList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/year/provinceJointCategory/loadProvinceJointCategoryData.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 新增省统考大类
 * @param {Number} dataId 数据id 
 * @param {Number} dbDataYear 
 * @param {Number} dataYear 年份id
 * @param {Number} provinceId 省份id
 * @param {Number} dbProvinceId 
 * @param {String} provinceName 省份名称
 * @param {String} dbJointCategoryId
 * @param {Number} jointCategoryId 统考类别id
 * @param {String} jointCategoryName 统考类别名称
 * @param {String} typeName 统考大类名称
 * @param {Number} typeId 统考大类id
 */
pool.savePoolJointClazz = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/poolJointClazz/savePoolJointClazz.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 删除省统考大类
 * @param {Number} id
 */
pool.deletePoolJointClazz = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/poolJointClazz/deletePoolJointClazz.htm', params);
};


/**
 * 查询省统考大类
 * @param {Number} dataYear 年份
 * @param {Number} provinceId 省份id
 * @param {Number} typeId 统考大类id
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
pool.getPoolJointClazzList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/poolJointClazz/loadPoolJointClazzData.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 新增省批次线
 * @param {Number} dataId 数据id 
 * @param {*} dbDataYear 
 * @param {Number} dataYear 年份id
 * @param {Number} provinceId 省份id
 * @param {Number} dbProvinceId 
 * @param {String} provinceName 省份名称
 * @param {String} dbJointCategoryId
 * @param {*} dbBatch
 * @param {*} dbAos
 * @param {Number} aos 文理科id
 * @param {Number} culturalBatchLine: 250 统考文化分
 * @param {Number} profBatchLine: 150 统考专业分
 * @param {String} wishFileDate 填报日期说明
 * @param {Number} wishSchoolNum 志愿院校数
 * @param {Number} wishProfNum 志愿专业数
 * @param {Number} archiveRule 投档规则id
 * @param {Number} planNum 报考人数
 * @param {Number} diploma 1
 * @param {String} batchRemark 批次说明
 * @param {Number} batch 批次
 * @param {Number} jointCategoryId 统考类别id
 * @param {String} jointCategoryName 统考类别名称
 * @param {String} typeName 统考大类名称
 * @param {Number} typeId 统考大类id
 */
pool.saveProvinceBatchLine = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/provinceBatchLine/saveProvinceBatchLine.htm', params);
};

/**
 * 删除省批次线
 * @param {Number} dataId 数据id
 * @param {Number} dataYear 年份
 * @param {Number} batch 批次id
 * @param {Number} aos 文理科id
 * @param {Number} archiveRule 投档规则id
 * @param {Number} provinceId 省份id
 * @param {Number} jointCategoryId 统考类别id
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
pool.deleteProvinceBatchLine = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/provinceBatchLine/deleteProvinceBatchLine.htm', params);
};

/**
 * 查询省批次线
 * @param {Number} dataId 数据id
 * @param {Number} dataYear 年份
 * @param {Number} batch 批次id
 * @param {Number} aos 文理科id
 * @param {Number} archiveRule 投档规则id
 * @param {Number} provinceId 省份id
 * @param {Number} jointCategoryId 统考类别id
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
pool.getProvinceBatchLineList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/provinceBatchLine/loadProvinceBatchLineData.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 新增省分数线
 * @param {Number} dataId 数据id 
 * @param {Number} dataYear 年份id
 * @param {Number} provinceId 省份id
 * @param {Number} dbProvinceId 
 * @param {String} provinceName 省份名称
 * @param {Number} aos 文理科id
 * @param {String} aosName 文理科名称
 * @param {Number} jointCategoryId 统考类别id
 * @param {String} jointCategoryName 统考类别名称
 * @param {Number} profTypeStatus 专业类型状态id(统校考)
 * @param {String} profTypeStatusName 专业类型状态名称(统校考)
 * @param {String} typeName 统考大类名称
 * @param {Number} typeId 统考大类id
 * @param {Number} q 300 艺术类专业满分
 * @param {Number} w 750 艺术类文化满分
 * @param {Number} a 450 普通一批线
 * @param {Number} i 220 统考合格线
 * @param {Number} iNum: 111 统考合格人数
 * @param {Number} chineseFullScore 150 高考语文满分
 * @param {Number} englishFullScore 200 高考英语满分
 * @param {Number} schoolQualifyScore 
 * @param {Number} c 300 普通二批线
 * @param {Number} scoreExpression 
 * @param {Number} h: 260 统考本科线
 * @param {Number} hNum
 * @param {Number} x 220 统考专科线
 * @param {Number} xNum 
 * @param {Number} j 400 艺术文化本科线
 * @param {Number} l 301 艺术文化专科线
 */
pool.saveProvinceBatchLine = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/provinceBatchLine/saveProvinceBatchLine.htm', params);
};

/**
 * 删除省分数线
 * @param {Number} dataId 数据id
 */
pool.deleteProvinceScoreLine = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/provinceScoreLine/deleteProvinceScoreLine.htm', params);
};

/**
 * 查询省分数线
 * @param {Number} dataId 数据id
 * @param {Number} dataYear 年份
 * @param {Number} businessType 
 * @param {Number} aos 文理科id
 * @param {Number} profTypeStatus 专业类型
 * @param {Number} provinceId 省份id
 * @param {Number} jointCategoryId 统考类别id
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 */
pool.getProvinceScoreLineList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/provinceScoreLine/loadProvinceScoreLineData.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 新增志愿专业数据
 * @param {Number} dataId 数据id 
 * @param {Number} dataYear 年份id
 * @param {String} schoolTag 院校标签
 * @param {*} expression
 * @param {Number} diploma: 1
 * @param {Number} schoolId 学校id
 * @param {Number} tuition 学费
 * @param {Number} planNum 招生人数
 * @param {Number} enrollType 录取方式id 1
 * @param {Number} enrollFormulaId 录取公式id 1
 * @param {Number} culturalExpression 录取文化分计算公式 (S-U*2.5*0.6)/0.4
 * @param {Number} archiveRule 投档规则 1为平行志愿
 * @param {Number} archiveType 投档方式id 1
 * @param {Number} archiveFormulaId: 投档公式id 1
 * @param {Number} archiveCultExpression 投档文化分计算公式 (S-U*2.5*0.6)/0.4
 * @param {Number} archiveMinScore 投档最低分
 * @param {Number} archiveMaxScore: 投档最高分
 * @param {Number} archiveProfScore 投档专业分
 * @param {Number} archiveRank 投档位次
 * @param {Number} profId 招生专业id
 * @param {String} profRemark 专业方向
 * @param {Number} schoolExamCategory: 4
 * @param {Number} lengthOfSchooling 学制id
 * @param {Number} p0 计算概率固定值0.4725、0.45自选
 * @param {Number} provinceId 省份id
 * @param {Number} examType 考试类型
 * @param {Number} batch 录取批次 1
 * @param {Number} aos 文理科id 1
 * @param {Number} jointCategoryId 统考类别id
 * @param {Number} enrollNum 录取人数
 * @param {Number} enrollScoreMin 录取最低分/位次
 * @param {Number} enrollScoreMax  
 * @param {Number} enrollScoreAvg 
 * @param {Number} cultureScoreMin 文化最低分（录取）
 * @param {Number} cultureScoreMax: 
 * @param {Number} profScoreMin 专业最低分（录取）
 * @param {Number} enrollOnOffYear 大小年 1为是，2为否
 */
pool.savePool = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/pool/savePool.htm', params);
};

/**
 * 删除志愿专业数据
 * @param {Number} dataId 数据id 
 */
pool.deletePool = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/pool/deletePool.htm', params);
};

/**
 * 查询志愿专业数据
 * @param {Number} dataId 数据id
 * @param {Number} dataYear 年份
 * @param {Number} businessType 
 * @param {Number} aos 文理科id
 * @param {Number} profTypeStatus 专业类型
 * @param {Number} provinceId 省份id
 * @param {Number} jointCategoryId 统考类别id
 * @param {Number} curPage 页数
 * @param {Number} pageSize 个数
 * @param {Number} batch 批次id 
 * @param {Number} schoolId 学校id
 * @param {Number} profId 专业id
 * @param {Number} examType 考试类型id
 */
pool.getProvinceScoreLineList = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/data/provinceScoreLine/loadProvinceScoreLineData.htm', Object.assign({ curPage: 1, pageSize: 15 }, params));
};

/**
 * 保存白名单
 * @param {Number} id 数据id
 * @param {Number} userID 用户id
 * @param {Number} roleTag [1:内部用户,2:外部用户]
 * @param {Number} nickName 文理科id
 * @param {Number} activiyType 业务类型[1:校考服务,2:统考服务,3:报考指南,4:录取概率（组合套餐）,5:志愿视频,6:电子周刊]
 * @param {Number} type 类型 [1:白名单，2:黑名单]
 * @param {Number} resourceId 资源id
 * @param {String} tryEndDate 结束时间
 * @param {String} remark 备注
 */
pool.saveWhiteBlack = async function (params = {}) {
    return httpRequest.sendPost(yssCaps.pool + '/auth/pool/whiteBlack/saveWhiteBlack.htm', params);
};

/**
 * 数据池同步数据
 * @param {Number} dataId 数据id
 * @param {Number} businessType 业务类型
 */
pool.syncData = async function (params = {}) {
    return common.sendPost(yssCaps.pool + '/auth/pool/data/pool/syncData.htm', params);
};

/**
 * 数据池列表
 * @param {Number} dataYear 数据年份
 * @param {Number} provinceId 省份
 * @param {Number} aos 文理科
 * @param {Number} jointCategoryId 统考类别
 * @param {Number} dataId 数据id
 * @param {Number} schoolId 学校id
 */
pool.getPoolList = async function (params = {}) {
    return common.sendPost(yssCaps.pool + '/auth/pool/data/pool/loadPoolData.htm', params);
};
