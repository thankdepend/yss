// console.log('hello ',process.argv[4]);

// let yargs = require('yargs')
// .alias('n','name')
// // .boolean('n')
// // .boolean('env')
// // console.log('hello ',argv.env);
// // console.log('hi ',argv.name);
// // console.log('hi ',argv._);
// console.log(yargs.parse());
// // console.log(yargs);
// console.log('hhh',yargs.argv.name);
// console.log('gg',yargs.argv.env);

// const caps = require('../data/caps');

// console.log(caps);

// var fs = require('fs')

// const path = require('path')
// const ps = path.join('../prob/doc/mnls.jpg')
// console.log(ps);
// const a = require('../prob/data/doc.json');
// const b = require('../prob/doc/mnls.jpg');
// console.log(b);
// var fs = require('fs');
//   var data = fs.readFileSync('../prob/doc','utf-8');
// console.log(data);

const {
    common
} = require('../lib/index');
// const doc = require('../prob/data/doc.json');
// let a = doc.pre.peolpe.longUrl[common.getRandomNum(0, doc.pre.peolpe.longUrl.length - 1)]
// console.log(a);
// let a = ['男', '女'][common.getRandomNum(0, ['男', '女'].length - 1)];
// console.log(a);

// const h = {
//     createdOn: 1594349469000,
//     modifiedOn: 1595234494000,
//     baoKaoID: 12613,
//     yongHuID: 1203805,
//     kaoShengID: 352524,
//     zhengJianLX: 4,
//     shenFenZH: 'DINGDING001',
//     xingMing: '冼美桃',
//     zhunKaoZH: 'yw0027',
//     xueXiaoID: 45600,
//     xueXiaoMC: '内部测试学院',
//     kaoShiID: 11843,
//     kaoShiMC: '2020年本科招生',
//     kaoDianID: 824,
//     kaoDianMC: '杭考',
//     zhuanYeID: 5329,
//     zhuanYeMC: '语文',
//     riChengID: 12370,
//     kaoShiRQ: 1596124800000,
//     kaoShiRQSM: '7月31日',
//     shenChaBTF: 2,
//     shengFenHao: '330000',
//     baoMingFei: 0,
//     needQuestion: false,
//     baoKaoBZ: 3,
//     queRenFS: 1,
//     queRenSJ: 1594349680000,
//     zhiYuanShu: 0,
//     xueXiaoMH: '45600',
//     logo: 'http://img.artstudent.cn/pr/2020-07-09/ea060e96160a49d69ecddfdb2f4f0d68.jpg',
//     shengFenMC: '浙江省',
//     xingBie: '男',
//     tongXinDZ: '8657AB3C0C632AEA',
//     tongXinYB: '325116',
//     shouJi: 'C957D47FCC666680E40AB7603D88A44E',
//     kaoShengHao: '20338383848848',
//     examAppIndex: '0',
//     mobileAuthFlag: 1,
//     wenLiKe: '不分文理',
//     videoCommitFlag: 0,
//     platform: 2,
//     canModifySign: false,
//     firstSiteProfNum: 1,
//     updateKaoShengHaoToNull: false,
//     needFillVol: false,
//     year: 2020,
//     videoUploadStatus: 2,
//     countdownLength: 99999,
//     stuExamTime: 283635,
//     videoUploadStartTime: 1594224000000,
//     videoUploadCountdown: 1703563829,
//     videoUploadEndTime: 1596211199000,
//     noCountdownControl: true,
//     otherPlatFlag: 1,
//     commit: false,
//     showModifyButton: false,
//     beforeClosingDate: false,
//     exitsModifyRecords: false,
//     delaySubmitFlag: false,
//     profExaminationFlag: false,
//     allowSimulation: false,
//     lifeCheckFlag: false,
//     stuMailFlag: true,
//     examType: 1,
//     timeStatus: 2,
//     examStartTime: 1593792000000,
//     examEndTime: 1596211199000,
//     needQuestionnaire: false,
//     mailConfirmFlag: false,
//     singList: false,
//     needRecordCultureScore: false,
//     needVolDir: false,
//     webConfirm: false,
//     allowModify: false,
//     modifyApplyEndDateStr: '',
//     zhengJianLXDesc: '护照',
//     statusDesc: '已交费',
//     canEdit: false,
//     canConfirm: true,
//     ymvol: false,
//     firstSiteDisabled: false,
//     print: false,
//     fatherSchedule: false,
//     canceling: false,
//     subSchedule: false,
//     noLimitVolNum: false,
//     kaoShiRQStr: '7月31日',
//     ios: false,
//     modAble: false,
//     againFillVol: false,
//     includeBasic: false,
//     canUploadRegister: false,
//     confirm: true,
//     canCancel: false,
//     auditFlagDesc: '',
//     complete: false,
//     createdOnStr: '2020-07-10 10:51:09',
//     modifiedOnStr: '2020-07-20 16:41:34'
// }

// let obj = {}
// let obj = {
//     /** createdOn */
//     this.createdOn = '';
// };
// console.log(Object.keys(h))
// let s = ``
// Object.keys(h).forEach((key) => {
//     s += `/** ${key} */ \n this.${key}=''; \n`
// })
// eval(s)
// console.log(s);

// const yssLogin = require('../prob/help/yssLogin');

// const add = require('./test2');
// const common = require('../lib/common');

// it('测试1', function () {
//     function add(x, y) {
//         console.log('add函数计算', x + y);
//         return x + y
//     };
//     const a = add(1, 2);
//     console.log('返回值', a);
// });

// it('测试2', function () {
//     console.log('打印返回值', add(1, 2));
// });

const res = common.getCurrentTimeAfter(0.5)
console.log(res);