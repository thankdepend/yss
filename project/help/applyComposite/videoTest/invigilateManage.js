const stuApp = require('../../../../reqApi/app/stu');
const examBase = require('../videoTest/examBase');

const school = require('../../../../reqApi/platfrom/school');
const { common } = require('../../../../lib/index');
const { expect } = require('chai');

class Invigilate extends examBase {
    constructor() {
        super();
        /** 日程id */
        this.riChengID = this.riChengObj.invigilate;
        /** 专业id */
        this.zhuanYeId = 1223644;
        /** 科目id */
        this.esId = 1688;
        /** 科目名称 */
        this.subjectName = ''
        /** 考题库 */
        this.examinationMap = new Map();
        /** 抽到的考题 */
        this.drawExamination = {};
    }

    /**
     * 院校科目题库列表
     */
    async getExaminationList () {
        let examinationData;
        const res = await school.examinationList({
            kaoShiId: this.kaoShiId,
            zhuanYeId: this.zhuanYeId,
            esId: this.esId,
            quesBankType: 1,
            publishFlag: 1,
            examType: 2,
            examinationBatchNo: 0,
            checkFlag: 1,
            curPage: 1,
            pageSize: 15,
            ticket: PLAT_TICKET
        })
        examinationData = res.result.datas.page.dataList;
        // console.log('题库列表', examinationData);
        let arr = [];
        for (let examination of examinationData) {
            let kaoTi = await this.getKaoTiDetail(examination.tiId)
            examination.kaoTi = kaoTi;
            arr.push(examination)
        }
        this.updateExaminationData(examinationData)
    }

    /**
     * 取考题
     */
    async getKaoTiDetail (tiId) {
        const res = await school.kaoTiDetail({
            tiId: tiId,
            ticket: PLAT_TICKET,
        });
        const kaoTi = res.res.text.split('<p>')[1].split('</p>')[0]
        return kaoTi;
    }

    /**
     * 更新考题库
     */
    updateExaminationData (params) {
        let examinationMap = this.examinationMap
        params.forEach(obj => {
            let kaoTi = obj.kaoTi;
            let examination = examinationMap.has(kaoTi) ? examinationMap.set(kaoTi) : new Examination();
            examination.kaoTi = kaoTi;
            common.update(examination, obj)
            examinationMap.set(kaoTi, examination)
        });
    }

    /** 断言抽考题 */
    async checkTimeByTypeAssert () {
        await this.checkTimeByType()
        // console.log('期望', this.examinationMap.get(_.cloneDeep({
        //     kaoTi: this.drawExamination.examinationDetail,
        //     esId: this.drawExamination.esId,
        // })));
        // expect(_.cloneDeep({ kaoTi: '请以长笛为乐器进行一场即兴演奏', esId: 1688 })).to.be.equal({
        //     kaoTi: this.drawExamination.examinationDetail,
        //     esId: this.drawExamination.esId,
        // })
        const drawExamination = this.examinationMap.get(this.drawExamination.examinationDetail)
        let exp = {
            esId: drawExamination.esId,
            // kaoShizyID:,
            profId: drawExamination.zhuanYeId,
            profName: drawExamination.zhuanYeId,
            // subjectCode:,
            subjectName: drawExamination.subjectName,
            // shootFlag:,
            examinationDetail: drawExamination.kaoTi,

        }
        console.log('json', exp);
        console.log('打印map', this.examinationMap);
        console.log('期望', this.examinationMap.get(this.drawExamination.examinationDetail));
        console.log('实际', this.drawExamination);
        common.isApproximatelyEqualAssert(this.examinationMap.get(this.drawExamination.examinationDetail), this.drawExamination)
    }

    /**
     * 进考场（科目列表）
     */
    async underwayExam () {
        await this._getBaoKaoId();
        const subjectData = await this.getSubjectVideoList({
            data: {
                m: "",
                p: {
                    riChengId: this.riChengID,
                    riChengID: this.riChengID,
                    baoKaoId: this.baoKaoId,
                    simulation: 0
                }
            },
            ticket: TICKET
        })
        // console.log(subjectData.result.datas.data);
        this.svId = subjectData.result.datas.data.subjectList.find(obj => obj.esId == this.esId).svId;

    }

    /**
     * 抽考题
     */
    async checkTimeByType () {
        const examinationInfo = await stuApp.checkTimeByType({
            data: {
                m: "",
                p: {
                    xueXiaoId: this.schoolId,
                    subjectName: this.subjectName,
                    zhuanYeMC: "美术",
                    esId: this.esId,
                    riChengId: this.riChengID,
                    svId: this.svId,
                    checkTimeType: 1 // 是否模拟考
                }
            }, ticket: TICKET
        })
        this.drawExamination = examinationInfo.result.datas.examProfSubject;
        // console.log('抽题内容', this.drawExamination);
    }
}

const invigilateManage = module.exports = {};

invigilateManage.setupInvigilate = function () {
    return new Invigilate();
}

function Examination () {
    /** 考题id */
    this.tiId = '';
    /** xueXiaoId */
    this.xueXiaoId = '';
    /** kaoShiId */
    this.kaoShiId = '';
    /** kaoShiMC */
    this.kaoShiMC = '';
    /** zhuanYeId */
    this.zhuanYeId = '';
    /** zhuanYeMC */
    this.zhuanYeMC = '';
    /** esId */
    this.esId = '';
    /** subjectName */
    this.subjectName = '';
    /** quesType */
    this.quesType = '';
    /** detail */
    this.detail = '';
    /** ordNo */
    this.ordNo = '';
    /** createdDate */
    this.createdDate = '';
    /** rowNumber */
    this.rowNumber = '';
    /** examVideoUrl */
    this.examVideoUrl = '';
    /** examPicUrl */
    this.examPicUrl = '';
    /** examPicUrlList */
    this.examPicUrlList = '';
    /** examAudioUrl */
    this.examAudioUrl = '';
    /** examinationAudio */
    this.examinationAudio = '';
    /** quesBankType */
    this.quesBankType = '';
    /** publishFlag */
    this.publishFlag = '';
    /** examinationBatchNo */
    this.examinationBatchNo = '';
    /** kaoShiRQSM */
    this.kaoShiRQSM = '';
    /** paperId */
    this.paperId = '';
    /** paperName */
    this.paperName = '';
    /** examType */
    this.examType = '';
    /** examGuideText */
    this.examGuideText = '';
    /** checkFlag */
    this.checkFlag = '';
    /** examinationList */
    this.examinationList = '';
    /** examVideoUrlTemp */
    this.examVideoUrlTemp = '';
    /** clearDetail */
    this.clearDetail = '';
    /** kaoShiRQSMStr */
    this.kaoShiRQSMStr = '';
    /** quesBankTypeStr */
    this.quesBankTypeStr = '';
    /** checkFlagStr */
    this.checkFlagStr = '';
    /** publishFlagStr */
    this.publishFlagStr = '';
    /** batchNoStr */
    this.batchNoStr = '';
    /** isPublish */
    this.isPublish = '';
    /** isChecked */
    this.isChecked = '';
}