// 粘贴json到h里，格式化成
/** id */
// this.id = ''

const h = {
    postID: 89,
    groupID: 16,
    groupName: '大好河山',
    content: '大家都能',
    topFlag: 2,
    fineFlag: 2,
    createdUser: 1195686,
    postType: 1,
    location: '浙江省杭州市余杭区文一西路辅路',
    userExtendInfo: [Object],
    postStatisticalDO: [Object],
    colletion: false,
    praise: false,
    isDel: false,
    showBrowseNumCache: 834,
    fineFlagStr: '否',
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