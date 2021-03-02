const eval = require('../../../reqApi/platfrom/eval');
const evalApp = require('../../../reqApi/app/eval');
const {
    common
} = require('../../../lib/index');


class Teacher {
    constructor() {
        /** 老师id */
        this.teacherId = '';
        /** 老师名字 */
        this.teacherName = '';
        /** 类别名称 */
        this.className = '';
        /** 类别id */
        this.classId = '';
        /** 专业标签 */
        this.profTag = '';
        /** 专业id */
        this.profIds = '';
        /** 修改次数 */
        this.baseModifyTimes = '';
        /** 认证标志 */
        this.identityAuthFlag = '';
        /** 排序号 */
        this.orderNo = '';
        /** 老师简介 */
        this.introduction = '';
        /** 老师介绍 */
        this.detail = '';
    }

    /**
     * 获取随机类别
     */
    async _getRandomClass (params) {
        const classList = await eval.getClassList(params).then(res => res.result.datas.page.dataList);
        const num = common.getRandomNum(0, classList.length - 1);
        console.log(classList[num]);
        return classList[num];
    }

    /** 保存评画老师 */
    async saveTeacher (params) {
        const rdmClass = await this._getRandomClass({
            ticket: PLAT_TICKET
        })
        const req = Object.assign({
            teacherId: 12,
            teacherName: common.getRandomChineseStr(2),
            className: rdmClass.className,
            classId: rdmClass.className,
            profTag: '素描,色彩',
            profIds: '1,2',
            baseModifyTimes: 0,
            identityAuthFlag: 1,
            orderNo: 5,
            introduction: '老师简介',
            detail: '老师介绍',
        }, params)
        const res = await eval.saveTeacher(req);
        console.log('评画老师', res);
        this.updateTeacherInfo(req);

    }

    /** 更新老师信息 */
    updateTeacherInfo (params) {
        common.update(this, params);
        console.log('更新后信息', this);
    }

    /** 获取老师id */
    async getTeacherId () {
        await this.getTeacherList();
    }

    /**
     * 查询老师列表
     */
    async getTeacherList (params) {
        const res = await eval.getTeacherList(params);
        console.log(res);
    }

    /** 老师列表断言 */
    async teacherListAssert () {
        await this.getTeacherList();
    }

    /**
     * 老师批改作品
     */
    async submitEvaluation (params) {
        const evaluationParams = await this.evaluationJsonMock(params)
        console.log('返回值', evaluationParams);
        const res = await evalApp.submitEvaluation({
            data: {
                m: '',
                p: evaluationParams
            },
            ticket: TICKET
        });
        console.log(res);
    }

    /**
     * 老师评画参数构造
     */
    async evaluationJsonMock (params) {
        // 获取打分项
        const res = await evalApp.getScoreItemList({
            data: {
                m: '',
                p: {
                    classId: params.classId,
                    profId: params.profId
                }
            },
            ticket: TICKET
        });
        let scoreitemList = res.result.datas.list

        // 随机获取锚点个数
        let pointNum = common.getRandomNum(1, 5);
        let pointconTent = new Array(pointNum).fill({})

        // 随机锚点位置
        let pointDetail = pointconTent.map(() => {
            let obj = {};
            obj.commentStr = common.getPoetry();
            obj.pointX = Math.random().toFixed(3);
            obj.pointY = Math.random().toFixed(3);
            obj.type = 1;
            obj.voiceTime = 0;
            return obj
        })

        // 打分项及分数
        let scoreDetailList = scoreitemList.map(obj => {
            return {
                itemId: obj.itemId,
                itemName: obj.itemName,
                score: common.getRandomNum(1, 5),
                type: 1,

            }
        })

        let json = {
            evaluationId: params.evaluationId,
            score: common.getRandomNum(30, 100),
            evaluationDetail: JSON.stringify(pointDetail),
            scoreDetailList: scoreDetailList,
            teacherAssess: common.getPoetry(),
            modifyPaintUrl: params.paintUrl
            // modifyPaintUrl: "http://img.artstudent.cn/pr/2020-09-30/872000ff7779451cbcc1a3fdbbc06e8b.jpg"
        }
        return json;
    }

}

const teacherManage = module.exports = {};

/**
 * @alias 初始化老师
 */
teacherManage.setupTeacher = function () {
    return new Teacher();
}

/**
 * @alias 随机返回一个老师
 */
teacherManage.returnTeacher = async function (params) {
    const teacherList = await eval.getTeacherList({ identityAuthFlag: 1, ticket: PLAT_TICKET }).then(res => res.result.datas.page.dataList);
    const rdmTeacher = teacherList[common.getRandomNum(0, teacherList.length - 1)]
    return rdmTeacher;
}

/**
 * @alias 根据老师名称获取评画老师登录账号
 */
teacherManage.getTeacherAccount = async function (name) {
    const teacherAcc = require('../../data/evalTeacher')
    if (name) {
        if (name == '天美云豹老师') {
            return teacherAcc.test.yunbao
        } else if (name == '央美猪猪老师') {
            return teacherAcc.test.zhuzhu
        } else if (name == '南传螃蟹老师') {
            return teacherAcc.test.pangxie
        } else if (name == '国美蜜獾老师') {
            return teacherAcc.test.mihuan
        } else if (name == '浙传海豚老师') {
            return teacherAcc.test.haitun
        } else if (name == '鲁美海贝老师') {
            return teacherAcc.test.haibei
        } else {
            throw new Error('没有这个老师')
        }
    }
}