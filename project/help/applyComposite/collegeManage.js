const base = require("../../../reqApi/platfrom/base");
const stuApp = require("../../../reqApi/app/stu");
const school = require('../../../reqApi/platfrom/school')
const { common } = require("../../../lib/index");
const dateHandler = require('../../../lib/dateHandler')
const yssLogin = require('../../help/base/yssLogin');
const doc = require("../../data/doc.json");
const account = require("../../data/account");
const caps = require("../../../data/caps");

class College {
    constructor() {
        /** 考试id*/
        this.kaoShiID = '';
        /** 考点id */
        this.kaoDianID = '';
        /** 专业id */
        this.profId = '';
        /** 科目id */
        this.esId = '';
        /** 考试专业id */
        this.kaoShizyID = '';
        //（以上参数假设脚本只有1对多情况使用）

        /** 学校信息 */
        this.collegeMain = new CollegeMain();
        /** 考点map */
        this.kaodianMap = new Map();
        /** 学校map */
        this.collegeMap = new Map();
        /** 考试map */
        this.examMap = new Map()
    }

    /**
     * 保存院校（新增/修改）
     * @param {Object} params 外部参数
     */
    async saveCollege (params) {
        const saveCollegeInfo = await base.toAddCollege(params);
        let collParams = saveCollegeInfo.params;

        this.updateCollege(collParams);
        // console.log("打印学校信息", saveCollegeInfo);
        return saveCollegeInfo;
    }

    /** 更新学校信息 */
    updateCollege (params) {
        common.update(this.schoolMain, params);
    }

    /** 查询院校列表 */
    async getCollegeList (params) {
        const res = await base.getCollegeList(params);
        console.log(res);
        return res;
    }

    /**
     * 搜索院校（考生）
     */
    async searchCollege (params = {}) {
        const searchContext = params.keyword || this.collegeMain.xueXiaoMC;
        const res = await stuApp.seekCollege({
            data: {
                m: "",
                p: {
                    keyword: searchContext,
                },
            },
            ticket: TICKET,
        }).then((res) => res.result.datas.list);
        const searchRes = res.find((obj) => obj.xueXiaoMC == searchContext);
        // console.log(searchRes);
        return searchRes;
    }

    /**
     * 搜索院校断言
     */
    async searchCollegeAssert () {
        const searshRes = await this.searchCollege();

        const searchExp = {
            xueXiaoID: searshRes.xueXiaoID,
            xueXiaoMC: searshRes.xueXiaoMC,
            schoolType: searshRes.schoolType, // 1为签约、2为非签约
            subscribeNum: searshRes.subscribeNum,
        };
        const searchActual = this.collegeMain;
        // console.log("期望值", searchExp);
        // console.log("实际值", searchActual);
        common.isApproximatelyEqualAssert(searchExp, searchActual);
    }

    /**
     * 保存院校专业
     */
    async saveBacthProfession () {
        await base.saveBacthProfession();
    }

    /**
     * 查询院校专业列表（考生用）
     */
    async getProfList (params) {
        const queryParams = Object.assign({
            data: {
                "m": "",
                "p": {
                    "xueXiaoID": this.collegeMain.xueXiaoID,
                    "baoKaoBZList": [1, 2, 3]
                    // 报考标志全填，展示所有
                }
            },
            ticket: TICKET
        }, params);
        const res = await stuApp.getProf(queryParams);
        console.log('专业', res);
    }

    /**
     * 查询考试（考生用）
     */
    async getProfList (params) {
        const queryExamSiteParams = Object.assign({
            data: {
                "m": "",
                "p": {
                    "xueXiaoID": this.collegeMain.xueXiaoID
                }
            },
            ticket: TICKET
        }, params);
        await stuApp.getExamSite(queryExamSiteParams);
    }



    /**
     * 查询考点（考生用）
     */
    async getSchoolSite (params) {
        const schoolSiteParams = Object.assign({
            data: {
                "m": "",
                "p": {
                    "xueXiaoID": this.collegeMain.xueXiaoID,
                    // "kaoShiId":
                }
            },
            ticket: TICKET
        }, params);
        await stuApp.getSchoolSite(schoolSiteParams);
    }


    /**
     * 院校常用专业库新增
     */
    async saveProfession () {
        const res = await base.saveBacthProfession();
        console.log(res);
    }

    /**
     * 查询院校常用专业库列表
     */
    async getProfessionInfoList (params) {
        const profList = await base.getprofessionInfoList(Object.assign({
            year: new Date().getFullYear(),
            currentFlag: 1,
            zhuanYeMC: '',
            curPage: 1,
            pageSize: 15,
            ticket: PLAT_TICKET,
        }, params));
        return profList;

    }


    /**
     * @alias (自动添加考试专业)
     * @alias 需要传考试，默认今年的考试
     * @alias 查询专业列表库
     * @alias 获取考试id/如果传递就不获取了
     * @alias 检查该考试有没有添加全部专业库为考试专业
     */
    async autoAddExamProf (kaoShiID) {
        let kaoShiId = kaoShiID || undefined, ksID;
        const pageRes = await this.getProfessionInfoList().then(res => res.result.datas);
        // 查询2次是为了获取全部专业
        const professionRes = await this.getProfessionInfoList({
            pageSize: pageRes.page.totalSize,
        }).then(res => res.result.datas.professionList);
        // console.log('列表',professionRes);

        if (kaoShiId != undefined) {
            ksID = kaoShiId
        } else {
            ksID = await school.getExamList({
                kaoShiND: new Date().getFullYear() + 1,
                ticket: PLAT_TICKET
            }).then(res => res.result.datas.page.dataList[0].kaoShiID)
            console.log(ksID);
        }
        for (let prof of professionRes) {
            // 查询考试专业列表
            let aExamProf = await school.getExamProfList({
                zhuanYeID: prof.zhuanYeID,
                kaoShiID: ksID,
                ticket: PLAT_TICKET
            });
            console.log(aExamProf.result.datas.page);
            if (aExamProf.result.datas.page.dataList.length == 0) {
                console.log(1);
                const examProf = await school.saveExamProfAdd({
                    kaoShiID: ksID, // 编辑要传
                    profType: 1,
                    profTypeId: 0,
                    zhuanYeID: prof.zhuanYeID,
                    ticket: PLAT_TICKET
                });
                console.log('保存考试专业', examProf);
            }
        }
        this.kaoShiID = ksID;
        await this._saveExamMap(ksID)

    }

    /**
     * 保存考试map
     * @alias 私有方法
     */
    async _saveExamMap (ksID) {
        // 加完考试专业的同时，我们需要把考试存起来
        const kaoShiDataList = await school.getExamList({
            kaoShiND: new Date().getFullYear() + 1,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList)
        let kaoShi = this.examMap.has(ksID) ? this.examMap.get(ksID) : new ExamMap();
        common.update(kaoShi, kaoShiDataList.find(obj => obj.kaoShiID == ksID))
        this.examMap.set(ksID, kaoShi)
        console.log('考试map', this.examMap);
    }

    /**
     * 查询考点
     */
    async getExamSite () {
        const res = await base.getsiteInfoList();
        return res
    }

    /**
     * 更新考点列表第一条为class的考点id
     */
    async updateExamSiteFirst () {
        const site = await this.getExamSite();
        this.kaoDianID = site.datas.page.dataList[0].kaoDianID
    }


    /**
     * @alias 自动添加报名时间
     * @alias 查询考试时间列表,没有就加一个,有就不加
     */
    async autoAddApplyTime () {
        await this.updateExamSiteFirst();

        const siteList = await school.getsiteDataList({
            kaoShiID: this.kaoShiID,
            kaoDianID: this.kaoDianID,
            timeType: 0,
            timeState: 0,
            curPage: 1,
            pageSize: 15,
        })
        // 考点列表小于1个考点，新增一个考点，不然就不加
        if (siteList.datas.page.dataList.length < 1) {
            // 保存报名时间
            await school.saveExamSite({
                kaoShiKDID: 1241587,
                canNull: 1,
                visible: 1,
                wangBaoKSSJ: common.getCurrentTime(),
                wangBaoJSSJ: common.getMonthGap(),
                wangShangQRKSSJ: common.getCurrentTime(),
                wangShangQRJSSJ: common.getMonthGap(),
                xianChangQRKSSJ: '',
                xianChangQRJSSJ: '',
                daYinKSSJ: '',
                daYinJSSJ: '',
            });
        }

    }

    /**
     * 保存考试
     */
    async saveExam () {
        const monthArr = ['1-2月', '3-4月', '5-6月', '7-8月', '9-10月', '11-12月']
        const params = {
            kaoShiMC: `${new Date().getFullYear()}年本科招生`,
            kaoShiYF: `${monthArr[common.getRandomNum(1, monthArr.length)]}`,
            kaoShiND: new Date().getFullYear()
        };
        const res = await school.saveExam(Object.assign({
            // kaoShiID: , //编辑要传
            kaoShiMC: '2021年测试考试',
            kaoShiND: 2021, //  考试年度
            kaoShiYF: '1-2月', // 考试月份
            xianKaoZYS: 0, // 限考志愿数
            zhiYuanShu: 0, // 专业志愿限报数
            kaiTongBZ: 1, // 1为开通
            ticket: PLAT_TICKET
        }, params));
        console.log('保存考试', res);
    }

    /**
     * 保存考试专业科目
     */
    async saveSubject (params) {
        // 专业id和考试id一定要在这个位置更新
        this.profId = params.profId;
        this.kaoShiID = params.kaoShiID;

        // 获取最大科目数
        const total = await this.getMaxTotalSub(params);

        const res = await school.saveExamProfSub({
            examProfSubject: [
                Object.assign({
                    kaoShiID: '',
                    profId: '',
                    ord: total + 1,
                    subjectName: `AutoGen-Subject${common.getRandomStr(4)}`,
                    remark: "",
                    shootFlag: 2,
                    shootType: [],
                    scoreScanStr: "",
                    calculateMode: 1,
                }, params)],
            ticket: PLAT_TICKET
        });

        // 获取科目id
        const esId = await this.getEsid();


        this.esId = esId
        console.log(esId);
        this.kaoShizyID = await this.getKaoShiZyId();
        return total + 1;
    }

    /**
     * 获取科目id
     */
    async getEsid () {
        let totalNum = await this.getMaxTotalSub()
        // console.log('考试id', this.kaoShiID);
        const esId = await school.getSubjectList({
            kaoShiID: this.kaoShiID,
            zhuanYeID: this.profId,
            curPage: 1,
            pageSize: totalNum,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList[res.result.datas.page.dataList.length - 1].esId)

        return esId;
    }

    /**
     * 获取考试专业id
     */
    async getKaoShiZyId () {
        // 方案1
        // const res = await school.getExamProfList({
        //     kaoShiID: this.kaoShiID,
        //     zhuanYeID: this.profId,
        //     ticket: PLAT_TICKET
        // });
        // const kaoShiZy = res.result.datas.page.dataList[0]
        // // console.log('kaoShiZy', kaoShiZy);
        // const kaoShiZyId = kaoShiZy.kaoShizyID;
        // // console.log('kaoShiZyId', kaoShiZyId);
        // return kaoShiZyId;

        // 方案2
        const res = await school.examProf({
            kaoShiID: this.kaoShiID,
            ticket: PLAT_TICKET
        })
        const kaoShiZyId = res.result.datas.examProfList[0].kaoShizyID
        return kaoShiZyId;
    }


    /**
     * 获取最大科目数
     */
    async getMaxTotalSub (params) {
        const subjectData = await school.getSubjectList(Object.assign({
            curPage: 1,
            pageSize: 15,
            ticket: PLAT_TICKET
        }, params));
        const subjectTotalSize = subjectData.result.datas.page.totalSize;
        return subjectTotalSize
    }

    /**
     * 获取本考试本专业下所有科目列表
     */
    async getAllSubjectList () {
        const subjectData = await school.getSubjectList({
            urPage: 1,
            pageSize: 15,
            ticket: PLAT_TICKET
        });
        const subjectTotalSize = subjectData.result.datas.pages.totalSize;
        const allSubjectData = await school.getSubjectList({
            urPage: 1,
            pageSize: subjectTotalSize,
            ticket: PLAT_TICKET
        });
        return allSubjectData;
    }

    /**
     * 保存考试科目
     */
    async saveSubjectInfo (params, mode) {
        const pas = await this.mockSubjectJson(params, mode)
        // console.log(pas);
        const res = await school.saveSubjectInfo(pas);
        console.log(res);
    }

    /**
     * 根据名称搜索
     * @alias 考试、专业
     */
    async searchByNameAll (params) {
        let data = {
            kaoShiID: '',
            zhuanYeID: '',
        };
        // console.log('入参', params);
        const kaoShiID = await this.searchExamId(params.kaoShiMC);
        data.kaoShiID = kaoShiID;
        const zhuanYeID = await this.searchProfId({
            kaoShiID: kaoShiID,
            zhuanYeMC: params.zhuanYeMC
        });
        data.zhuanYeID = zhuanYeID;
        return data;
    }

    /**
     * 搜索考试
     */
    async searchExamId (kaoShiMC) {
        const examList = await school.getExamList({
            kaoShiND: new Date().getFullYear(),
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList);
        // console.log(examList);
        const kaoShiID = examList.find(obj => obj.kaoShiMC == kaoShiMC).kaoShiID;
        return kaoShiID;
    }

    /**
     * 搜索考试专业
     */
    async searchProfId (params) {
        const examProfList = await school.getExamProfList({
            kaoShiID: params.kaoShiID,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList);
        const zhuanYeID = examProfList.find(obj => obj.zhuanYeMC == params.zhuanYeMC).zhuanYeID;
        return zhuanYeID;
    }

    /**
     * 科目编辑参数模拟
     */
    async mockSubjectJson (params, mode) {
        let satTime = dateHandler.getCurrentTime()
        let endTime = dateHandler.getMonthGap()

        // 监考笔试类
        let invigilate = {
            esId: '', // 考试专业科目ID
            kaoShizyID: '', // 考试专业ID
            subjectExtendDataUrl: '', // 科目扩展信息数据Oss地址
            subjectName: `监考笔试类-${common.getRandomStr(4)}`, // 科目名称
            examMode: 2, // 考试模式
            subjectTotalScore: 100, // 科目总分
            riChengID: 0, // 日程id
            kaoShiRQSM: '', // 考试日期说明
            showStatus: 1, // 考生科目显示状态 0-不显示 1-显示
            syncExamStatus: 1, // 是否同时考
            ord: 2, // 序号
            shootLimitType: 2, // 拍摄限制 1-不限制 2-按拍摄次数 3-按保存次数
            maxShootCount: 20, // 最大录制次数
            maxSaveCount: 3, // 最大保存次数
            videoLength: 600, // 视频长度（秒）
            minute: 10, // 录制时长（分）
            second: 0, // 录制时长（秒）
            timeExplain: '10分钟', // 考试时间说明
            screenStatus: 1, // 手机拍摄默认横竖屏 1-横屏 2-竖屏
            cameraDirection: 1, // 前后置摄像头 1-不限制 2-前置摄像头 3-后置摄像头
            definition: 3, // 视频清晰度 1-高清晰度 2-中清晰度 3-低清晰度
            showQuesMode: 1,  // 考题查看模式:0普通模式 1录制时同时查看考题
            allowStuExplain: 0, // 考试说明开关
            attachmentExplain: '', // 考试说明文案
            allowAttachment: 1, // 附件照片上传开关 1-允许上传,0为关闭
            picExplain: '请上传1张图片', // 图片上传说明
            externalDeviceCheck: 1, // 外部设备检测开关 1-检测 2-不检测
            breakRecordStatus: 2, // 中断录制：1、是 2、否
            allowBreakSeconds: '', // 允许中断时长，单位秒
            allowBreakTimes: '', // 允许中断时长，单位秒
            commitPaperPre: 2, // 提前交卷开关 1-允许 2-不允许
            faceRecognition: 2, // 人脸识别开关：1-开启，2-关闭
            recognitionConfidence: '', // 识别置信度
            mustRecognitionSuccess: 2, // 是否必须认证通过：1-是，2-否
            takeAnswerSheetTimeLength: '',
            takePaperPhotoLimitMinutes: '',
            takePaperPhotoLimitSeconds: '',
            examContent: `考试内容-${common.getRandomWord(6)}`, // 考试内容
            examExplain: `考试说明-${common.getRandomWord(6)}`, // 考试说明
            shootExamPromise: `承诺书-${common.getRandomWord(6)}`, // 考试承诺书
            videoTempUrl: '', // 样例视频（仅在模拟考使用）
            seeProblemOnRecordingPage: 1, // 是否允许在录制页面看题：1-是，2-否
            checkStartTime: satTime, // 检录开始时间
            showQuesStartDate: satTime, // 审题开始时间
            closeQuesDate: '', // 关闭考题时间
            shootStartDate: satTime, // 录制开始时间
            latestInTime: '', // 最迟进入时间
            // readyVoiceCommandsUrl: doc[caps.name].voice[0], // 准备开始语音指令
            // readyVoiceCommandsLength: 3, // 准备开始语音指令时长
            // readyTimeLength: 10, // 准备开始时长(秒)
            // reviewVoiceCommandsUrl: doc[caps.name].voice[0], // 审题开始语音指令
            // reviewVoiceCommandsLength: 3, // 审题开始语音指令时长
            // reviewTimeLength: 10, // 审题开始时长(秒)
            shootEndDate: endTime, // 拍摄截至时间
            commitPaperEndDate: endTime, // 提交答卷截至时间
            commitVideoStartDate: endTime, // 提交视频开始时间
            // sampleType: 0, // 抽题类型 0-普通抽题 1-手机看题 2-网页看题
            examiningTime: '', // 审题时间
            drawQuesLimit: 0, // 抽题限制:0-不限制 1-提交后再抽题
            examDirectUrl: '', // 考试指令地址
            examDirectLength: '', // 考试指令时长
            randomDirectUrl: '', // 随机指令地址
            timeOrder: 1, // 随机指令播放时间顺序（1-正序，2-倒序）
            randomDirectTimeMinutes: '', // 随机指令播放时间（分）
            randomDirectTimeSeconds: '', // 随机指令播放时间（秒）
            randomContent: '', // 随机指令文案
            cameraPositionLegendUrl: '', // 拍摄位置样例
            videoListTip: '', // 视频列表提示
            webUploadVedioStartTime: '', // 考生网页端上传考试视频开始时间
            webUploadVedioEndTime: '', // 考生网页端上传考试视频结束时间
            localStoreFlag: 2, // 视频本地存储备份开关 1-允许 2-不允许
            localVideoUploadFlag: 2, // 本地视频上传开关 1-允许 2-不允许
            clientUploadFlag: 2, // 客户端上传开关 1-允许 2-不允许
            ticket: PLAT_TICKET,
        }

        // 视频录制类
        let transcribe = {
            esId: '',
            kaoShizyID: '',
            subjectExtendDataUrl: 'http://img.artstudent.cn/pr/2021-01-21/16f595c1b01b49e6bdb4699e8dd2c38c.json',
            subjectName: '自动化测试科目1（视频录制类）',
            examMode: 1,
            subjectTotalScore: 100,
            riChengID: 0,
            kaoShiRQSM: '',
            showStatus: 1,
            syncExamStatus: 1,
            ord: '',
            shootLimitType: 2,
            maxShootCount: 20,
            maxSaveCount: 3,
            videoLength: 600,
            minute: 10,
            second: 0,
            timeExplain: '10分钟',
            screenStatus: 1,
            cameraDirection: 1,
            definition: 2,
            showQuesMode: 0,
            allowStuExplain: 0,
            attachmentExplain: '',
            allowAttachment: 0,
            picExplain: '哈哈哈',
            // takeAnswerSheetTimeLength: '',
            // takePaperPhotoLimitMinutes: '',
            // takePaperPhotoLimitSeconds: '',
            externalDeviceCheck: 1,
            breakRecordStatus: 2,
            // allowBreakSeconds: '',
            // allowBreakTimes: '',
            commitPaperPre: 2,
            faceRecognition: 2,
            // recognitionConfidence: '',
            mustRecognitionSuccess: 2,
            whenToCheck: 1,
            paperCheck: 2,
            mustCheckPaperSuccess: 2,
            showPortraitFrame: 1,
            commitAfterWatchVideo: 2,
            examContent: '考试内容',
            examExplain: '考试说明',
            // shootExamPromise: '',
            // videoTempUrl: '',
            seeProblemOnRecordingPage: 2,
            // checkStartTime: '',
            // showQuesStartDate: '',
            allowCleanLastInTime: 1,
            // closeQuesDate: '',
            // shootStartDate: '',
            // latestInTime: '',
            openWaitStage: 2,
            // waitExamVoiceCommandsUrl: '',
            // waitExamVoiceCommandsText: '',
            // waitExamVoiceCommandsLength: '',
            // waitExamTimeLength: '',
            // waitingNotes: '',
            openReviewStage: 2,
            // reviewVoiceCommandsUrl: '',
            // reviewVoiceCommandsText: '',
            // reviewVoiceCommandsLength: '',
            // reviewTimeLength: '',
            openReadyStage: 2,
            // readyVoiceCommandsUrl: '',
            // readyVoiceCommandsText: '',
            // readyVoiceCommandsLength: '',
            // readyTimeLength: '',
            showPaper: 2,
            readyNotes: '',
            shootEndDate: '',
            // commitPaperEndDate: '',
            // commitVideoStartDate: '',
            // sampleType: 0,
            examiningTime: '',
            drawQuesLimit: 0,
            subjectAudioType: 1,
            // examDirectUrl: 'http://img.artstudent.cn/pr/2021-01-21/34af819534f940949433810f99af40de.mp3',
            examDirectLength: 3,
            examCallType: 0,
            examCallOrder1: 1,
            // cameraPositionLegendUrl: '',
            showPaperStage: 2,
            // showPaperVoiceCommandsUrl: '',
            // showPaperVoiceCommandsText: '',
            // showPaperVoiceCommandsLength: '',
            // showPaperTimeLength: '',
            // videoListTip: '',
            // webUploadVedioStartTime: '',
            // webUploadVedioEndTime: '',
            localStoreFlag: 2,
            localVideoUploadFlag: 2,
            clientUploadFlag: 2,
            ticket: PLAT_TICKET,
        }

        let kgTi = {
            esId: '',
            kaoShizyID: '',
            subjectExtendDataUrl: '',
            subjectName: `客观题-同时-${common.getRandomStr(4)}`,
            examMode: 5,
            subjectTotalScore: 100,
            riChengID: '',
            kaoShiRQSM: '',
            showStatus: 1,
            syncExamStatus: 1, // 同时考为1，非同时为2
            ord: 5,
            shootLimitType: 2,
            maxShootCount: 3,
            maxSaveCount: 3,
            videoLength: 900,
            minute: 15,
            second: 0,
            timeExplain: '考试时长说明',
            screenStatus: 2,
            cameraDirection: 1,
            definition: 2,
            showQuesMode: 0,
            allowStuExplain: 0,
            attachmentExplain: '',
            allowAttachment: 0,
            picExplain: '',
            externalDeviceCheck: 1,
            breakRecordStatus: 2,
            allowBreakSeconds: '',
            allowBreakTimes: '',
            commitPaperPre: 2,
            faceRecognition: 2,
            recognitionConfidence: '',
            mustRecognitionSuccess: 2,
            takeAnswerSheetTimeLength: '',
            takePaperPhotoLimitMinutes: '',
            takePaperPhotoLimitSeconds: '',
            examContent: `考试内容-客观-同时-${common.getRandomStr(5)}`,
            examExplain: `考试说明-客观-同时-${common.getRandomStr(5)}`,
            shootExamPromise: `考生承诺书-客观-同时-${common.getRandomStr(5)}`,
            videoTempUrl: '',
            seeProblemOnRecordingPage: 2,
            checkStartTime: '',
            showQuesStartDate: satTime, // 审题开始时间
            closeQuesDate: '', // 考题关闭时间
            shootStartDate: satTime, // 录制开始时间
            latestInTime: '',
            readyVoiceCommandsUrl: '',
            readyVoiceCommandsLength: '',
            readyTimeLength: '',
            reviewVoiceCommandsUrl: '',
            reviewVoiceCommandsLength: '',
            reviewTimeLength: '',
            shootEndDate: endTime, // 拍摄截至时间
            commitPaperEndDate: endTime,
            commitVideoStartDate: endTime,
            sampleType: 0,
            examiningTime: '',
            drawQuesLimit: 0,
            examDirectUrl: '',
            examDirectLength: '',
            randomDirectUrl: '',
            timeOrder: 1,
            randomDirectTimeMinutes: '',
            randomDirectTimeSeconds: '',
            randomContent: '',
            cameraPositionLegendUrl: '',
            videoListTip: '',
            webUploadVedioStartTime: '',
            webUploadVedioEndTime: '',
            localStoreFlag: 2,
            localVideoUploadFlag: 2,
            clientUploadFlag: 2,
            ticket: PLAT_TICKET,
        }

        // 1为视频录制，2为监考笔试，3为客观题同时考，
        if (mode == 1) {
            // console.log('打印视频录制类参数', Object.assign(transcribe, params));
            return Object.assign(transcribe, params)
        } else if (mode == 2) {
            return Object.assign(invigilate, params)
        } else if (mode == 3) {
            return Object.assign(kgTi, params)
        }


    }
}

const collegeManage = module.exports = {};

/**
 * 初始化院校
 */
collegeManage.setupCollege = function () {
    return new College();
};

/** 
 * 初始化学校-列表已有数据
 */
collegeManage.setupCollegeByList = async function (params) {
    console.log('学校信息', params);
    let setupCollege = new College();
    let riChengMap = new Map();
    let kaoDianMap = new Map();

    // 为初始化学校添加学校信息
    Object.assign(setupCollege.collegeMain, params)

    // 获取考点
    const siteList = await stuApp.getExamSite({
        data: { m: "", p: { xueXiaoID: setupCollege.collegeMain.xueXiaoID } },
        ticket: TICKET
    });
    console.log(siteList);
    const examSiteList = siteList.result.datas.list[0].examSiteList
    console.log('获取考点', examSiteList);

    examSiteList.forEach(site => {
        let siteBase = {}
        siteBase.kaoShiKDID = site.kaoShiKDID;
        siteBase.kaoShiID = site.kaoShiID;
        siteBase.kaoDianID = site.kaoDianID;
        siteBase.xueXiaoID = site.xueXiaoID;
        let kaoDian = kaoDianMap.has(siteBase) ? kaoDianMap.get(siteBase) : new KaoDianMap();
        common.update(kaoDian, site)
        kaoDianMap.set(siteBase, kaoDian)
    })
    // const kdMc = '中国美术学院(测试)';
    const kdMc = examSiteList[0].kaoDianMC
    console.log('考点名称', kdMc);
    const kaoShiKDID = examSiteList.find(obj => obj.kaoDianMC == kdMc).kaoShiKDID;
    const kaoShiID = examSiteList.find(obj => obj.kaoDianMC == kdMc).kaoShiID;
    // const kaoShiKDID = 1241880;
    // const kaoShiID = 13061;


    // 获取日程
    const profList = await stuApp.queryExamSchedule({
        data: {
            m: "",
            p: {
                kaoShiKDID: kaoShiKDID,
                // kaoShiKDID: siteList.result.datas.list[0].examSiteList[0].kaoShiKDID,
                applyMode: null,
                kaoShiID: kaoShiID,
                // kaoShiID: siteList.result.datas.list[0].kaoShiID,
                xueXiaoID: setupCollege.collegeMain.xueXiaoID
            }
        }, ticket: TICKET
    });

    // console.log('日程请求头', profList.params);
    // console.log('日程列表', profList);
    // console.log('日程列表响应', profList.result.datas.list);

    // 将日程存储起来（因为日程存在多个，所以用map存储）
    profList.result.datas.list.forEach(obj => {
        let riChengID = obj.riChengID;
        let riCheng = riChengMap.has(riChengID) ? riChengMap.get(riChengID) : new CollegeMap();
        common.update(riCheng, obj)
        riChengMap.set(riChengID, riCheng)
    })

    // 合并map
    let merged = new Map([...setupCollege.collegeMap, ...riChengMap]);
    setupCollege.collegeMap = merged;
    console.log('实例', setupCollege);
    return setupCollege;
};

/** 
 * 返回1个学校实例-列表查询结果
 * @param {Number} schoolID 学校id
 */
collegeManage.returnCollege = async function (schoolID) {
    let argv = require('yargs').argv,
        college;
    // 写死
    if (argv.envName == 'pre') {
        college = await base.getCollegeList({
            xueXiaoMH: schoolID ? schoolID : 45600,
            ticket: PLAT_TICKET,
        })
            .then((res) => res.result.datas.page);
    } else if (argv.envName == 'test') {
        // 查院校列表
        college = await base.getCollegeList({
            xueXiaoMH: schoolID ? schoolID : 13166,
            ticket: PLAT_TICKET,
        }).then((res) => res.result.datas.page);
    } else if (argv.envName == 'online') {
        await yssLogin.platfrom({
            loginName: '90201',
            password: 'Yss90201'
        })
        college = await base.getCollegeList({
            xueXiaoMH: schoolID ? schoolID : 90201,
            ticket: PLAT_TICKET,
        }).then((res) => res.result.datas.page);
    }

    const newCollege = college.dataList[0];
    const data = await collegeManage.setupCollegeByList(newCollege);

    return data;
};


/**
 * mock院校数据
 * @param {Object} params 覆盖参数
 */
collegeManage.collegeMockJson = function (params = {}) {
    const randomStr = common.getRandomStr(6),
        randomNum = common.getRandomNum(12000, 99999),
        randomImage = doc[caps.name].school[common.getRandomNum(0, doc.test.school.length)];

    let collegeJson = Object.assign({
        preSchoolType: 1,
        xueXiaoMH: randomNum, // 代号
        xueXiaoID: randomNum,
        xueXiaoMC: `中国美术学院-${randomStr}`,
        schoolType: 1, // 是否签约：1为签约，2为未签约
        hotFlag: 2, // 热门标签: 1为
        typeIds: 26,
        provChName: "浙江省",
        prov: 330000,
        cityChName: "杭州市",
        city: 330100,
        areaChName: "下城区",
        area: 330103,
        classId: 5,
        studentType: "1,2,3,4,5", // 学生类型
        initUser: "on", // 初始化用户，on为是
        // addr: ,
        // applyUrl: ,
        logo: `${randomImage}`,
        // subSystem: ,
        // sub: ,
        // orderNo: ,
        // mobileOrderNo: ,
        // siteConfirmType: ,
        ticket: PLAT_TICKET,
    },
        params
    );
    return collegeJson;
};

function CollegeMap () {
    /** 报考id */
    this.baoKaoID = '';
    /** 用户id */
    this.yongHuID = '';
    /** 考生id */
    this.kaoShengID = '';
    /** 证件类型 */
    this.zhengJianLX = '';
    /** 身份证号 */
    this.shenFenZH = '';
    /** 姓名 */
    this.xingMing = '';
    /** 准考证号 */
    this.zhunKaoZH = '';
    /** 学校id */
    this.xueXiaoID = '';
    /** 学校名称 */
    this.xueXiaoMC = '';
    /** 考试id */
    this.kaoShiID = '';
    /** 考试名称 */
    this.kaoShiMC = '';
    /** 考点id */
    this.kaoDianID = '';
    /** 考点名称 */
    this.kaoDianMC = '';
    /** 专业id */
    this.zhuanYeID = '';
    /** 专业名称 */
    this.zhuanYeMC = '';
    /** 日程id */
    this.riChengID = '';
    /** 考试日期 */
    this.kaoShiRQ = '';
    /** kaoShiRQSM */
    this.kaoShiRQSM = '';
    /** shenChaBTF */
    this.shenChaBTF = '';
    /** 省份号 */
    this.shengFenHao = '';
    /** 报名费 */
    this.baoMingFei = '';
    /** baoKaoBZ */
    this.baoKaoBZ = '';
    /** queRenFS */
    this.queRenFS = '';
    /** queRenSJ */
    this.queRenSJ = '';
    /** 志愿数 */
    this.zhiYuanShu = '';
    /** xueXiaoMH */
    this.xueXiaoMH = '';
    /** 身份名称 */
    this.shengFenMC = '';
    /** 性别 */
    this.xingBie = '';
    /** 通信地址 */
    this.tongXinDZ = '';
    /** tongXinYB */
    this.tongXinYB = '';
    /** 手机 */
    this.shouJi = '';
    /** 考生号 */
    this.kaoShengHao = '';
    /** examAppIndex */
    this.examAppIndex = '';
    /** mobileAuthFlag */
    this.mobileAuthFlag = '';
    /** 文理科 */
    this.wenLiKe = '';
    /** 视频提交标志 */
    this.videoCommitFlag = '';
    /** 平台 */
    this.platform = '';
    /** 年份 */
    this.year = '';
    /** stuMailFlag */
    this.stuMailFlag = '';
    /** 考试类型 */
    this.examType = '';
}

function KaoDianMap () {
    /** kaoShiKDID */
    this.kaoShiKDID = '';
    /** kaoShiID */
    this.kaoShiID = '';
    /** kaoDianID */
    this.kaoDianID = '';
    /** xueXiaoID */
    this.xueXiaoID = '';
    /** kaoDianMC */
    this.kaoDianMC = '';
    /** xianKaoZYS */
    this.xianKaoZYS = '';
    /** kaoDianBM */
    this.kaoDianBM = '';
    /** kaoDianBH */
    this.kaoDianBH = '';
    /** visible */
    this.visible = '';
    /** wangBaoKSSJ */
    this.wangBaoKSSJ = '';
    /** wangBaoJSSJ */
    this.wangBaoJSSJ = '';
    /** wangBaoFBBZ */
    this.wangBaoFBBZ = '';
    /** onlineApplyStatus */
    this.onlineApplyStatus = '';
    /** kaoDianJC */
    this.kaoDianJC = '';
    /** siteName */
    this.siteName = '';
    /** isWangBaoFB */
    this.isWangBaoFB = '';
}

function ExamMap () {
    /** crossPiontStr */
    this.crossPiontStr = '';
    /** examSiteList */
    this.examSiteList = '';
    /** examTicketTitle */
    this.examTicketTitle = '';
    /** examType */
    this.examType = '';
    /** genOrgerNo */
    this.genOrgerNo = '';
    /** genOrgerNoStr */
    this.genOrgerNoStr = '';
    /** hideFlag */
    this.hideFlag = '';
    /** isCrossPiont */
    this.isCrossPiont = '';
    /** isGenOrderNo */
    this.isGenOrderNo = '';
    /** isLockFlag */
    this.isLockFlag = '';
    /** isProfReject */
    this.isProfReject = '';
    /** isSchedConflict */
    this.isSchedConflict = '';
    /** isUseRight */
    this.isUseRight = '';
    /** isnotLockFlag */
    this.isnotLockFlag = '';
    /** kaiTongBZ */
    this.kaiTongBZ = '';
    /** kaiTongBZStr */
    this.kaiTongBZStr = '';
    /** kaoShiID */
    this.kaoShiID = '';
    /** kaoShiMC */
    this.kaoShiMC = '';
    /** kaoShiND */
    this.kaoShiND = '';
    /** kaoShiYF */
    this.kaoShiYF = '';
    /** lockFlag */
    this.lockFlag = '';
    /** lockFlagStr */
    this.lockFlagStr = '';
    /** logo */
    this.logo = '';
    /** onScoreQuery */
    this.onScoreQuery = '';
    /** profRejectStr */
    this.profRejectStr = '';
    /** remark */
    this.remark = '';
    /** schedConflictStr */
    this.schedConflictStr = '';
    /** schoolType */
    this.schoolType = '';
    /** ticketNoticeRange */
    this.ticketNoticeRange = '';
    /** useRight */
    this.useRight = '';
    /** useRightStr */
    this.useRightStr = '';
    /** xianKaoZYS */
    this.xianKaoZYS = '';
    /** xianKaoZYSStr */
    this.xianKaoZYSStr = '';
    /** xueXiaoID */
    this.xueXiaoID = '';
    /** xueXiaoMC */
    this.xueXiaoMC = '';
    /** xueXiaoMH */
    this.xueXiaoMH = '';
    /** zhiYuanShu */
    this.zhiYuanShu = '';
    /** zhiYuanShuStr */
    this.zhiYuanShuStr = '';
    /** zhunKaoZZDY */
    this.zhunKaoZZDY = '';
    /** zhunKaoZZDYStr */
    this.zhunKaoZZDYStr = '';
}

class CollegeMain {
    constructor() {
        /** preSchoolType */
        this.preSchoolType = 0;
        /** 学校代号 */
        this.xueXiaoMH = 0;
        /** 学校id */
        this.xueXiaoID = 0;
        /** 学校名称 */
        this.xueXiaoMC = "";
        /** 签约标志 */
        this.schoolType = 0;
        /** 热门标签 */
        this.hotFlag = 0;
        /** 类型id */
        this.typeIds = 0;
        /** 省份名 */
        this.provChName = "";
        /** 省份编号 */
        this.prov = 0;
        /** 城市名称 */
        this.cityChName = "";
        /** 城市编号 */
        this.city = 0;
        /** 区名称 */
        this.areaChName = "";
        /** 区编号 */
        this.area = 0;
        /** 类别id */
        this.classId = 0;
        /** 学生类型 */
        this.studentType = "";
        /** 初始化用户标志 */
        this.initUser = "";
        /** 学校地址 */
        this.addr = "";
        /** 学校url */
        this.applyUrl = "";
        /** 学校logo */
        this.logo = "";
    }
}