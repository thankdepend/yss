const user = require('../../../reqApi/platfrom/user');
const {
    common
} = require('../../../lib/index');

let argv = require('yargs').argv;

/**
 * 我的顾问
 */
class CounSelor {
    constructor() {
        this.counSelorMain = new CounSelorMain()
    }

    /** 
     * 保存平台顾问用户
     * @alias 为了不乱刷顾问，不做这一步
     */
    async saveCounSelor () {
        let json = {
            yongHuMing: `ptgw-${common.getRandomStr(5)}`,
            yongHuKL: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 123456,
            agginYongHuKL: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 123456,
            yongHuLB: 620,
            // XinXiYT: 1,
            // xueXiaoID: 66777,
            // kaoDianID: 644,
            ticket: PLAT_TICKET
        }
        console.log(json);
        const res = await user.saveUser(json);
        console.log(res);
    }


}

const counSelorManage = module.exports = {};

/** 初始化顾问 */
counSelorManage.setupCounSelor = function () {
    return new CounSelor();
}

/** 列表获取顾问实例 */
counSelorManage.getInstanceCounSelor = async function () {
    let counSelor = new CounSelor();
    const userDataList = await user.getUserList({
        yongHuLB: 620,
        useFlag: 1,
        ticket: PLAT_TICKET,
    }).then(res => res.result.datas.page.dataList);
    // 返回一个随机的顾问对象
    Object.assign(counSelor.counSelorMain, userDataList[common.getRandomNum(0, userDataList.length - 1)])
    return counSelor;
}

/**
 * 顾问主要信息
 */
class CounSelorMain {
    constructor() {
        /** 用户id */
        this.yongHuID = '';
        /** 证件类型 */
        this.zhengJianLX = '';
        /** 身份证号 */
        this.shenFenZH = '';
        /** yongHuKL */
        this.yongHuKL = '';
        /** 用户名 */
        this.yongHuMing = '';
        /** 用户类别 */
        this.yongHuLB = '';
        /** 学校id */
        this.xueXiaoID = '';
        /** 考试id */
        this.kaoShiID = '';
        /** 考点id */
        this.kaoDianID = '';
        /** zhuCeFS */
        this.zhuCeFS = '';
        /** zhuCeLY */
        this.zhuCeLY = '';
        /** shouJiHao */
        this.shouJiHao = '';
        /** qQ */
        this.qQ = '';
        /** email */
        this.email = '';
        /** weiXinHao */
        this.weiXinHao = '';
        /** zhuCeSJ */
        this.zhuCeSJ = '';
        /** wenTi */
        this.wenTi = '';
        /** daAn */
        this.daAn = '';
        /** xinXiYT */
        this.xinXiYT = '';
        /** kaoShengXM */
        this.kaoShengXM = '';
        /** gaoKaoSF */
        this.gaoKaoSF = '';
        /** shouJi */
        this.shouJi = '';
        /** kaoShengHao */
        this.kaoShengHao = '';
        /** freezeFlag */
        this.freezeFlag = '';
        /** mobileAuthFlag */
        this.mobileAuthFlag = '';
        /** fingerPasswd */
        this.fingerPasswd = '';
        /** useFlag */
        this.useFlag = '';
        /** enableFlag */
        this.enableFlag = '';
        /** noAuthmobileNo */
        this.noAuthmobileNo = '';
        /** artCardFlag */
        this.artCardFlag = '';
        /** extStr */
        this.extStr = '';
        /** postAuth */
        this.postAuth = '';
        /** idCardNoAuthFlag */
        this.idCardNoAuthFlag = '';
        /** tipPhone */
        this.tipPhone = '';
        /** kaoShiMC */
        this.kaoShiMC = '';
        /** kaoDianMC */
        this.kaoDianMC = '';
        /** xueXiaoMC */
        this.xueXiaoMC = '';
        /** sid */
        this.sid = '';
        /** authCode */
        this.authCode = '';
        /** smsCode */
        this.smsCode = '';
        /** updateXinXiYTToNull */
        this.updateXinXiYTToNull = '';
        /** notifyMobile */
        this.notifyMobile = '';
        /** idCardRegister */
        this.idCardRegister = '';
        /** passportOrGangAoRegister */
        this.passportOrGangAoRegister = '';
        /** studnet */
        this.studnet = '';
        /** selected */
        this.selected = '';
        /** yongHuLBStr */
        this.yongHuLBStr = '';
        /** zhuCeLYDesc */
        this.zhuCeLYDesc = '';
        /** zhengJianLXDesc */
        this.zhengJianLXDesc = '';
        /** zhuCeSJStr */
        this.zhuCeSJStr = '';
        /** schoolAdmin */
        this.schoolAdmin = '';
        /** schoolSiteAdmin */
        this.schoolSiteAdmin = '';
        /** admin */
        this.admin = '';
        /** canEdit */
        this.canEdit = '';
        /** enableFlagStr */
        this.enableFlagStr = '';
        /** useFlagStr */
        this.useFlagStr = '';
        /** freezeFlagStr */
        this.freezeFlagStr = '';
        /** shouJiHaoStr */
        this.shouJiHaoStr = '';
        /** createdOnStr */
        this.createdOnStr = '';
        /** modifiedOnStr */
        this.modifiedOnStr = '';
    }
}