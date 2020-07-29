const user = require('../../reqApi/user');
const service = require('../../reqApi/app/service');
const {
    common
} = require('../../lib/index');
const doc = require('../data/doc.json');
const caps = require('../../data/caps');


class Fill {
    constructor() {
        /** 用户id */
        this.userId = '';
        /** 日程id */
        /** 证件类型 */
        this.zhengJianLX = 3;
        /** 身份证号 */
        this.shenFenZH = '';
        /** 考生姓名 */
        this.kaoShengXM = '';
        /** 性别 */
        this.xingBie = '';
        /** 出生日期 */
        this.chuShengRQ = '';
        /** 民族 */
        this.minZu = '';
        /** 通信地址地区号 */
        this.tongXinDZExt = '';
        /** 通信地址 */
        this.tongXinDZ = '';
        /** 地址 */
        this.addressee = '';
        /** 手机号 */
        this.shouJi = '';
        /** 通信yb */
        this.tongXinYB = '';
        /** 家长电话 */
        this.jiaZhangDH = '';
        /** QQ */
        this.qQ = '';
        /** 学历 */
        this.xueLi = '';
        /** 学生类型 */
        this.stuType = '';
        /** 高考省份号 */
        this.gaoKaoSFH = '';
        /** 高考省份 */
        this.gaoKaoSF = '';
        /** 政治面貌 */
        this.zhengZhiMM = '';
        /** 所在xx */
        this.suoZaiXX = '';
        /** 考生号 */
        this.kaoShengHao = '';
        /** 应往届 */
        this.yingWangJie = '';
        /**文理科 */
        this.wenLiKe = '';
        /**名字 */
        this.name = '';
        /**身份 */
        this.relation = [];
        /**工作单位 */
        this.companyName = [];
        /**工作 */
        this.job = [];
        /**家长联系电话列表 */
        this.phoneNumber = [];
        /** */
        this.huKou = '';
        /** */
        this.qualifyAuth = '';
        /** */
        this.passFlag = '';
        /** */
        this.grade = '';
    }

    /** 完善考生信息 */
    async saveStuinfo(params) {
        const res = await user.saveStuinfo(params);
        Object.assign(this, params.data.p);
        console.log('打印保存信息', res);
    };

    /** 查询考生信息 */
    async _getStuinfo(params) {
        const res = await user.getStuinfo(Object.assign({
            data: {
                "m": "",
                "p": {}
            },
            ticket: TICKET
        }, params));
        return res;
    };

    /** 考生信息断言 */
    async stuinfoAssert() {
        const stuinfo = await this._getStuinfo();
        // console.log('期望值', this);
        console.log('实际值', stuinfo);
        common.isApproximatelyEqualAssert(this, stuinfo);
    }

    /** 上传图片 */
    async uploadAuth(params) {
        let kaoSImg = doc[caps.name].peolpe.longUrl[common.getRandomNum(0, doc.pre.peolpe.longUrl.length - 1)];
        const uploadRes = await service.uploadAuth(Object.assign({
            data: {
                "p": {
                    "ord": "1",
                    "resUrl": kaoSImg,
                    "typeName": "给考生拍照",
                    "tId": 9,
                    "typeCode": "Photo"
                },
                "m": ""
            },
            ticket: TICKET,
        }, params));
        console.log('上传结果', uploadRes);
    }

    /** 上传身份证 */
    async uploadShenFen(params) {
        let shenFenImg = doc[caps.name].peolpe.longUrl[common.getRandomNum(0, doc.pre.peolpe.longUrl.length - 1)];
        const res = await service.uploadAuth(Object.assign({
            data: {
                "p": {
                    "ord": "2",
                    "resUrl": shenFenImg,
                    "cardFlag": 2,
                    "typeName": "上传身份证(姓名页)",
                    "nameFlag": 2,
                    "tId": 6,
                    "typeCode": "IDPhoto"
                },
                "m": ""
            },
            ticket: TICKET,
        }, params));
        console.log('上传身份证', res);
    };

    /** 上传在籍证明 */
    async uploadProve(params) {
        let proveImg = doc[caps.name].peolpe.longUrl[common.getRandomNum(0, doc.pre.peolpe.longUrl.length - 1)];
        const res = await service.uploadAuth(Object.assign({
            data: {
                "p": {
                    "ord": "3",
                    "resUrl": proveImg,
                    "typeName": "在籍证明(附中)",
                    "tId": 7,
                    "typeCode": "ArtPhoto"
                },
                "m": ""
            },
            ticket: TICKET,
        }, params));
        console.log('上传在籍证明', res);
    }

    /** 上传审核视频 */
    async uploadVideo(params) {
        let video = doc[caps.name].peolpe.longUrl[common.getRandomNum(0, doc.pre.peolpe.longUrl.length - 1)];
        const res = await service.uploadAuth(Object.assign({
            data: {
                "p": {
                    "ord": "4",
                    "resUrl": video,
                    "typeName": "录制考生视频",
                    "tId": 8,
                    "typeCode": "video"
                },
                "m": ""

            },
            ticket: TICKET,
        }, params));
        console.log('上传视频', res);
    }

    /** 确认提交 */
    async uploadAuthCommit(params) {
        const res = await service.uploadAuthCommit(Object.assign({
            data: {
                "p": {
                    "serviceType": "1"
                },
                "m": ""
            },
            ticket: TICKET
        }, params))
        console.log('确认提交', res);
    }

    /** 资料上传查询 */
    async queryUpload(params) {
        const res = await service.queryUpload(Object.assign({
            data: {
                "p": {},
                "m": ""
            },
            ticket: TICKET
        }, params))
        console.log('查询提交', res);
    }



}


const fillManage = module.exports = {};

fillManage.setupFill = function () {
    return new Fill();
}

fillManage.mockExamineeJson = function (params) {
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