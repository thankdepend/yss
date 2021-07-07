const wish = require('../../../reqApi/platfrom/wish');
const { common } = require('../../../lib/index');
const { expect } = require('chai');


/** 留学院校类别id */
class AbrodProf {
    constructor() {
        this.parentMain = new ParentMain();
        this.subMain = new SubMain();
    }

    /** 保存院校专业 */
    async saveAbroadProf (Level) {
        const profCode = await this.getMaxProfCode(1);
        const subProfCode = await this.getMaxProfCode(2);
        const json = Level == 1 ? {
            profLevel: 1,
            profCode: profCode + 1,
            profName: `第${profCode + 1}个专业`,
        } : Level == 2
            ? {
                profLevel: 2,
                paProfID: this.parentMain.profID,
                paProfCode: this.parentMain.profCode,
                paProfName: this.parentMain.profName,
                profCode: subProfCode + 1,
                profName: `第${profCode + 1}个专业的子专业${common.getRandomNumStr(4)}`,
            } : {};
        json.ticket = PLAT_TICKET;
        const res = await wish.saveAbroadProf(json);
        // console.log('保存院校专业', res);
        await this.updateAbrodProf(json);
    }

    /** 更新留学专业 */
    async updateAbrodProf (params) {
        // 获取专业ID
        const profID = await wish.abroadProfList(Object.assign({
            profLevel: '',
            profCode: '',
            profName: '',
            ticket: PLAT_TICKET,
        }, params)).then(res => res.result.datas.page.dataList.find(
            obj => obj.level == params.level && obj.profCode == params.profCode
        ).profID);
        if (params.paProfCode && params.paProfName) {
            this.subMain.profID = profID;
            Object.assign(this.subMain, params);
        } else {
            this.parentMain.profID = profID;
            Object.assign(this.parentMain, params);
        }

    }

    /** 删除留学专业 */
    async deleteAbroadProf (level) {
        let json;
        if (level == 1) {
            json = { profID: this.parentMain.profID }
        } else if (level == 2) {
            json = { profID: this.subMain.profID }
        } else {
            json = {}
        }
        json.ticket = PLAT_TICKET;
        const delProf = await wish.deleteAbroadProf(json);
        // console.log('删除', delProf);
    }

    /** 获取最大专业ID */
    async getMaxProfID (Level) {
        const profList = await wish.abroadProfList({
            profLevel: Level,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList);
        return Math.max(...profList.map(prof => prof.profID))

    }

    /** 获取最大专业编码 */
    async getMaxProfCode (Level) {
        const profList = await wish.abroadProfList({
            profLevel: Level,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList);
        return Math.max(...profList.map(prof => prof.profCode))
    }

    /** 留学专业列表 */
    async abroadProfList (params) {
        params.ticket = PLAT_TICKET;
        const abroadProfList = await wish.abroadProfList(params);
        return abroadProfList;
    }

    /** 获取留学父级专业列表 */
    async getAbroadProfParentList () {
        const parentProfList = await this.abroadProfList({
            Level: 1,
            profCode: this.parentMain.profCode
        }).then(res => res.result.datas.page.dataList)
        return parentProfList;
    }

    /** 获取留学子级专业列表 */
    async getAbroadProfSubList () {
        const subProfList = await this.abroadProfList({
            Level: 1,
            profCode: this.subMain.profCode
        }).then(res => res.result.datas.page.dataList)
        return subProfList;
    }

    /** 留学专业父级断言 */
    async abroadProfParentAssert (del = false) {
        const actual = await this.getAbroadProfParentList();
        if (del) {
            expect([].length).to.be.equals(actual.length)
        } else {
            const exp = {
                profID: this.parentMain.profID,
                profLevel: this.parentMain.profLevel,
                profCode: this.parentMain.profCode,
                profName: this.parentMain.profName,
                paProfID: null,
                paProfCode: null,
                paProfName: null,
                abroadProfList: null,
                profLevelStr: '一级',
            }
            common.isApproximatelyEqualAssert(exp, actual);
        }
    }

    /** 留学专业子级断言 */
    async abroadProfSubAssert (del = false) {
        const actual = await this.getAbroadProfSubList();
        if (del) {
            expect([].length).to.be.equals(actual.length)
        } else {
            const exp = {
                profID: this.subMain.profID,
                profLevel: this.subMain.profLevel,
                profCode: this.subMain.profCode,
                profName: this.subMain.profName,
                paProfID: this.subMain.paProfID,
                paProfCode: this.subMain.paProfCode,
                paProfName: this.subMain.paProfName,
                abroadProfList: null,
                profLevelStr: '一级',
            }
            common.isApproximatelyEqualAssert(exp, actual);
        }
    }
}

const abrodProfManage = module.exports = {};

abrodProfManage.setupAbrodProf = function () {
    return new AbrodProf();
}

/** 父专业 */
class ParentMain {
    constructor() {
        /** 专业ID */
        this.profID = '';
        /** 专业等级 */
        this.profLevel = '';
        /** 专业编码 */
        this.profCode = '';
        /** 专业名称 */
        this.profName = '';
    }
}

/** 子专业 */
class SubMain {
    constructor() {
        /** 专业ID */
        this.profID = '';
        /** 专业等级 */
        this.profLevel = '';
        /** 专业编码 */
        this.profCode = '';
        /** 专业名称 */
        this.profName = '';
        /** 父级专业ID */
        this.paProfID = '';
        /** 父级专业编码 */
        this.paProfCode = '';
        /** 父级专业名称 */
        this.paProfName = '';
    }
}