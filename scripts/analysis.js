/**
 *
 * =>>>>>>>> 粘贴json到h里，格式化成
 *          this.id = ''     
 * 
 */

const h = {
    createdOn: 1605921022000,
    createdOnStr: "2020-11-21 09:10:22",
    crossPiontStr: "是",
    examSiteList: null,
    examTicketTitle: null,
    examType: null,
    genOrgerNo: false,
    genOrgerNoStr: "否",
    hideFlag: null,
    isCrossPiont: 1,
    isGenOrderNo: 2,
    isLockFlag: false,
    isProfReject: 1,
    isSchedConflict: 1,
    isUseRight: 2,
    isnotLockFlag: true,
    kaiTongBZ: 1,
    kaiTongBZStr: "是",
    kaoShiID: 13047,
    kaoShiMC: "2021年本科招生",
    kaoShiND: "2021",
    kaoShiYF: "1-2月",
    lockFlag: null,
    lockFlagStr: "未锁定",
    logo: "http://img.artstudent.cn/pr/2020-07-03/40464a8fab624a03b7a3e20f5f522dd5.jpg",
    modifiedOn: 1606118506000,
    modifiedOnStr: "2020-11-23 16:01:46",
    onScoreQuery: true,
    profRejectStr: "是",
    remark: null,
    schedConflictStr: "是",
    schoolType: null,
    ticketNoticeRange: null,
    useRight: false,
    useRightStr: "否",
    xianKaoZYS: 0,
    xianKaoZYSStr: "不限专业数",
    xueXiaoID: 13166,
    xueXiaoMC: "中共艺术学院",
    xueXiaoMH: "13166",
    zhiYuanShu: 0,
    zhiYuanShuStr: "不填报专业志愿",
    zhunKaoZZDY: null,
    zhunKaoZZDYStr: null,
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