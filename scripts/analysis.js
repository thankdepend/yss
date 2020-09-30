/**
 *
 * =>>>>>>>> 粘贴json到h里，格式化成
 *          this.id = ''     
 * 
 */

const h = {
    createdOn: 1598497576000,
    modifiedOn: 1598497576000,
    yongHuID: 1076843,
    zhengJianLX: 4,
    shenFenZH: 'CHENADVISER',
    yongHuKL: 'vtWEsCmPkQCt2v5J59g64g==',
    yongHuMing: '艺术升212828',
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