'use strict';
require('./global');
// const assume = require('./assume');
const check = require('./assert.js');
const dateHandler = require('./dateHandler.js');
const httpRequest = require('./httpRequest.js');
const calculate = require('./calculate.js');
const doc = require('../project/data/doc.json')
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
    let str = `饮赞听蚀骗课畜悟状蝶准磁俯纽及相舟泼吊铸让
    粱恭扬料顾著庸坦袋沸给筹祸亲视仍厌贿霜态沙沾礼领供班伶
    霞逆恼蜓句透均赴浮蹦什箩仙胡川遮坚昏壳亮最框厅镰末孩解
    搭议肠钩归嗽翠究置碑饱哗伍锋赖司乎答产刺坟乌战羡绝送胞
    慨嗓付踩桂纤血块余控颤碧息元瞎剪邮浙弟涂闸忠栏仆狡接版
    扇与跃座等世醒海劈调染予例青隐沉辈膛伯神横他比推淘嫁纲
    企空不挺言汽益率招逃猫较挡若卸区亡范处话桥花拖清可护光
    式絮力述汉兵糠静引坑尺盈豆段型启莫`;
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
 * @alias module:common
 * @return {string}
 */
common.getRandomProvince = function () {
    const proVinceList = [
        {
            provinceName: '河北省',
            provinceCode: 130000,
            provinceSxCode: 13,
        }, {
            provinceName: '山西省',
            provinceCode: 140000,
            provinceSxCode: 14,
        },
        {
            provinceName: '内蒙古自治区',
            provinceCode: 150000,
            provinceSxCode: 15,
        },
        {
            provinceName: '辽宁省',
            provinceCode: 210000,
            provinceSxCode: 21,
        }, {
            provinceName: '吉林省',
            provinceCode: 220000,
            provinceSxCode: 22,
        }, {
            provinceName: '黑龙江省',
            provinceCode: 230000,
            provinceSxCode: 23,
        },
        {
            provinceName: '江苏省',
            provinceCode: 320000,
            provinceSxCode: 32,
        }, {
            provinceName: '浙江省',
            provinceCode: 330000,
            provinceSxCode: 33,
        }, {
            provinceName: '安徽省',
            provinceCode: 340000,
            provinceSxCode: 34,
        }, {
            provinceName: '福建省',
            provinceCode: 350000,
            provinceSxCode: 35,
        }, {
            provinceName: '江西省',
            provinceCode: 360000,
            provinceSxCode: 36,
        }, {
            provinceName: '山东省',
            provinceCode: 370000,
            provinceSxCode: 37,
        }, {
            provinceName: '河南省',
            provinceCode: 410000,
            provinceSxCode: 41,
        },

        // {
        //     provinceName: '湖北省',
        //     provinceCode: 420000,
        //     provinceSxCode: 42,
        // }, 
        {
            provinceName: '湖南省',
            provinceCode: 430000,
            provinceSxCode: 43,
        },
        // {
        //     provinceName: '广东省',
        //     provinceCode: 440000,
        //     provinceSxCode: 44,
        // },
        // {
        //     provinceName: '海南省',
        //     provinceCode: 460000,
        //     provinceSxCode: 46,
        // }, 
        {
            provinceName: '四川省',
            provinceCode: 510000,
            provinceSxCode: 51,
        }, {
            provinceName: '贵州省',
            provinceCode: 520000,
            provinceSxCode: 52,
        },
        // {
        //     provinceName: '云南省',
        //     provinceCode: 530000,
        //     provinceSxCode: 53,
        // },
        //  {
        //     provinceName: '陕西省',
        //     provinceCode: 610000,
        //     provinceSxCode: 61,
        // }, 
        {
            provinceName: '甘肃省',
            provinceCode: 620000,
            provinceSxCode: 62,
        }, {
            provinceName: '青海省',
            provinceCode: 630000,
            provinceSxCode: 63,
        },
        {
            provinceName: '广西壮族自治区',
            provinceCode: 450000,
            provinceSxCode: 45,
        },
        {
            provinceName: '上海市',
            provinceCode: 310000,
            provinceSxCode: 31,
        }
    ]
    const proVince = proVinceList[common.getRandomNum(0, proVinceList.length - 1)];
    return proVince;
};


/**
 * 获取省份文理科
 * @param {String} provinceName 
 */
common.getProvinceWenliKe = (provinceName) => {
    if (provinceName == '河北省') {
        return "不分文理";
    } else if (provinceName == '辽宁省') {
        return "不分文理";
    } else if (provinceName == '江苏省') {
        return "不分文理";
    } else if (provinceName == '浙江省') {
        return "不分文理";
    } else if (provinceName == '福建省') {
        return "不分文理";
    } else if (provinceName == '山东省') {
        return "不分文理";
    } else if (provinceName == '湖北省') {
        return "不分文理";
    } else if (provinceName == '湖南省') {
        return "不分文理";
    } else if (provinceName == '广东省') {
        return "不分文理";
    } else if (provinceName == '广东省') {
        return "不分文理";
    } else if (provinceName == '海南省') {
        return "不分文理";
    } else if (provinceName == '重庆市') {
        return "不分文理";
    } else {
        return '文科';
    }
};

/**
 * 获取一首古诗
 * @param {String} provinceName 
 */
common.getPoetry = (provinceName) => {
    let poetry = [
        '折梅逢驿使，寄与陇头人。江南无所有，聊赠一枝春。——南北朝.陆凯《赠范晔》',
        '汀洲采白苹，日落江南春。洞庭有归客，潇湘逢故人。故人何不返，春华复应晚。不道新知乐，只言行路远。——南朝.柳恽《江南曲》',
        '浪花有意千重雪，桃李无言一队春。 ——五代.李煜《渔歌子》',
        '燕子不归春事晚，一汀烟雨杏花寒。——唐.戴叔伦《苏溪亭》',
        '今夜偏知春气暖，虫声新透绿窗纱。——唐.刘方平《月夜》',
        '况是青春日将暮，桃花乱落如红雨。——唐.李贺《将进酒》',
        '耶溪采莲女，见客棹歌回。 笑入荷花去，佯羞不出来。 ——唐.李白《越女词》',
        '砌下落花风起，罗衣特地春寒。——唐.冯延巳《清平乐》',
        '我是梦中传彩笔，欲书花叶寄朝云。——唐·李商隐《牡丹》',
        '长安豪贵惜春残，争赏街西紫牡丹。别有玉盘承露冷，无人起就月中看。——唐.裴潾《裴给事宅白牡丹》',
        '细雨湿衣看不见，闲花落地听无声。——唐.刘长卿《别严士元》',
        '雨恨云愁，江南依旧称佳丽。水村渔市。一缕孤烟细。天际征鸿，遥认行如缀。平生事。此时凝睇。谁会凭阑意。——宋.王禹偁《点绛唇.感兴》',
        '竹摇清影罩幽窗，两两时禽噪夕阳。谢却海棠飞尽絮，困人天气日初长。——宋.朱淑真《即景》',
        '世路如今已惯，此心到处悠然。寒光亭下水如天，飞起沙鸥一片。——宋.张孝祥《西江月》',
        '紫玉钗斜灯影背，红绵粉冷枕函偏。——清.纳兰性德《浣溪沙》',
        '滴空阶、寒更雨歇，葬花天气。——清.纳兰性德《金缕曲.亡妇忌日有感》',
        '雪似梅花，梅花似雪。似和不似都奇绝。恼人风味阿谁知？请君问取南楼月。记得去年，探梅时节。老来旧事无人说。为谁醉倒为谁醒？到今犹恨轻离别。——宋.吕本中《踏莎行》',
        '瑶草一何碧，春入武陵溪。溪上桃花无数，花上有黄鹂，我欲穿花寻路，直入白云深处，浩气展虹霓。只恐花深里，红露湿人衣。坐玉石，欹玉枕，拂金徽。谪仙何处，天人伴我白螺杯。我为灵芝仙草，不为朱唇丹脸，长啸亦何为！醉舞下山去，明月逐人归。——宋.黄庭坚《水调歌头.游览》',
        '为报先生归也，杏花春雨江南。——元.虞集《风入松》',
        '不知何日始工愁，记取那回花下一低头。——近代.王国维《虞美人》',
        '芳树无人花自落，春山一路鸟空啼。——唐.李华《春行即兴》',
        '怀君属秋夜， 散步咏凉天。空山松子落， 幽人应未眠。——唐.韦应物《秋夜寄丘员外》',
        '古屋寒窗底，听几片、井桐飞坠。——宋,周邦彦《夜游宫》',
        '大瓢贮月归春瓮，小杓分江入夜瓶。——宋.苏轼《汲江煎茶》',
        '晓看天色暮看云，行也思君，坐也思君。——明.唐寅《一剪梅》',
        '樱花落尽阶前月，象床愁倚薰笼。——五代.李煜《谢新恩》',
        '惆怅双鸳不到，幽阶一夜苔生。——宋.吴文英《风入松》',
        '窗外月华霜重，听彻梅花弄。——宋.秦观《桃源忆故人》',
        '梅子留酸软齿牙，芭蕉分绿与窗纱。日长睡起无情思，闲看儿童捉柳花。——宋.杨万里《闲居初夏午睡起》',
    ]
    const randomPoetry = poetry[common.getRandomNum(0, poetry.length - 1)];
    return randomPoetry;
};

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
 * 随机返回图片
 * @alias module:common
 */
common.getrandomPic = function () {
    return doc.test.other[common.getRandomNum(0, doc.test.other.length - 1)];
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
common.getRandomMobile = () => `12${dateHandler.getCurrentDate('YY-MM-DD').replace(/-/g, '').slice(1)}${common.getRandomNumStr(4)}`;

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