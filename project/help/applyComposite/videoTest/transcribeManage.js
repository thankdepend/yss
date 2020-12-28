

/**
 * @alias 视频录制类
 */
class transcribe extends videoBase {
    constructor() {
        super();
        /** 视频录制主要信息 */
        this.transcribeMain = new Object();
    }

    /** 视频录制基本信息 */
    async updateTranscribe () {
        this.transcribeMain = await this.getRicheng('视频录制')
    }

    /** 视频录制考试 */
    async transcribeExam () {
        await this.saveStatusToJoinHall();
        await this
    }

    /** 保存考试状态为进考场 */
    async saveStatusToJoinHall () {
        await this.saveStudentExamStatus();
    }



}