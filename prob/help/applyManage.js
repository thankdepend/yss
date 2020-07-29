const stu = require('../../reqApi/app/stu')

class Apply {
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
    async saveProf(params) {
        const res = await stu.saveProf(params);
        // if (res.result.message == 'riChengID is invalid') {
        //     throw new Error(`日程id失效:${res.result.message}`)
        // }
        console.log('保存报名', res);
    }

    /** 新增报名订单 */
    async addProfOrder(params) {
        const res = await stu.addProfOrder(params);
        console.log(res);
    }

    /** 查询专业 */
    async getProf(params) {
        const res = await stu.getProf(params);
        console.log('专业', res);
    }
}

const applyManage = module.exports = {};

applyManage.setupApply = function () {
    return new Apply();
}