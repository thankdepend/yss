/**
 *
 * =>>>>>>>> 粘贴json到h里，格式化成
 *          this.id = ''     
 * 
 */

const h = {
    userID: 1076222,
        profTypeStatus: 1,
        jointExamScore: 350,
        collEntrExamScore: 340,       
        canModifyJointScoreNum: 999,  
        canModifyCollEntrNum: 998,    
        probabilityCanModProvNum: 999,
        englishModifyNum: 1,
        englishLeftNum: 999,
        chineseModifyNum: 1,
        chineseLeftNum: 999,
        provinceID: '110000',
        provinceName: '北京',
        artsOrSciences: 1,
        jointProfTypeID: 24,
        jointProfTypeName: '美术类',
        englishScore: 150,
        chineseScore: 150,
        artsOrSciencesStr: '文科',
        profTypeStatusStr: '统考和校考',
        simpleProvinceName: '北京'
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