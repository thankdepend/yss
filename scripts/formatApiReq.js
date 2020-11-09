/**
 *
 * =>>>>>> 粘贴json到h   生成这样的格式  * @param {*} id
 * 
 */

const h = {
    "ticket": "oJ0neJmEMv$2VG1jOVBRPT07TlRjeE56VStOekF4TmpjPTs2Ng==", "esId": 895, "videoFileSize": 163965222, "svId": 2764, "kaoShengID": "246682", "baoKaoId": 2619414, "riChengId": 11107838, "shootTime": "1604578366610", "recordPhoto": "http://art-video.artstudent.cn/photo/demo/13166/1223644/895/8b4bca0f878f41a0b5957585df082062_uid1076183.jpg", "photoAttachment": "http://art-video.artstudent.cn/img/demo/13166/1223644/895/e7c69764aab24fbea53fc535c1c1cfab_uid1076183.jpg;http://art-video.artstudent.cn/img/demo/13166/1223644/895/372666e7c7ac4683a565d63c1a642e5d_uid1076183.jpg", "master": 1, "xueXiaoID": 13166, "stuVideoLength": "556", "shenFenZH": "330329", "yongHuID": 1076183, "videoUrl": "http://art-video.artstudent.cn/pr/demo/13166/1223644/895/54b3debdd81542679e68b1d9c94c3355_uid1076183.mp4", "zhuanYeId": 1223644, "supplement": "", "zhuanYeMC": "美术", "seId": "", "shootArea": " ", "subjectCode": "1", "subjectName": "美术理论（普通）"
}


Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {*} ${key}`);
})