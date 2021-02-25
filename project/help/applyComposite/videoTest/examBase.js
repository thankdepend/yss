const stuApp = require('../../../../reqApi/app/stu');
const userApp = require('../../../../reqApi/app/user');
const school = require('../../../../reqApi/platfrom/school');
const examvideo = require('../../../../reqApi/platfrom/examvideo');
const heartbeatApp = require('../../../../reqApi/app/heartbeat');
const { common } = require('../../../../lib/index');
const mysql = require('mysql2');

class examBase {
    constructor(params = {}) {
        /** 学校id */
        this.schoolId = params.schoolId || 70355;
        /** 考试id */
        this.kaoShiId = params.kaoShiId || 13177;
        /** 考点id */
        this.kaoDianID = params.kaoDianID || 906;
        /** 报考id */
        this.baoKaoId = params.baoKaoId || '';
        /** 日程池 */
        this.richengMap = new Map();
        /** 日程对象 */
        this.riChengObj = params.riChengObj || {
            invigilate: 11109903, // 11108259 监考笔试
            transcribe: 11108259, // 视频录制
        }
    }

    /**
     * @alias 获取日程
     */
    async getRicheng (mode) {
        if (mode == '视频录制') {
            return this.riChengObj.invigilate;
        } else if (mode == '监考笔试') {
            return this.riChengObj.transcribe;
        } else if (mode == '客观题同时') {

        } else if (mode == '客观题非同时') {

        } else if (mode == '仅作品') {

        }
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

    /** 获取考题列表 */
    async examinationList (params) {
        const examinationList = await school.examinationList(params);
        return examinationList;
    }


    /** 获取科目列表 */
    async getSubjectVideoList (params) {
        return await stuApp.querySubjectVideoList(params);
    }

    /**
     * 院校科目题库列表
     */
    async getExaminationList () {
        let examinationData;
        const res = await this.examinationList({
            kaoShiId: this.kaoShiId,
            // zhuanYeId: this.zhuanYeId,
            // esId: this.esId,
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
        // console.log('题库列表', res.result.datas.page.dataList);
        let arr = [];
        for (let examination of examinationData) {
            let kaoTi = await this.getKaoTiDetail(examination.tiId)
            examination.kaoTi = kaoTi;
            arr.push(examination)
        }
        return examinationData;
    }

    /** 
     * 保存考题 
     */
    async saveExamination (params) {

        const data = Object.assign({
            allowAttachment: 3,
            tiId: 4603,
            examGuideText: '',
            examType: 2,
            quesType: '',
            quesBankType: 1,
            kaoShiID: 13181,
            zhuanYeId: 1224972,
            esId: 3502,
            examinationBatchNo: 0,
            publishFlag: 1,
            clearDetail: 1,
            detail: '自动化测试科目1（监考笔试类）考题',
            examPicUrl: 'http://img.artstudent.cn/pr/2021-01-12/9ae44803adf84d7f8008e24da7a1be17.jpg',
            examVideoUrl: 'http://art-admin1.oss-cn-hangzhou.aliyuncs.com/pr/2021-02-02/df41a6cc64fe427aa9d9d084f8778897.mp4',
            examAudioUrl: '',
            examAudioJson: '',
            examinationAudio: '',
        }, params)

        await school.saveExamination(data);
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
     * 进考场（科目列表）
     */
    async underwayExam (params) {
        await this._getBaoKaoId();
        const subjectData = await this.getSubjectVideoList({
            data: {
                m: "",
                p: Object.assign({
                    // riChengId: this.riChengID,
                    // riChengID: this.riChengID,
                    baoKaoId: this.baoKaoId,
                    simulation: 0
                }, params)
            },
            ticket: TICKET
        })

        this.subjectName = subjectData.result.datas.data.subjectList.find(obj => obj.esId == this.esId).subjectName;
        this.subjectList = subjectData.result.datas.data

        const svId = subjectData.result.datas.data.subjectList.find(obj => obj.esId == this.esId).svId;
        const obj = {
            svId: svId,
            zhuanYeMC: subjectData.result.datas.data.zhuanYeMC
        }
        return obj;
    }

    /** 获取考试专业 */
    async getExamProf () {
        const examProfRes = await stuApp.queryExamProf({
            data: { "m": "", "p": {} },
            ticket: TICKET
        });
        return examProfRes;
    }

    /** 获取报考id */
    async _getBaoKaoId () {
        const examProf = await this.getExamProf();
        // console.log('查看报考信息', examProf);
        this.baoKaoId = examProf.result.datas.list[0].baoKaoID;
    }

    /** 连接数据库 */
    async createPool () {
        const pool = mysql.createPool({
            user: 'root',
            password: 'testtest',
            host: '192.168.18.203',
            port: 3307,
            database: 'befexam',
            // charset: 'utf8mb4',
        });
        return pool.promise();
    };

    /**
     * 后台-考生考试结果查询
     */
    async getExaminerAssignDetailList (params) {
        const assignDetail = await examvideo.getExaminerAssignDetailList(Object.assign({
            showSubject: 1,
            showSchedule: 1,
            kaoShiID: '',
            kaoDianID: '',
            riChengId: '',
            riChengID: '',
            esId: '',
            videoLengthComPare: '',
            commitFlag: '',
            paperCommitFlag: '',
            stuIDCard: '',
            stuName: '',
            zhunKaoZH: '',
        }, params))
        // console.log(assignDetail);
        return assignDetail;
    }

    /** 考生专业视频列表查询 */
    async queryStudentSubjectVideoList (params) {
        const res = await examvideo.queryStudentSubjectVideoList(params)
        return res;
    }

    /** 考生考试查询 */
    async stuInfoDetail (params) {
        return await school.stuInfoDetail(params)
    }

    /** 开始录制 */
    async startRecord (params) {
        // const res = await stuApp.startRecord({
        const res = await heartbeatApp.startRecord({
            data: {
                p: Object.assign({
                    mirror: 2,
                    // esId: this.esId,
                    simulation: 2,
                    // baoKaoId: this.baoKaoId,
                    master: 1
                }, params),
                m: ""
            }, ticket: TICKET
        });
        console.log('开始录制', res);
        return res;
    }

    /** 清除录制状态 */
    async clearRecordStatus (params) {
        return await heartbeatApp.clearRecordStatus(params)
    }

    /** 校验照片是否是本人 */
    async checkAttestPhoto (params) {
        return await stuApp.attestPhoto(params);
    }

    /** 保存截图 */
    async saveScreenshot (params) {
        return await stuApp.saveScreenshot(params)
    }

    /** 清除录制状态 */
    async clearRecordStatus (params) {
        const res = await stuApp.clearRecordStatus({
            data: {
                p: Object.assign({
                    mirror: 2,
                    // esId: this.esId,
                    simulation: 2,
                    // baoKaoId: this.baoKaoId,
                    master: 1
                }, params),
                m: ""
            }, ticket: TICKET
        });
        // console.log('清除录制状态', res);
    }

    /** 检查辅机状态 */
    async checkSlaveStatus (params) {
        return await stuApp.checkSlaveStatus(params);
    }

    /**
     * 辅机登录
     */
    async multiTerninalLogin (params) {
        return await userApp.multiTerninalLogin(params);
    }

    /** 辅机获取主机科目信息 */
    async getExamVideoInfo (params) {
        return await stuApp.getExamVideoInfo(params);
    }

    /** 校验辅机是否录制 */
    async checkMasterVideoUpload (params) {
        return await stuApp.checkMasterVideoUpload(params)
    }

    /** 改变辅机状态 */
    async changeSlaveStatus (params) {
        return await stuApp.changeSlaveStatus(params);
    }
}

module.exports = examBase;