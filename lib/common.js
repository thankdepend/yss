'use strict';
require('./global');
// const assume = require('./assume');
const check = require('./assert.js');
const dateHandler = require('./dateHandler.js');
const httpRequest = require('./httpRequest.js');
const calculate = require('./calculate.js');
const fs = require('fs');
const path = require('path');
// const moment = require('moment');

/**
 * 通用方法
 * @module common
 * @see module:calculate
 * @see module:check
 * @see module:dateHandler
 * @see module:httpRequest
 */
let common = {};

/**
 * mixObject - 混合对象,新的覆盖旧的
 * @alias module:common
 * @param {array} obj 对象数组
 * @return {object} 混合后的结果
 */
common.mixObject = (...obj) => Object.assign({}, ...obj);

/**
 * dedupe - 数组去重
 * @alias module:common
 * @param {object} array 需要去重的数组
 * @return {object} 去重后的结果
 */
common.dedupe = array => Array.from(new Set(array));

/**
 * addObject - 对象相加，相同属性则数值想加，其他用jo2的值
 * @alias module:common
 * @param {object} jo1
 * @param {object} jo2
 * @return {object}
 */
common.addObject = (jo1, jo2) => {
    for (const key in jo2) {
        if (typeof jo2[key] == 'object' && typeof jo1[key] == 'object') {
            jo1[key] = common.addObject(jo1[key], jo2[key]);
        } else if (isNaN(jo2[key])) {
            jo1[key] = jo2[key];
        } else {
            const value = isNaN(jo1[key]) ? 0 : jo1[key];
            jo1[key] = calculate.add(value, jo2[key]);
        };
    };
    return jo1;
};
common.subObject = (jo1, jo2) => {
    for (const key in jo2) {
        if (typeof jo2[key] == 'object' && typeof jo1[key] == 'object') {
            jo1[key] = common.subObject(jo1[key], jo2[key]);
        } else if (isNaN(jo2[key])) {
            jo1[key] = jo2[key];
        } else {
            const value = isNaN(jo1[key]) ? 0 : jo1[key];
            jo1[key] = calculate.sub(value, jo2[key]);
        };
    };
    return jo1;
};

common.getListSum = (list, predicate) => {
    let sum = {};
    const isFunc = typeof predicate === 'function';
    for (let index = 0; index < list.length; index++) {
        if (!isFunc || predicate(list[index])) {
            sum = common.addObject(sum, list[index]);
        };
    };
    return sum;
};

/**
 * getRandomNum - 获取min~max之间的随机数
 * @alias module:common
 * @param {number}   min
 * @param {number}   max
 * @param {number} [dn=0] 保留小数位 默认0
 * @return {number}
 */
common.getRandomNum = (min, max, dn = 0) => {
    let num = min + Math.random() * (max - min);
    return Number(num.toFixed(dn));
};

/**
 * getRandomStr - 获取随机字符串
 * @alias module:common
 * @param {number} n 字符串位数
 * @return {string}
 */
common.getRandomStr = function (n) {
    let ret = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    for (let i = 0; i < n; i++) {
        let num = common.getRandomNum(0, 61);
        ret += str.charAt(num);
    };
    return ret;
};

/**
 * getRandomNumStr - 获取随机n位纯数字组成的字符串
 * @alias module:common
 * @param {number} n 字符串位数
 * @return {string}
 */
common.getRandomNumStr = function (n) {
    let ret = '';
    let str = '1234567890';
    for (let i = 0; i < n; i++) {
        let num = common.getRandomNum(0, 9);
        ret += str.charAt(num);
    };
    return ret;
};

/**
 * getRandomChineseStr - 获取随机n位中文组成的字符串
 * @alias module:common
 * @param {number} n 字符串位数
 * @return {string}
 */
common.getRandomChineseStr = function (n) {
    let ret = '';
    let str = '赵钱孙李周吴郑王金木水火土梅花竹子兰欣雨诗白晓玉宇宋剑志娇春明莹薛学雪海国建兵卫士嘉媛家';
    for (let i = 0; i < n; i++) {
        let num = common.getRandomNum(0, 43);
        ret += str.charAt(num);
    };
    return ret;
};

/**
 * getRandomChineseStr - 获取随机n位中文组成的文本
 * @alias module:common
 * @param {number} n 字符串位数
 * @return {string}
 */
common.getRandomContent = function (n) {
    let ret = '';
    let str = `饮赞听蚀骗课畜悟状蝶准磁俯纽及相舟泼吊铸让粱恭扬料顾著庸坦袋沸给筹祸亲视仍厌贿霜态沙沾礼领供班伶霞逆恼蜓句透均赴浮蹦什箩仙胡川遮坚昏壳亮最框厅镰末孩解搭议肠钩归嗽翠究置碑饱哗伍锋赖司乎答产刺坟乌战羡绝送胞慨嗓付踩桂纤血块余控颤碧息元瞎剪邮浙弟涂闸忠栏仆狡接版扇与跃座等世醒海劈调染予例青隐沉辈膛伯神横他比推淘嫁纲企空不挺言汽益率招逃猫较挡若卸区亡范处话桥花拖清可护光式絮力述汉兵糠静引坑尺盈豆段型启莫`;
    for (let i = 0; i < n; i++) {
        let num = common.getRandomNum(0, 199);
        ret += str.charAt(num);
    };
    return ret;
}

/**
 * getRandomChineseStr - 获取随机词语
 * @alias module:common
 * @return {string}
 */
common.getRandomWord = function () {
    const words = [
        '述圣', '噤吟', '诋伤', '入不敷出', '雕鹫', '凌当',
        '颙昂', '截票', '族师', '天时', '穷服', '恣放',
        '假意', '问遂', '画狱牢', '障阂', '风帚', '九女',
        '倾飐', '言归和好', '故蹊', '还祭', '抢快', '鹿皮帽',
        '貌托', '肆通', '亢燥', '公害病', '清丽俊逸', '静谳',
        '刁虐', '头昏目眩', '群英会', '动不动', '缌麻服', '分歧点',
        '西牢', '绣刺', '为行', '筑室', '量体重', '髫穉',
        '粉侯', '训士', '美实', '邪昵', '酒仙', '帮规',
        '面如土色', '质木', '壤奠', '公孤', '连珠营', '惇惠',
        '金窓', '奉答', '柳緑花红', '杨越', '半阴', '钗头',
        '三眼一板', '重地', '怨情', '霹雳引', '冰天', '沦丧',
        '湔磨', '畯德', '飞茎', '好逑', '逋薮', '束如牛腰',
        '阳极射线', '拼盘', '证象', '省墓', '筹兵', '营头',
        '落潮', '剑麻', '以一知万', '云梦闲情', '画藳', '慓果',
        '续然', '泚额', '既灌', '唆嘴', '进向', '佥事',
        '留存', '里圈', '固态', '时语', '毛心', '蜂糖',
        '钟鸣鼎列', '克薄', '礼文', '酒恶',
    ]
    // let arr = words.split('\n');
    // const arr1 = arr.map(word => {
    //     let reg = word.replace(/^\s*|\s*$/g, '')
    //     if (reg != '') {
    //         return reg;
    //     }
    // })
    // console.log(arr1);

    const word = words[common.getRandomNum(0, words.length - 1)];
    return word;
}

/**
 * isNumber
 * @alias module:common
 * @param {type} input
 * @return {boolean}
 */
common.isNumber = (input) => {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
};

/**
 * isDate
 * @alias module:common
 * @param {type} input
 * @return {boolean}
 */
common.isDate = (input) => {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
};

/**
 * 是否图片格式
 * @description 根据文件扩展名判断
 * @param {string} str
 */
common.isImage = (str) => {
    const extension = str.substr(str.lastIndexOf('.') + 1).toLowerCase();
    let isImage = false;
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
        isImage = true;
    };
    return isImage;
};


/**
 * delay - 等待
 * @alias module:common
 * @async
 * @param {number} [ms=1000] 等待时间 ms
 */
common.delay = async function (ms = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

common.takeWhile = function (array, predicate) {
    if (array && array.length) {
        let list = [];
        array.forEach((obj, index, array) => predicate(obj, index, array) && list.push(obj));
        return list;
    } else {
        return [];
    };
};

/**
 * 数组随机排序
 * @param {array} arr
 */
common.randomSort = (arr) => {
    let len = arr.length;
    if (!len) return [];

    for (let i = 0; i < len - 1; i++) {
        let idx = Math.floor(Math.random() * (len - i));
        [arr[idx], arr[len - i - 1]] = [arr[len - i - 1], arr[idx]];
    };
    return arr;
};

/**
 * 生成随机手机号
 * @description 以12开头的手机号
 */
common.getRandomMobile = () => `
        12 $ {
            dateHandler.getCurrentDate('YY-MM-DD').replace(/-/g, '').slice(1)
        }
        $ {
            common.getRandomNumStr(4)
        }
        `;

common.update = function (oldObj, newObj = {}) {
    for (const key in newObj) {
        if (oldObj.hasOwnProperty(key)) {
            oldObj[key] = newObj[key];
        }
    }
    return oldObj;
};

common.arrRemoveSameEle = function (arr1, arr2) {
    _.remove(arr1, function (n) {
        let flag = false;
        for (const a of arr2) {
            if (a == n) {
                flag = true;
                break;
            }
        }
        return flag;
    });
    return arr1;
};

/** 增加默认分页 */
common.pagingFormat = function (obj) {
    return Object.assign({
        "curPage": 1,
        "pageSize": 15
    }, obj)

}

/**
 * 读取目录
 * @param {String} path 文件路径
 * @param {Array} [filesList=[]] 文件列表
 */
common.readDirList = function (dir, filesList = []) {
    const files = fs.readdirSync(dir);
    // console.log(files);
    files.forEach((item) => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            this.readDirList(path.join(dir, item), filesList); // 递归读取文件
        } else {
            filesList.push(fullPath);
        }
    });
    return filesList;
};

Object.assign(common, check, dateHandler, httpRequest, calculate);
module.exports = common;