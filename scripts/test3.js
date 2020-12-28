const { random } = require('lodash');
const { common } = require('../lib/index')
let a = '2021-01-03'
const list = a.split('-')
// console.log(list[0].slice(2, 4));
const province = common.getRandomProvince();
console.log(`${common.add(common.getCurrentDate().split('-').join(',').slice(2, 4), 1)}${province.provinceSxCode}${common.getRandomNum(1000000000, 9999999999)}`);
// console.log(province.provinceSxCode);
// province.provinceSxCode, common.getRandomNum(10)
console.log(`${common.getRandomNum(1, 2) == 1 ? '团员' : '党员'}`);
let randomHs = common.getRandomNum(1, 5);
const obj = {
    xueLi: '高中',
    stuType: 3, // 初中2，高中3
    "gaoKaoSFH": province.provinceCode,
    "gaoKaoSF": province.provinceName,
    "zhengZhiMM": `${common.getRandomNum(1, 2) == 1 ? '团员' : '党员'}`,
    "suoZaiXX": `${province.provinceName.slice(0, 2)}一中`, // 文化课学校
    "suoZaiHS": `${randomHs == 1 ? '老鹰' : randomHs == 2 ? '将军' : randomHs == 3 ? '大象' : randomHs == 4 ? '白塔岭' : '厚一'}画室`, // 培训学校
    "kaoShengHao": `${common.add(common.getCurrentDate().split('-').join(',').slice(2, 4), 1)}${province.provinceSxCode}${common.getRandomNum(1000000000, 9999999999)}`,
}
console.log(obj);

const sss = common.getProvinceWenliKe('上海市')
console.log(sss);