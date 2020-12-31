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

}

const transcribeManage = module.exports = {};

transcribeManage.setupTranscribe = function () {
    return new Transcribe();
}