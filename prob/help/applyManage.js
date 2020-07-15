const user = require('../../reqApi/user');
const {
    common
} = require('../../lib/index');


class Apply {
    constructor() {
        /** 用户id */
        this.userId = '';
        /** 日程id */
    }

    /** 完善考生信息 */
    async saveStuinfo(params) {
        const res = await user.saveStuinfo(params);
        console.log('打印保存信息', res);
    };

    /** 查询考生信息 */
    async getStuinfo(params) {
        const res = await user.getStuinfo(params);
        console.log('打印完善信息', res);
    };


}


const applyManage = module.exports = {};

applyManage.setupApply = function () {
    return new Apply();
}

applyManage.mockExamineeJson = function (params) {
    let examineeJson = Object.assign({
        data: {
            m: "",
            p: {
                'zhengJianLX': 3, // 证件类型
                'shenFenZH': `${LOGINDATA.loginName}`,
                'kaoShengXM': `XM-${common.getRandomChineseStr(3)}`,
                'xingBie': `${['男', '女'][common.getRandomNum(0, ['男', '女'].length - 1)]}`,
                'chuShengRQ': `${common.getCurrentDate()}`,
                "minZu": "汉族",
                'tongXinDZExt': "230000-230300",
                'tongXinDZ': common.getRandomStr(5),
                'addressee': "杭州市余杭未来科技城",
                'shouJi': common.getRandomMobile(),
                'tongXinYB': 558855,
                'jiaZhangDH': common.getRandomMobile(),
                'qQ': "",
                'xueLi': "初中",
                'stuType': 2,
                'gaoKaoSFH': 340000,
                'gaoKaoSF': "安徽省",
                'zhengZhiMM': "团员",
                'suoZaiXX': common.getRandomStr(5),
                'kaoShengHao': "",
                'yingWangJie': "应届",
                'wenLiKe': "不分文理",
                'name': [common.getRandomStr(3)],
                'relation': ["父亲"],
                'companyName': [common.getRandomStr(3)],
                'job': [`obj-${common.getRandomStr(3)}`],
                'phoneNumber': [common.getRandomMobile()],
                'huKou': "",
                'qualifyAuth': "",
                'passFlag': "",
                'grade': ""
            }
        },
        ticket: TICKET,
    }, params)
    return examineeJson;
}