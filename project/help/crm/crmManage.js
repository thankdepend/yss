const user = require('../../../reqApi/platfrom/user');
const crm = require('../../../reqApi/platfrom/crm');
const wishApp = require('../../../reqApi/app/wish');
const info = require('../../../reqApi/app/info');
const {
    common
} = require('../../../lib/index');


/**
 * 我的顾问
 */
class Crm {
    constructor() {
        // this.threadedMain = new ThreadedMain();
        // this.threadedMap = new Map()

        /** 国家列表 */
        this.willCountryList = ['英国', '韩国', '俄罗斯', '意大利', '德国', '日本', '美国', '澳大利亚', '其他'];
    }

    /** 
     * 添加意向征集表
     */
    async addStudycollect () {
        const professionIdList = [1, 14, 15, 16, 17, 10]

        const randomProfessID = professionIdList[common.getRandomNum(0, professionIdList.length - 1)];
        const res = await wishApp.addStudycollect({
            data: {
                m: '',
                p: {
                    userName: `mh-${common.getRandomStr(4)}`,
                    professionId: randomProfessID,
                    professionRemark: randomProfessID == 1 ? '纯艺方向' : randomProfessID == 14 ? '设计方向' : randomProfessID == 15 ? '传媒方向' : randomProfessID == 16 ? '音乐' : randomProfessID == 17 ? '舞蹈' : randomProfessID == 10 ? '其他' : '',
                    willCountry: this.willCountryList[common.getRandomNum(0, this.willCountryList.length - 1)],
                    phoneNumber: common.getRandomMobile(),
                    willTakeExam: common.getRandomNum(1, 3), // 是否参加高考:1参加，2不参加，3待定
                    studyBudget: common.getRandomNum(1, 4), // 预算类型
                    profAvgScore: common.getRandomNum(1, 300), // 专业平均分
                    cultureAvgScore: common.getRandomNum(1, 100), // 文化平均分
                    parentPhone: common.getRandomMobile()
                }
            },
            ticket: TICKET
        });
        res.params.customerSource = 1
        // await this.updateThreaded(res.params);
        console.log(res);
    }

    /**
     * 添加留学咨询评论
     */
    async addInfoComment () {
        const studyAbroadList = await info.getStudyAbroad({
            data: {
                "p": {
                    "provinceCode": "330000",
                    "infoCategoryID": "6", // 留学为6
                    "curPage": "1",
                    "pageSize": "10",
                    "topicID": "6"
                },
                "m": ""
            },
            ticket: TICKET
        }).then(res => res.result.datas.page.dataList)
        // console.log('studyAbroadList', studyAbroadList);
        // studyAbroadList[common.getRandomNum(0, studyAbroadList.length - 1)].

        // app首页 -> 留学资讯
        // await info.queryInfoList()
        const addData = {
            // 写死一个帖子
            data: {
                "m": "",
                "p": {
                    infoID: '26655',
                    "infoCategoryID": "6",
                    'infoCategoryName': '留学',
                    // "infoID": studyAbroadList[common.getRandomNum(0, studyAbroadList.length - 1)].infoID,
                    // "infoTitle": studyAbroadList[common.getRandomNum(0, studyAbroadList.length - 1)].infoTitle,
                    infoTitle: '留学？？测试标题',
                    "content": common.getRandomContent(20)
                }
            },
            ticket: TICKET
        }
        const addCommentRes = await info.addInfoComment(addData);
        console.log(addCommentRes);
    }

    /** 
     * 新增留学私信咨询发送CRM
     */
    async wishPrivatechat () {
        const wishPrivatechatData = await info.wishPrivatechat({
            data: {
                m: "",
                p: {
                    customerUserId: "70000145",
                    customerMobile: common.getRandomMobile(),
                    customerNickName: `mh-${common.getRandomStr(4)}`,
                    customerIdCard: `${common.getRandomNum(100000000, 9999999999)}`,
                    extendsJson: JSON.stringify({
                        countryName: this.willCountryList[common.getRandomNum(0, this.willCountryList.length - 1)],
                        profName: '室内设计'
                    })
                }
            },
            ticket: TICKET
        })
        console.log(wishPrivatechatData);
        console.log(wishPrivatechatData.params.data);
    }

    /**
     * 更新线索
     */
    async updateThreaded (params) {
        await this.publicListCustomer(params);
        console.log('更新');
        // console.log(params);
    }

    /**
     * 查询公海-线索列表
     */
    async publicListCustomer (params) {
        const res = await crm.publicListCustomer(Object.assign({
            curPage: 1,
            pageSize: 10,
            customerType: 1,
            receiveStatus: 2,
            queryStartTime: 0,
            queryEndTime: 0,
            sortFiledStr: 'createdOn',
            customerSource: params.customerSource,
            ticket: PLAT_TICKET
        }, params))
        // .then(res => res.result.datas)
        console.log('hh', res.params);
        console.log('www', res);
        // const r = res.page.dataList.find(obj => obj.customerRealName == proFessReq.data.p.userName)
        // console.log(r);
    }

    /** 
     * 公海-线索列表 断言
     */
    async publicListCustomerAssert (params) {
        await this.publicListCustomer(params)
    }
}

const crmManage = module.exports = {};

/** 初始化顾问 */
crmManage.setupCrm = function () {
    return new Crm();
}

function ThreadedMap () {

}