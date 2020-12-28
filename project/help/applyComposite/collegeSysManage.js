const stu = require('../../../reqApi/app/stu');
const print = require('../../../reqApi/app/print');
const {
    common
} = require('../../../lib/index');
const {
    object
} = require('underscore');

class CollegeSys {
    constructor() {
        /** 学校id */
        this.xueXiaoID = 0;
        /** 学校名称 */
        this.xueXiaoMC = '';
        /** 学校省份 */
        this.prov = 0;
        /** 日程id */
        this.riChengID = '';
        /** 学校类型 */
        this.schoolType = 1;
    }

    /** 保存报名 */
    async saveProf (params) {
        const res = await stu.saveProf(params);
        // if (res.result.message == 'riChengID is invalid') {
        //     throw new Error(`日程id失效:${res.result.message}`)
        // }
        console.log('保存报名', res);
    }

    /** 新增报名订单 */
    async addProfOrder (params) {
        const res = await stu.addProfOrder(params);
        console.log(res);
    }

    /** 查询专业 */
    async getProf (params) {
        const res = await stu.getProf(params);
        console.log('专业', res);
    }

    /**
     * 在线确认列表
     * @param baoKaoBZ 报考标志 1未提交 2已提交 3已生效 4已关闭 5作废
     */
    async getAffirmList (params = {}) {
        let queryData = Object.assign(common.yssAppJson({
            baoKaoBZ: 3
        }), params)
        const res = await print.getAffirmList(queryData);
        console.log(res);
    }

    /**
     * 在线确认
     */
    async saveAffirm (params) {
        await print.saveAffirm(params)
    }
}

const collegeSysManage = module.exports = {};

collegeSysManage.setupCollegeSys = function () {
    return new CollegeSys();
}