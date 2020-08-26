const h = {
    groupID: '',
    schoolName: '',
    groupName: `圈`,
    typeFlag: 1,
    typeID: '',
    verifyFlag: 3,
    isHot: 1,
    stopFlag: 1,
    iconURL: 'http://img.artstudent.cn/pr/2020-08-19/78530cb5ac504221972d2f2661a2de92.png',
    schoolID: '',
    provCityName: '北京市 东城区',
    proviceCode: 110000,
    cityCode: 110101,
    remark: `备注`,
    ticket: ''
}
let s = ``
Object.keys(h).forEach((key) => {
    s += `${key}: this.${key},\n`
})
// eval(s)
console.log(s);