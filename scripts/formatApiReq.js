/**
 *
 * =>>>>>> 粘贴json到h   生成这样的格式  * @param {*} id
 * 
 */

const h = { "xueXiaoID": 13166, "kaoShiID": 12937, "zhuanYeID": 1223677, "kaoDianID": 642, "baoKaoID": 2619549, "arrangeId": 10035, "slaveFlag": 2 }


Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {*} ${key}`);
})