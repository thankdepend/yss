// 粘贴json到h里，格式化成
/** id */
// this.id = ''

const h = {
    ticket: 'QY5ITC731q$2VFhwQlBRPT07S2lrdUx5b21LUzB1TEM4PTszMDMw',
    roomName: '钱雨建の直播间',
    categoryName: '直播分类名称',
    categoryID: 2,
    startTime: '2020-08-06 09:52:26',
    anchorName: '主播mONaL',
    anchorId: 1200565,
    maxNum: 87,
    orderNum: 114,
    infoFlag: 1,
    commentFlag: 1,
    playBackFlag: 1,
    noticeContent: '直播公告：o6Dwk'
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