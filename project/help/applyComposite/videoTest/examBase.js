const stuApp = require('../../../../reqApi/app/stu');

class examBase {
    constructor() {
        /** 学校id */
        this.schoolId = 13166;
        /** 考试id */
        this.kaoShiId = 13047;
        /** 报考id */
        this.baoKaoId = '';
        /** 日程池 */
        this.richengMap = new Map();
        /** */
        this.riChengObj = {
            invigilate: 11108259, // 监考笔试
            transcribe: 11108259, // 视频录制
        }
    }

    /**
     * @alias 获取日程
     */
    async getRicheng (mode) {
        if (mode == '视频录制') {

        } else if (mode == '监考笔试') {

        } else if (mode == '客观题同时') {

        } else if (mode == '客观题非同时') {

        } else if (mode == '仅作品') {

        }
    }

    /** 获取视频录制日程 */
    async getTranscribe () {

    }

    /** 获取监考笔试类日程 */
    async getWritten () {

    }

    /** 保存考试状态 */
    async saveStudentExamStatus () {
        await stuApp.saveStudentExamStatus({
            data: {
                m: "",
                p: {
                    esId: 1701,
                    baoKaoId: 2622186,
                    examStatus: 200
                }
            }, ticket: TICKET
        })
    }

    /** 查询考试科目列表 */
    async querySubjectVideoList () {
        const subjectList = await stuApp.querySubjectVideoList({
            data: {
                "m": "",
                "p": {
                    "riChengId": 11107838,
                    "riChengID": 11107838,
                    "baoKaoId": 2619297,
                    "simulation": 0
                }
            }
        })
    }

    /**
     * 报名考试承诺书集合
     */
    async examPromiseAssemble () {

    }

    /** 考试承诺书 */
    async getExamNotice () {
        await stuApp.queryExamNotice({
            data: {
                m: "",
                p: {
                    schId: this.schoolId,
                    examId: 13047,
                    examPointId: 731,
                    profId: 1223644
                }
            }
        });
    }

    /** 获取科目列表 */
    async getSubjectVideoList (params) {
        return await stuApp.querySubjectVideoList(params);
    }

    /** 获取考试专业 */
    async getExamProf () {
        const examProfRes = await stuApp.queryExamProf({
            data: { "m": "", "p": {} },
            ticket: TICKET
        });
        return examProfRes;
    }

    async _getBaoKaoId () {
        const examProf = await this.getExamProf();
        this.baoKaoId = examProf.result.datas.list[0].baoKaoID;
    }

}

module.exports = examBase;