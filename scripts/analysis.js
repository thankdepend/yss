// 粘贴json到h里，格式化成
/** id */
// this.id = ''

const h = {
    createdOn: 1598497576000,
    modifiedOn: 1598497576000,
    yongHuID: 1076843,
    zhengJianLX: 4,
    shenFenZH: 'CHENADVISER',
    yongHuKL: 'vtWEsCmPkQCt2v5J59g64g==',
    yongHuMing: '艺术升212828',
    yongHuLB: 620,
    xueXiaoID: null,
    kaoShiID: null,
    kaoDianID: null,
    zhuCeFS: null,
    zhuCeLY: null,
    shouJiHao: '',
    qQ: null,
    email: null,
    weiXinHao: null,
    zhuCeSJ: 1598497576000,
    wenTi: null,
    daAn: null,
    xinXiYT: null,
    kaoShengXM: null,
    gaoKaoSF: null,
    shouJi: null,
    kaoShengHao: null,
    freezeFlag: 2,
    mobileAuthFlag: null,
    fingerPasswd: null,
    useFlag: 1,
    enableFlag: 1,
    noAuthmobileNo: null,
    artCardFlag: null,
    extStr: null,
    postAuth: null,
    idCardNoAuthFlag: null,
    tipPhone: null,
    kaoShiMC: '',
    kaoDianMC: null,
    xueXiaoMC: null,
    sid: null,
    authCode: null,
    smsCode: null,
    updateXinXiYTToNull: false,
    notifyMobile: null,
    idCardRegister: false,
    passportOrGangAoRegister: true,
    studnet: false,
    selected: false,
    yongHuLBStr: '平台顾问',
    zhuCeLYDesc: '',
    zhengJianLXDesc: '护照',
    zhuCeSJStr: '2020-08-27 11:06:16',
    schoolAdmin: false,
    schoolSiteAdmin: false,
    admin: false,
    canEdit: true,
    enableFlagStr: '注销',
    useFlagStr: '禁用',
    freezeFlagStr: '冻结',
    shouJiHaoStr: '',
    createdOnStr: '2020-08-27 11:06:16',
    modifiedOnStr: '2020-08-27 11:06:16'
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