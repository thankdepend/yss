const yssLogin = require('../base/yssLogin');
const stuApp = require('../../../reqApi/app/stu');
const userApp = require('../../../reqApi/app/user');
const examvideo = require('../../../reqApi/platfrom/examvideo');
const school = require('../../../reqApi/platfrom/school');
const { common } = require('../../../lib/index');


class duReco {
    constructor(params) {
        /** 日程id */
        this.riChengID = params.riChengID;
        /** 科目id */
        this.esId = params.esId;
        /** 报考id */
        this.baoKaoId = params.baoKaoId;
        /** 主机主要信息 */
        this.masterMain = {};
        /** 辅机主要信息 */
        this.slaveMain = {};
    }

    /**
     * 主机进考场
     */
    async masterUnderway () {
        await stuApp.saveStudentExamStatus({
            data: {
                m: "",
                p: {
                    esId: 1701,
                    baoKaoId: 2622186,
                    examStatus: 200
                }
            }, ticket: TICKET
        })
    }

    /**
     * 主机获取科目列表
     */
    async masterGetSubjectList () {
        await stuApp.querySubjectVideoList({
            data: {
                m: "",
                p: {
                    riChengId: 11108262,
                    riChengID: 11108262,
                    baoKaoId: 2622186,
                    simulation: 0
                }
            }, ticket: TICKET
        });
    }

    /**
     * 
     */
    async
}

const duRecoManage = module.exports = {};

duRecoManage.setupduReco = function (params) {
    return new duReco(params);
}