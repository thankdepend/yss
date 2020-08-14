const wish = require('../../reqApi/platfrom/wish');
const wishApp = require('../../reqApi/app/wish');
const caps = require('../../data/caps');
const doc = require("../data/doc.json");
const {
    common
} = require('../../lib/index');

class Abroad {
    constructor() {

    }

    /** 保存留学院校 */
    async saveAbroadSchool(params) {
        const res = await wish.saveAbroadSchool(params);
        console.log('响应', res);
    }

    /** 获取留学院校列表 */
    async getAbroadSchoolList() {
        const res = await wish.abroadSchoolList({
            ticket: PLAT_TICKET,
        });
        console.log('打印列表', res);
    }

    /** 保存院校类别 */
    async saveWishschooltype(params) {
        const totalPage = await wish.doWishSchoolTypeList({
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.totalPage);
        await wish.saveWishschooltype(Object.assign({
            ticket: PLAT_TICKET,
            typeFlag: common.getRandomNum(5, 7), // 服务端写死，只有5,6,7
            // typeID: ,
            typeName: `蜜獾${common.getRandomStr(5)}类型`,
            ord: totalPage + 1,
        }, params));
    }

    /** 院校类别列表 */
    async wishSchoolTypeList() {
        const res = await wish.doWishSchoolTypeList({
            ticket: PLAT_TICKET
        });
        console.log('院校类别列表', res);
    }

    /** 客户端查询留学院校列表 */
    async getStudySchoolList() {
        const res = await wishApp.getStudySchoolList({
            data: {
                m: '',
                p: {},
            },
            ticket: TICKET
        })
        console.log(res);
    }

}

const abroadManage = module.exports = {};

abroadManage.setupAbroad = function () {
    return new Abroad();
}

abroadManage.abroadMockjson = function (params) {
    const schoolName = caps.name == 'test' ? `蜜獾测试环境国外院校` : caps.name == 'pre' ? `蜜獾演示环境国外院校` : ``;
    const img = doc[caps.name].school[common.getRandomNum(0, doc[caps.name].school.length - 1)]
    let json = Object.assign({
        // mainPicture: `http://img.artstudent.cn/pr/2020-08-14/cdc87f67ac204f5785f9e906fe3bb10a.jpg,http://img.artstudent.cn/pr/2020-08-14/709ae5883c7a438d89a82d571f219c0f.jpg,/images/wish/noimages.png`,
        mainPicture: `${doc[caps.name].school[common.getRandomNum(0, doc[caps.name].school.length - 1)]},${doc[caps.name].school[common.getRandomNum(0, doc[caps.name].school.length- 1)]},${doc[caps.name].school[common.getRandomNum(0, doc[caps.name].school.length- 1)]}`,
        srviceTypeIDs: '',
        chinaSrviceTypeIDs: '',
        tagNames: '',
        profIDs: '', // 专业id列表
        enrollRequire: '',
        enrollTargets: 1, // 报名目标id
        profCategorys: '1,2', // 专业大类id
        budgets: 1, // 年预算id
        schoolID: 33031, // 学校id  ,不打算新增，写死
        insertFlag: 1, // 2为保存，1为编辑
        schoolCode: 33031, // 学校编码 ,不打算新增，写死
        englishName: `${common.getRandomStr(4)}`,
        schoolName: `${schoolName}-${common.getRandomStr(4)}`,
        hotOrder: 112, // 院校排序
        showOrder: 1, //列表排序
        groupID: '', // 圈子id
        extOrder: 30, // 热门院校排序
        extHotFlag: 2, // 国外院校列表标记,1为热门，2为非热门
        logo: img,
        attribute: 1, // 办学属性id
        sellingPoint: '世界百强名校,双录取保障,费用经济,环境优美', // 卖点
        internatRanking: 9, // 国际排名
        profRanking: 9, // 专业排名
        countryID: 58, // 国家id
        countryName: '英国', // 国别
        labelList: '测试标签测试',
        labelList: '',
        locate: `地区-${common.getRandomContent(4)}`, // 地理
        admissionCall: '',
        onlineConsult: '',
        enrollTarget: 1,
        profCategory: 1,
        profCategory: 2, // 专业类别
        budget: 1, // 年预算
        basicInfo: '这是基础信息', // 基础信息
        lodgCondit: `${common.getRandomContent(10)}`, // 教学设施
        hotFlag: 2, // 热门标记
        recommendOrder: '', // 热门排序
        enrollBase: 40, // 报名基数
        enrollStartTime: common.getCurrentTime(), // 报名开始时间
        enrollEndTime: common.getCurrentTimeAfter(2400), // 报名结束时间
        baseSub: '',
        status: 2,
        applicatStatus: 2, // 直升方案状态 1为启用，2为禁用 ，与中国区选拔考试状态互斥
        applicatCondit: '',
        chinaGainPlanUrl: '',
        applicateUrl: '',
        costReference: '',
        chinaExamStatus: 2, // 中国区选拔考试 1为启用，2为禁用 ，与直升方案状态互斥
        chinaApplicatCondit: '',
        chinaCostReference: '',
        profLabelType: 2, // 专业标签类型,1为选择，2为填写
        profLabel: `留学专${common.getRandomNum(3)}`,
        ticket: PLAT_TICKET,
    }, params)
    return json;
}