/**
 *
 * =>>>>>>>> 粘贴json到h里，格式化成
 *          this.id = ''     
 * 
 */

const h = {
    createdOn: 1606287214000,
    modifiedOn: 1606471712000,
    tiId: 891,
    xueXiaoId: 13166,
    kaoShiId: 13047,
    kaoShiMC: '2021年本科招生',
    zhuanYeId: 1223644,
    zhuanYeMC: '美术',
    esId: 1688,
    subjectName: '美术中级（统一模式）',
    quesType: null,
    detail: 'http://art-admin1.oss-cn-hangzhou.aliyuncs.com/pr/2020-11-26/0bd71ef772094ef5a2911e4d313a4dea.txt',
    ordNo: 1,
    createdDate: null,
    rowNumber: null,
    examVideoUrl: '',
    examPicUrl: '',
    examPicUrlList: null,
    examAudioUrl: '',
    examinationAudio: '',
    quesBankType: 1,
    publishFlag: 1,
    examinationBatchNo: 0,
    kaoShiRQSM: '',
    paperId: null,
    paperName: null,
    examType: '2',
    examGuideText: null,
    checkFlag: 1,
    examinationList: null,
    examVideoUrlTemp: null,
    clearDetail: 0,
    kaoShiRQSMStr: '',
    quesBankTypeStr: '正式库',
    checkFlagStr: '已核验',
    publishFlagStr: '发布',
    batchNoStr: '无',
    isPublish: true,
    isChecked: true,
    createdOnStr: '2020-11-25 14:53:34',
    modifiedOnStr: '2020-11-27 18:08:32'
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