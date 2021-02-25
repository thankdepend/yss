const stuApp = require('../../../../reqApi/app/stu');
const examBase = require('../videoTest/examBase');
const yssLogin = require('../../base/yssLogin');
const school = require('../../../../reqApi/platfrom/school');
const { common } = require('../../../../lib/index');
const { expect } = require('chai');
const caps = require('../../../../data/caps');
const mysql = require('mysql2');
const { update } = require('../../../../lib/commonFc');
const { object } = require('underscore');
const argv = require('yargs').argv;

class Invigilate extends examBase {
    constructor(params = {}) {
        super(params);
        /** 日程id */
        this.riChengID = this.riChengObj.invigilate;
        /** 专业id */
        this.zhuanYeId = params.zhuanYeId || 1224870; //1223644
        /** 考试专业名称 */
        this.kaoShiMC = '';
        /** 科目id */
        this.esId = params.esId || 3310; //1688
        /** 科目名称 */
        this.subjectName = '';
        /** 保存次数 */
        this.saveCountNum = 0;
        /** 是否允许辅机拍摄 */
        this.allowShoot = false;
        /** 考试模式 */
        this.examMode = 2; // 2为统一模式
        /** 试卷提交标志 */
        this.commitPaperFlag = false;
        /** 考题库 */
        this.examinationMap = new Map();
        /** 抽到的考题 */
        this.drawExamination = {};
        /** 科目信息 */
        this.subjectData = {};
    }

    // 更新参数
    updateConstParams (params) { Object.assign(this, params) }

    /**
     * 院校科目题库列表
     */
    async getExaminationList () {
        let examinationData;
        const res = await this.examinationList({
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
        // console.log(res);
        examinationData = res.result.datas.page.dataList;

        // console.log('题库列表', res.result.datas.page.dataList);
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
     * @param {Array} 题库列表
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

    /** 获取科目编辑页信息 */
    async getExamSubjectEdit () {
        const subjectData = await this.querySubjectList();
        try {
            this.subjectData = subjectData.result.datas.page.dataList.find(obj => obj.esId == this.esId)
            // console.log(this.subjectData);
        } catch (err) {
            throw new Error(`没有找到你指定科目的信息\n${err}`)
        }

    }

    /** 后台查询科目列表 */
    async querySubjectList () {
        const res = await school.getSubjectList({
            kaoShiID: this.kaoShiId,
            zhuanYeID: this.zhuanYeId,
            curPage: 1,
            pageSize: 15,
            ticket: PLAT_TICKET
        });
        // console.log('科目列表', res);
        return res;
    }

    /** 断言抽考题 */
    async checkTimeByTypeAssert (params = {}) {
        try {
            const examinationInfo = await this.checkTimeByType()
            // bef-300202(考试时间未到)
            if (params.delay) {
                console.log(examinationInfo.result.code);
                expect(examinationInfo.result.code).to.be.equal('bef-300202')
            }
            const drawExamination = this.examinationMap.get(this.drawExamination.examinationDetail)
            let exp = {
                esId: drawExamination.esId,
                // kaoShizyID:,
                profId: drawExamination.zhuanYeId,
                profName: drawExamination.zhuanYeMC,
                // subjectCode:,
                subjectName: drawExamination.subjectName,
                // shootFlag:,
                examinationDetail: drawExamination.kaoTi,
                examPicUrl: drawExamination.examPicUrl,
                examMode: this.examMode,
                examAudioUrl: drawExamination.examAudioUrl,
                // publishFlag: 1, // 不发布app端应该拿不到题

            }
            // console.log('json', exp);
            // console.log('实际', this.drawExamination);
            common.isApproximatelyEqualAssert(exp, this.drawExamination)
        } catch (err) {
            throw new Error(`没设置考题\n${err}`)
        }
    }


    /** 数据库查询科目列表 */
    async mysqlQuerySubjectVideoList () {
        const pool = await this.createPool()
        // console.log('数据库测试', pool);
        let sql = 'select * from ba_exam_examprofsubject where profId = (?) and esId = (?)';
        const queryResult =
            await pool.query(sql, [this.zhuanYeId, this.esId])
                .then(([rows, fields]) => {
                    // console.log('方法内打印', rows);
                    return rows;
                })
                .catch(console.log)

        // console.log('查询结果', queryResult[0]);
        // 关闭数据库连接（必须要做）！
        pool.end()
        return queryResult;
    }

    /** 科目详情断言 */
    async subjectInfoAssert () {
        await this.checkTimeByType();
        // const subjectData = this.subjectData;
        // 这里列表断言不准，放弃了，直接数据库查
        // let exp = {
        //     esId: subjectData.esId,
        //     kaoShizyID: subjectData.kaoShizyID,
        //     profId: subjectData.profId,
        //     profName: subjectData.profName,
        //     subjectCode: subjectData.subjectCode,
        //     subjectName: subjectData.subjectName,
        //     shootFlag: subjectData.shootFlag,
        //     remark: subjectData.remark,
        //     useFlag: subjectData.useFlag,
        //     ord: subjectData.ord,
        //     subjectAudioType: subjectData.subjectAudioType,
        // }
        // 最后还是用sql校验了...
        const sqlQueryResult = await this.mysqlQuerySubjectVideoList()
        // console.log('期望', sqlQueryResult);
        // console.log('实际', this.drawExamination);
        common.isApproximatelyEqualAssert(sqlQueryResult[0], this.drawExamination)
    }

    /**
     * 进考场（科目列表-监考笔试类）
     */
    async underwayExamByInvi () {
        const examData = await this.underwayExam({
            riChengId: this.riChengID,
            riChengID: this.riChengID,
        });
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
                    checkTimeType: 1 // 1是抽题,2是录制时校验时间的
                }
            }, ticket: TICKET
        })
        this.drawExamination = examinationInfo.result.datas.examProfSubject;
        if (examinationInfo.result.message == '考试异常，请检查网络是否正常，稍后重试！') {
            throw new Error(`快去维护一下科目考题，考生没抽到啊`)
        }
        // console.log('抽题内容', examinationInfo);
        return examinationInfo;
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
            // console.log(res);
        } else {
            this.saveCount = this.saveCount;
        }
    }

    /** 提交考试试卷 */
    async commitPaper () {
        const res = await stuApp.commitPaper({
            data: {
                m: "",
                p: {
                    xueXiaoId: this.schoolId,
                    subjectName: this.subjectName,
                    zhuanYeMC: this.zhuanYeMC,
                    photoAttachment: common.getrandomPic(),
                    baoKaoId: this.baoKaoId,
                    yongHuID: LOGINDATA.userId,
                    esId: this.esId,
                    riChengId: this.riChengID
                }
            },
            ticket: TICKET
        });
        // console.log(res.params);
        console.log(res);
        const expData = {
            "success": true,
            "message": "操作成功",
            "datas": {}
        }
        if (res.result == expData) {
            this.commitPaperFlag = true;
        } else {
            console.log(res.result);
            this.commitPaperFlag = false;
        }

    }

    /** 检查试卷提交时间 */
    async checkAllowToExam () {
        const res = await stuApp.checkAllowToExam({
            data: {
                m: "",
                p: {
                    subjectName: this.subjectName,
                    riChengId: this.riChengID,
                    esId: this.esId
                }
            },
            ticket: TICKET
        });
        // console.log(res);
    }

    /** 录制次数断言 */
    async saveCountAssert () {
        const initSaveCount = this.subjectList.subjectList.find(obj => obj.esId == this.esId).saveCount
        // console.log('初始次数', initSaveCount);
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
        const relSaveCount = subjectData.result.datas.data.subjectList.find(obj => obj.esId == this.esId).saveCount;
        // console.log('考试后次数', relSaveCount);
    }

    /** 获取考生考试结果 */
    async getAssignDetail () {
        const res = await this.getExaminerAssignDetailList({
            kaoShiID: this.kaoShiId,
            kaoDianID: this.kaoDianID,
            riChengId: this.riChengID,
            riChengID: this.riChengID,
            esId: this.esId,
            stuIDCard: LOGINDATA.loginName,
            ticket: PLAT_TICKET
        })
        // console.log(res.result.datas.page);
        return res;
    }

    /** 查询考生专业视频列表-监考笔试类 */
    async queryStudentSubjectVideoListByinv () {
        const res = await this.queryStudentSubjectVideoList({
            riChengId: this.riChengID,
            yongHuID: LOGINDATA.userId,
            ticket: PLAT_TICKET
        });
        return res;
    }

    /** 考生考试查询-监考笔试类 */
    async stuInfoDetail () {
        const res = await this.stuInfoDetail({
            baoKaoId: this.baoKaoId,
            riChengId: this.riChengID,
            userId: LOGINDATA.userId,
            ticket: PLAT_TICKET
        });
        return res;
    }

    // 获取科目在列表排序编号
    async getSubOrd () {
        const res = await this.querySubjectList();
        const ord = res.result.datas.page.dataList.find(obj => obj.esId == this.esId).ord;
        return ord;
    }


    /** 保存科目-监考笔试类 */
    async saveSubjectByInv (params) {
        const ord = await this.getSubOrd()
        const res = await school.saveSubjectInfo(Object.assign({
            esId: this.esId,
            kaoShizyID: this.subjectData.kaoShizyID,
            examCallJson: '',
            subjectExtendDataUrl: 'http://img.artstudent.cn/pr/2020-12-31/03db994b962843df9b1dab34c16959ff.json',
            subjectName: this.subjectName,
            examMode: 2,
            subjectTotalScore: 100,
            riChengID: 0,
            kaoShiRQSM: '',
            showStatus: 1,
            syncExamStatus: 1,
            ord: ord,
            shootLimitType: 2,
            maxShootCount: 8,
            maxSaveCount: 3,
            videoLength: 600,
            minute: 10,
            second: 0,
            timeExplain: `考试时长为10分钟`,
            screenStatus: 1,
            cameraDirection: 1,
            definition: 2,
            showQuesMode: 1,
            allowStuExplain: 1,
            attachmentExplain: '',
            allowAttachment: 1,
            picExplain: '图片上传说明',
            takeAnswerSheetTimeLength: '',
            takePaperPhotoLimitMinutes: '',
            takePaperPhotoLimitSeconds: '',
            externalDeviceCheck: 1,
            breakRecordStatus: 2,
            allowBreakSeconds: '',
            allowBreakTimes: '',
            commitPaperPre: 1,
            faceRecognition: 2,
            recognitionConfidence: '',
            mustRecognitionSuccess: 2,
            paperCheck: 2,
            mustCheckPaperSuccess: 2,
            examContent: `${this.subjectName}考试内容`,
            examExplain: `${this.subjectName}考试说明`,
            shootExamPromise: `${this.subjectName}考生承诺书`,
            videoTempUrl: '',
            seeProblemOnRecordingPage: 2,
            checkStartTime: '',
            showQuesStartDate: common.getCurrentTimeBefore(2), // 审题开始时间（当前时间x小时前）
            allowCleanLastInTime: 1,
            closeQuesDate: '',
            shootStartDate: common.getCurrentTime(), // 录制开始时间（当前时间）
            latestInTime: '',
            readyVoiceCommandsUrl: '',
            readyVoiceCommandsLength: 3,
            readyTimeLength: '',
            reviewVoiceCommandsUrl: '',
            reviewVoiceCommandsLength: 3,
            reviewTimeLength: '',
            shootEndDate: common.getCurrentTime(), // 录制截止时间（当前时间）
            commitPaperEndDate: common.getCurrentTimeAfter(2), // 提交答卷截止时间(当前时间x小时后)
            commitVideoStartDate: common.getCurrentTimeAfter(2), // 视频提交开始时间(当前时间x小时后)
            sampleType: 0,
            examiningTime: '',
            drawQuesLimit: 0,
            subjectAudioType: 0,
            examDirectUrl: '',
            examDirectLength: '',
            examCallType: 0,
            examCallOrder1: 1,
            cameraPositionLegendUrl: '',
            videoListTip: `${this.subjectName}录制说明`,
            webUploadVedioStartTime: '',
            webUploadVedioEndTime: '',
            localStoreFlag: 2,
            localVideoUploadFlag: 2,
            clientUploadFlag: 2,
            ticket: PLAT_TICKET
        }, params));
        // console.log(res);
    }

    /** 开始录制-监考笔试类 */
    async startRecordByInv (params) {
        await this.startRecord(Object.assign({
            esId: this.esId,
            baoKaoId: this.baoKaoId,
        }, params));
    }

    /** 清除录制状态-监考笔试类 */
    async clearRecordStatusByInv (params) {
        await this.clearRecordStatus(Object.assign({
            esId: this.esId,
            baoKaoId: this.baoKaoId,
        }, params));
    }

    /** 校验照片是否是本人-监考笔试类 */
    async checkAttestPhotoByInv () {
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
        console.log('校验照片是否是本人-监考笔试类', res);
    }

    /** 保存截图-监考笔试类 */
    async saveScreenshotByInv () {
        const res = await this.saveScreenshot({
            data: {
                p: {
                    screenshotUrl: common.getrandomPic(),
                    svId: this.svId
                },
                m: ""
            }, ticket: TICKET
        });
        // console.log('保存截图-监考笔试类', res);
    }

    /** 提交视频 */
    async commitVideo () {
        const res = await stuApp.commitVideo({
            data: {
                p: {
                    ticket: TICKET,
                    esId: this.esId,
                    videoFileSize: 458079847,
                    svId: this.svId,
                    kaoShengID: "247383",
                    baoKaoId: this.baoKaoId,
                    riChengId: this.riChengID,
                    shootTime: "1609396458496",
                    recordPhoto: "http://art-video.artstudent.cn/photo/test/13166/1223644/1688/3348bde6ec7549dea989415ed5e55e54_uid1078675.jpg",
                    photoAttachment: "http://img.artstudent.cn/pr/2021-01-06/9835db5050584c51ba193a727827f224.jpg",
                    xueXiaoID: this.schoolId,
                    stuVideoLength: 600,
                    shenFenZH: LOGINDATA.loginName,
                    yongHuID: LOGINDATA.userId,
                    videoUrl: "http://art-video.artstudent.cn/pr/test/13166/1223644/1688/61d6a016d3af493a949cea48ab2ae3ec_uid1078675.mp4",
                    zhuanYeId: this.zhuanYeId,
                    supplement: '自动化测试',
                    zhuanYeMC: this.zhuanYeMC,
                    seId: 0,
                    shootArea: " ",
                    subjectCode: 2,
                    subjectName: "美术中级（统一模式）"
                },
                m: ""
            }, ticket: TICKET
        })
        this.videoUrl = res.params.data.p.videoUrl;
        // console.log('提交视频', res);
    }

    /** 提交视频 */
    async checkAndcommitVideo () {
        // 检查一下能不能提交
        const checkRes = await stuApp.checkAllowToExam({
            data: {
                m: "",
                p: {
                    subjectName: this.subjectName,
                    riChengId: this.riChengID,
                    esId: this.esId
                }
            }, ticket: TICKET
        })
        // 如果可以提交
        if (checkRes.result.datas.allowExam == true) {
            await this.commitVideo()
        } else if (checkRes.result.datas.allowExam == undefined && checkRes.result.message.split('于')[0] == '视频提交将') {
            // throw new Error('提交视频时间没到');
            // 平台登录修改时间
            await yssLogin.platfrom({
                loginName: PLAT_LOGINDATA.loginName,
                password: `Yss${PLAT_LOGINDATA.loginName}`,
            })
            // 修改时间
            await this.saveSubjectByInv({
                shootEndDate: common.getCurrentTime(), // 录制截止时间（当前时间）
                commitPaperEndDate: common.getCurrentTime(2), // 提交答卷截止时间(当前时间)
                commitVideoStartDate: common.getCurrentTime(2), // 视频提交开始时间(当前时间)
            })
            await yssLogin.clientLogin({
                loginName: LOGINDATA.loginName,
                password: argv.env == 'test' ? 'Csk001' : argv.env == 'pre' ? 'Ysk002' : 'Kfk001'
            })
            // 提交视频
            await this.commitVideo()
        } else {
            console.log(checkRes.result);
        }

    }

    /** 考生考试结果断言 */
    async assignDetailAssert () {
        const detailData = await this.getAssignDetail();
        let actual = detailData.result.datas.page.dataList[0]
        // console.log(detailData.result.datas.page.dataList[0]);
        let exp = {
            videoUrl: this.videoUrl
        }
        common.isApproximatelyEqualAssert(exp, actual)
    }

    /**
     * 查询考生专业视频列表-监考笔试类断言
     */
    async studentSubjectVideoListByinvAssert () {
        const res = await this.queryStudentSubjectVideoListByinv();
        // console.log(res.result.datas.stuVideoDOList.find(es => es.esId == this.esId));
        let exp = {
            videoUrl: this.videoUrl
        }
        common.isApproximatelyEqualAssert(exp, res.result.datas.stuVideoDOList.find(es => es.esId == this.esId))
    }

    /** 监考笔试类检查辅机状态 */
    async checkSlaveStatusByinvigilte () {
        const res = await this.checkSlaveStatus({
            data: {
                m: "",
                p: {
                    esId: this.esId,
                    examWay: 1,
                    simulation: 2
                }
            }
            , ticket: TICKET
        })
        console.log('监考笔试类检查辅机状态', res);
        this.allowShoot = res.result.datas.allowShoot;
        return res;
    }

    /** 监考笔试类辅机登录 */
    async multiTerninalLoginByinv () {
        const res = await this.multiTerninalLogin({
            data: {
                p: {
                    businessCode: "1",
                    videoCode: "",
                    ticket: TICKET,
                    udid: LOGINDATA.loginUdid,
                    params: `{esId:${this.esId},svId:${this.svId},baoKaoId:${this.baoKaoId},riChengId:${this.riChengId},qrcodePageType:1,videoCode:'',sampleType:0,businessCode:1,demo:2}`,
                    userId: LOGINDATA.userId
                },
                m: ""
            }
        });
        console.log('辅机登录', res);
        return res;
    }

    /** 监考笔试类获取主机科目信息 */
    async getExamVideoInfoByInv () {
        const res = await this.getExamVideoInfo({
            data: {
                m: "",
                p: {
                    riChengId: this.riChengID,
                    baoKaoId: this.baoKaoId,
                    esId: this.esId,
                    svId: this.svId,
                    simulation: 0
                }
            },
            ticket: TICKET
        })
        console.log('监考笔试类获取主机科目信息', res);
        return res;
    }

    /** 监考笔试类校验辅机是否录制 */
    async checkMasterVideoUploadByInv () {
        const res = await this.checkMasterVideoUpload({
            data:
                { "m": "", "p": { "svId": this.svId } }
            ,
            ticket: TICKET
        });
        console.log('监考笔试类校验辅机是否录制', res);
        return res;
    }

    /** 监考笔试类改变辅机状态 */
    async changeSlaveStatusByInv (params) {
        const res = await this.changeSlaveStatus({
            data: {
                m: "",
                p: Object.assign({
                    esId: this.esId,
                    examWay: 1,
                    riChengId: this.riChengID,
                    slaveStatus: 1,
                    videoCode: "",
                    simulation: 2
                }, params)
            },
            ticket: TICKET
        });
        console.log('监考笔试类改变辅机状态', res);
        return res;
    }

    /** 辅机录制接口套件 */
    async slaveStart () {
        // 检查辅机状态（未开始）
        await this.checkSlaveStatusByinvigilte();
        // 辅机登录
        await this.multiTerninalLoginByinv();
        // 获取主机科目信息
        await this.getExamVideoInfoByInv();
        // 改变辅机状态
        await this.changeSlaveStatusByInv()
        // 校验辅机是否录制
        await this.checkMasterVideoUploadByInv();
        // 检查辅机状态（已开始）
        await this.checkSlaveStatusByinvigilte();
        // 清除录制状态
        await this.clearRecordStatusByInv({ master: 2 })
        // 辅机开始录制
        await this.startRecordByInv({ master: 2 });
    }

}

const invigilateManage = module.exports = {};

invigilateManage.setupInvigilate = function (params) {
    return new Invigilate(params);
}

function Examination () {
    /** 考题id */
    this.tiId = '';
    /** 学校id */
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