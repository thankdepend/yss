/**
 *
 * =>>>>>>>> 粘贴json到h里，格式化成
 *          this.id = ''     
 * 
 */

const h = {
    author: "王小海",
    createdOn: 1536648662000,
    createdOnStr: "2018-09-11 14:51:02",
    infoID: 27,
    infoTitle: "中国美术学院2018年招生简章",
    infoTypeID: 3,
    infoTypeName: "院校介绍1",
    modifiedOn: 1568000474000,
    modifiedOnStr: "2019-09-09 11:41:14",
    releaseTime: 1534818521000,
    releaseTimeStr: "2018-08-21 10:28:41",
    saveType: null,
    schoolCode: "10047",
    schoolID: 10047,
    schoolInfoID: 6,
    schoolName: "中央美术学院",
    showInGuide: 2,
    showInGuideStr: "否",
    topFlag: 2,
    topFlagStr: "未置顶",
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