const probApp = require('../../../reqApi/app/prob');
const prob = require('../../../reqApi/platfrom/prob');
const provinceScoreLineApp = require('../../../reqApi/app/provinceScoreLine')
const basicData = require('../../../data/basicData');
const caps = require('../../../data/caps');
const {
    common
} = require('../../../lib/index');
const { object } = require('underscore');

class Prob {
    constructor() {
        // 总体修改次数
        this.fixNum = 999;
        // 考生概率详情
        this.stuNumDetail = new Object();
        // 分数线详情
        this.scoreLineInfo = new Object();
        // 考生信息内容
        this.stuMain = new Object();
    }

    /** 完善用户信息 */
    async saveUser (params) {
        let saveParams = {
            data: {
                p: Object.assign({
                    profTypeStatus: this.scoreLineInfo.profTypeStatus,
                    jointExamScore: common.getRandomNum(1, this.scoreLineInfo.q), // 统考分数
                    englishScore: common.getRandomNum(1, this.scoreLineInfo.englishFullScore),
                    jointProfTypeName: this.scoreLineInfo.jointCategoryName, // 统考类别
                    userTryUse: false,
                    artsOrSciences: this.scoreLineInfo.aos, // 文理科类型
                    collEntrExamScore: common.getRandomNum(1, this.scoreLineInfo.w), // 文化分数
                    chineseScore: common.getRandomNum(1, this.scoreLineInfo.chineseFullScore), // 语文成绩
                    provinceName: this.scoreLineInfo.provinceName, // 省份名称
                    reduceNumAvailable: true,
                    provinceID: this.scoreLineInfo.provinceId, // 省份id
                    jointProfTypeID: this.scoreLineInfo.jointCategoryId
                }, params),
                m: ""
            },
            ticket: TICKET
        }
        const res = await probApp.saveUser(saveParams);
        this.stuMain = saveParams
        console.log(res);
    }

    /** 获取录取概率用户信息 */
    async getUser () {
        const res = await probApp.getUser({
            data: {
                "p": {},
                "m": ""
            }, ticket: TICKET
        }).then(res => res.result.datas.obj);

        console.log('aaa', res);
        return res;
    }

    /** 后台查看概率用户 */
    async getProbUserInfo () {
        const res = await prob.getProbUser({
            userName: LOGINDATA.loginName,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList[0]);
        this.stuNumDetail = res;
        console.log(res);
    }

    // 保存修改次数
    async saveModifyNumEdit () {
        const res = await prob.saveModifyNumEdit({
            userID: this.stuNumDetail.userID,
            userName: this.stuNumDetail.userName,
            provinceName: this.stuNumDetail.provinceName,
            jointProfTypeName: this.stuNumDetail.jointProfTypeName,
            artsOrSciencesStr: this.stuNumDetail.artsOrSciencesStr,
            collEntrExamScore: this.stuNumDetail.collEntrExamScore,
            jointExamScore: this.stuNumDetail.jointExamScore,
            probabilityModProvNum: this.stuNumDetail.probabilityModProvNum,
            modifyNum: this.stuNumDetail.modifyNum,
            modifyJointScoreNum: this.stuNumDetail.modifyJointScoreNum,
            englishModifyNum: this.stuNumDetail.englishModifyNum,
            chineseModifyNum: this.stuNumDetail.chineseModifyNum,
            probabilityCanModProvNum: this.fixNum,
            canModifyCollEntrNum: this.fixNum,
            canModifyJointScoreNum: this.fixNum,
            chineseLeftNum: this.fixNum,
            englishLeftNum: this.fixNum,
            remark: null,
            ticket: PLAT_TICKET
        });
        console.log(res);
    }

    // 获取省份分数线列表
    async getAosAndProfTypeList (params) {
        // 支持输入省份id
        const res = await provinceScoreLineApp.getAosAndProfTypeList({
            data: {
                p: Object.assign({
                    provinceId: basicData.province['浙江'],
                }, params),
                m: ''
            },
            ticket: TICKET,
        }).then(res => res.result.datas.list[0].jointCategoryList[0]);
        this.scoreLineInfo = res;
        console.log(res);
    }

    // 断言用户信息
    async assertUserInfo () {

        const probUserInfo = await this.getUser();
        const userInfoExp = {
            userID: LOGINDATA.userId,
            profTypeStatus: this.stuMain.profTypeStatus,
            jointExamScore: this.stuMain.jointExamScore,
            collEntrExamScore: this.stuMain.collEntrExamScore,
            canModifyJointScoreNum: common.sub(this.stuNumDetail.canModifyJointScoreNum, 1),
            canModifyCollEntrNum: common.sub(this.stuNumDetail.canModifyCollEntrNum, 1),
            probabilityCanModProvNum: common.sub(this.stuNumDetail.probabilityCanModProvNum, 1),
            englishModifyNum: common.sub(this.stuNumDetail.englishModifyNum, 1),
            englishLeftNum: common.sub(this.stuNumDetail.englishLeftNum, 1),
            chineseModifyNum: common.sub(this.stuNumDetail.chineseModifyNum, 1),
            chineseLeftNum: common.sub(this.stuNumDetail.chineseLeftNum, 1),
            provinceID: this.stuMain.provinceID,
            provinceName: this.stuMain.provinceName,
            artsOrSciences: this.stuMain.artsOrSciences,
            jointProfTypeID: this.stuMain.jointProfTypeID,
            jointProfTypeName: this.stuMain.jointProfTypeName,
            englishScore: this.stuMain.englishScore,
            chineseScore: this.stuMain.chineseScore,
            artsOrSciencesStr: this.scoreLineInfo.aos == this.stuMain.artsOrSciences ? this.scoreLineInfo.aosName : '文科',
            profTypeStatusStr: this.scoreLineInfo.profTypeStatus == this.stuMain.profTypeStatus ? this.scoreLineInfo.profTypeStatusName : '统考和校考',
            simpleProvinceName: this.stuMain.provinceName
        }
        console.log('期望值', userInfoExp);
        // 断言
        common.isApproximatelyEqual(userInfoExp, probUserInfo)
    }
}


const probManage = module.exports = {};

probManage.setupProb = async function () {
    return new Prob();
}