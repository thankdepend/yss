const base = require('../../reqApi/platfrom/base');
const common = require('../../lib/common');

class Examination {
    constructor() {
        // /** 商品id */
        // this.id = '';
        /** 学校信息 */
        this.schoolMain = new collegeMain();
        /** collegeMap */
        this.collegeMap = new Map();
    }

    /**
     * 保存院校（新增/修改）
     * @param {*} params
     */
    async saveCollege(params) {
        const saveCollegeInfo = await base.toAddCollege(params);
        // console.log(saveDresInfo);
        let params = saveCollegeInfo.params;


        this.updateCollege(params)
        return saveDresInfo;
    };

    updateCollege(params) {

    }

    /**
     * 院校常用专业库新增
     */
    async saveProfession() {
        const res = await base.saveBacthProfession();
        console.log(res);

    };

    /**
     * 查询院校常用专业库列表
     */
    async getprofessionInfoList() {
        const res = await base.getprofessionInfoList();
        return res;
    }

    /**
     * 
     */



    /**
     * 库存更新（查询更新,调拨使用)
     */
    updateInvByQuery(params) {
        // console.log('库存更新', params);
        for (let i = 0; i < params.length; i++) {
            // 设置出库门店的skuMap
            let colorSize = `${params[i].colorid}_${params[i].sizeid}_${params[i].invid}`;
            const sku = this.skuMap.has(colorSize) ? this.skuMap.get(colorSize) : new DresSkuMap();
            common.update(sku, params[i]);
            this.skuMap.set(colorSize, sku);
        }
        console.log(this.skuMap);

    };

}

const examManage = module.exports = {};

function collegeMockJson(params = {}) {
    const randomStr = common.getRandomStr(6),
        randomNum = common.getRandomNum(12000, 99999),
        randomImage = doc.test.school[common.getRandomNum(0, doc.test.school.length)];

    let collegeJson = Object.assign({
        preSchoolType: 1,
        xueXiaoMH: randomNum, // 代号
        xueXiaoID: randomNum,
        xueXiaoMC: `中国美术学院-${randomStr}`,
        schoolType: 1, // 是否签约：1为签约，2为未签约
        hotFlag: 2, // 热门标签: 1为
        typeIds: 26,
        provChName: '浙江省',
        prov: 330000,
        cityChName: '杭州市',
        city: 330100,
        areaChName: '下城区',
        area: 330103,
        classId: 5,
        studentType: '1,2,3,4,5', // 学生类型
        initUser: 'on', // 初始化用户，on为是
        // addr: ,
        // applyUrl: ,
        logo: `${randomImage}`,
        // subSystem: ,
        // sub: ,
        // orderNo: ,
        // mobileOrderNo: ,
        // siteConfirmType: ,
        ticket: PLAT_TICKET
    }, params)
    return collegeJson;
}

function collegeMap() {
    /** skuId */
    this.id = '';
}

class collegeMain {
    constructor() {

    }
}