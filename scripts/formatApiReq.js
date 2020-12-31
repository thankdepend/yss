/**
 *
 * =>>>>>> 粘贴json到h   生成这样的格式  * @param {*} id
 * 
 */

const h = { "xueXiaoId": 13166, "subjectName": "美术中级（统一模式）", "zhuanYeMC": "美术", "photoAttachment": "http://art-video.artstudent.cn/img/test/13166/1223644/1688/74a10784889c4aa9a8def51f4fd5390b_uid1078675.jpg", "baoKaoId": 2628461, "yongHuID": 1078675, "esId": 1688, "riChengId": 11108259 }


Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {*} ${key}`);
})