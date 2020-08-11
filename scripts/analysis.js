// 粘贴json到h里，格式化成
/** id */
// this.id = ''

const h = {
    infoID: '',
    content: '',
    infoState: 2,
    topFlag: 2,
    infoCategoryName: '头条',
    infoCategoryID: 8,
    infoTitle: '蜜獾自动化资讯KNugU',
    infoSubTitle: '',
    showListFlag: 1,
    timingFlag: 2,
    timingPushDate: '',
    commentFlag: 2,
    provinceCode: 0,
    needPay: 0,
    needPayInfoType: '',
    orderNum: 113,
    belongOrg: 1,
    author: '蜜獾',
    pictureURL: 'http://img.artstudent.cn/pr/2020-08-10/3b697be5a37b4f68b3a557343fc737b3.png',
    publishDate: '',
    infoPreview: '',
    infoContentUrl: ''
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