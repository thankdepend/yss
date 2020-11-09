const eval = require('../../../reqApi/platfrom/eval');
const {
    common
} = require('../../../lib/index');
const {
    object
} = require('underscore');

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
    async _getRandomClass(params) {
        const classList = await eval.getClassList(params).then(res => res.result.datas.page.dataList);
        const num = common.getRandomNum(0, classList.length - 1);
        console.log(classList[num]);
        return classList[num];
    }

    /** 保存评画老师 */
    async saveTeacher(params) {
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
        },params)
        const res = await eval.saveTeacher(req);
        console.log('评画老师', res);
        this.updateTeacherInfo(req);

    }

    /** 更新老师信息 */
    updateTeacherInfo(params){
        common.update(this,params);
        console.log('更新后信息',this);
    }

    /** 获取老师id */
    async getTeacherId(){
        await this.getTeacherList();
    }

    /**
     * 查询老师列表
     */
    async getTeacherList(params){
        const res = await eval.getTeacherList(params);
        console.log(res);
    }

    /** 老师列表断言 */
    async teacherListAssert(){
        await this.getTeacherList();
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
teacherManage.returnTeacher = async function(params) {
    const teacherList = await eval.getTeacherList({identityAuthFlag: 1,ticket:PLAT_TICKET}).then(res => res.result.datas.page.dataList);
    const rdmTeacher = teacherList[common.getRandomNum (0,teacherList.length-1)]
    return rdmTeacher;
}