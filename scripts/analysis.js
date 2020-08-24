// 粘贴json到h里，格式化成
/** id */
// this.id = ''

const h = {
    groupID: 68,
    groupName: '面如土色圈',
    typeFlag: 1,
    verifyFlag: 3,
    stopFlag: 1,
    postNum: 0,
    userNum: 0,
    iconURL: 'http://img.artstudent.cn/pr/2020-08-19/78530cb5ac504221972d2f2661a2de92.png',
    createdUser: null,
    createdName: null,
    belongedUser: 1196064,
    belongedUserName: null,
    remark: '备注ywCFL',
    provCityName: '北京市 东城区',
    proviceCode: '110000',
    cityCode: '110101',
    dissolveFlag: 1,
    auditFlag: null,
    schoolID: null,
    schoolName: '',
    isHot: 1,
    auditReason: null,
    typeID: 281,
    typeName: '壤奠',
    order: null,
    isJoin: false,
    isMore: false,
    creater: 1,
    shareURL: null,
    complainable: false,
    groupUserList: null,
    createdOnStr: '2020-08-19',
    auditFlagStr: '通过',
    dissolveFlagStr: '未解散',
    isHotStr: '是',
    typeFlagStr: '官方',
    stopFlagStr: '启用',
    verifyFlagStr: '允许任何人',
    join: false,
    modifiedOnStr: '2020-08-19 14:36:34'
}
let s = ``
Object.keys(h).forEach((key) => {
    s += `/** ${key} */ \n this.${key}=''; \n`
})
eval(s)
console.log(s);


// const a = {
//     typeIds: 26,
//     provChName: '浙江省',
//     prov: 330000,
// }

// let arr = [];
// const c = '/** */ '
// // const a = '/** */'+
// const b = Object.keys(a);
// b.forEach(obj => 
//     arr.push(`${c} + \n + ${obj}`)
// );
// console.log(arr);



// console.log(Object.keys(a));


// Object.keys(a).forEach(val => {
//     console.log(val,a[val]);
// })