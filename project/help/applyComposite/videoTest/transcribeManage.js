const examBase = require('../videoTest/examBase');
const stuApp = require('../../../../reqApi/app/stu');


/**
 * @alias 视频录制类
 */
class Transcribe extends examBase {
    constructor() {
        super();
        /** 日程id */
        this.riChengID = this.riChengObj.transcribe;
        /** 科目id */
        this.esId = 1687;
        /** 视频id */
        this.svId = '';
        /** 专业名称 */
        this.zhuanYeMC = '';
        // /** 视频录制主要信息 */
        // this.transcribeMain = new Object();
    }

    /**
     * 进考场（科目列表）
     */
    async underwayExamByTran () {
        const examData = await this.underwayExam({
            riChengId: this.riChengID,
            riChengID: this.riChengID,
        });
        console.log(examData);
        this.svId = examData.svId;
        this.zhuanYeMC = examData.zhuanYeMC
    }

    /**
     * 科目详情（抽考题）
     */
    async checkTimeByType () {
        const examinationInfo = await stuApp.checkTimeByType({
            data: {
                m: "",
                p: {
                    xueXiaoId: this.schoolId,
                    subjectName: this.subjectName,
                    zhuanYeMC: this.zhuanYeMC,
                    esId: this.esId,
                    riChengId: this.riChengID,
                    svId: this.svId,
                    checkTimeType: 2, //1 考题 2录制时间 3 提交视频 4 不录视频模式
                    baseRiChengId: this.riChengID,
                    drawQuestion: 2,
                }
            }, ticket: TICKET
        })
        this.drawExamination = examinationInfo.result.datas.examProfSubject;
        console.log(examinationInfo.params);
        console.log('抽题内容', examinationInfo);
    }

    /**
     * 保存次数
     */
    async saveCount () {
        const res = await stuApp.saveCount({
            data: {
                m: "",
                p: {
                    subjectName: this.subjectName,
                    esId: this.esId,
                    riChengId: this.riChengID,
                    updateNum: 1
                }
            }, ticket: TICKET
        });
        if (res.result.datas.allowExam == true) {
            this.saveCountNum += 1;
            console.log(res);
        } else {
            this.saveCount = this.saveCount;
        }
    }

    /** 提交考试试卷 */
    async commitPaper () {
        console.log(this);
        const res = await stuApp.commitPaper({
            data: {
                m: "",
                p: {
                    xueXiaoId: this.schoolId,
                    subjectName: this.subjectName,
                    zhuanYeMC: this.zhuanYeMC,
                    photoAttachment: "http://art-video.artstudent.cn/img/test/13166/1223644/1688/74a10784889c4aa9a8def51f4fd5390b_uid1078675.jpg",
                    baoKaoId: this.baoKaoId,
                    yongHuID: LOGINDATA.userId,
                    esId: this.esId,
                    riChengId: this.riChengID
                }
            },
            ticket: TICKET
        });
        console.log(res.params);
        console.log(res);
        const expData = {
            "success": true,
            "message": "操作成功",
            "datas": {}
        }
        if (res.result == expData) {
            this.commitPaperFlag = true;
        }
    }

    /** 开始考试-视频录制类 */
    async startRecordByTran () {
        await this.startRecord({
            esId: this.esId,
            baoKaoId: this.baoKaoId,
        });
    }

    /** 校验照片是否是本人-监考笔试类 */
    async checkAttestPhotoByTran () {
        const res = await this.checkAttestPhoto({
            data: {
                p: {
                    videoCode: "v1609395849590",
                    esId: this.esId,
                    attestUrl: "http://art-video.artstudent.cn/photo/test/13166/1223644/1688/3348bde6ec7549dea989415ed5e55e54_uid1078675.jpg",
                    svId: this.svId,
                    kaoShengID: "247383",
                    baoKaoId: this.baoKaoId,
                    riChengId: this.riChengID,
                    xueXiaoID: this.schoolId,
                    retryTimes: 1,
                    shenFenZH: LOGINDATA.loginName,
                    zhuanYeId: this.zhuanYeId,
                    fileSize: 994606,
                    zhuanYeMC: this.zhuanYeMC,
                    seId: "0",
                    subjectCode: 2,
                    subjectName: this.subjectName
                },
                m: ""
            }, ticket: TICKET
        })
    }

    /** 清除录制状态-视频录制类 */
    async clearRecordStatusByTran () {
        await this.clearRecordStatus({
            esId: this.esId,
            baoKaoId: this.baoKaoId,
        })
    }

}
const transcribeManage = module.exports = {};

transcribeManage.setupTranscribe = function () {
    return new Transcribe();
}