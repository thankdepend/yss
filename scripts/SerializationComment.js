const h = {
    groupID: '',
    schoolName: '',
    groupName: '蜜獾的圈子',
    typeFlag: 1,
    typeID: 230,
    verifyFlag: 3,
    isHot: 1,
    stopFlag: 1,
    iconURL: 'http://img.artstudent.cn/pr/2020-08-19/78530cb5ac504221972d2f2661a2de92.png',
    schoolID: '',
    provCityName: '北京市 东城区',
    proviceCode: 110000,
    cityCode: 110101,
    remark: '测试备注',
}

Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {*} ${key}`);
})