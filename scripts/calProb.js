const calProbManage = require('./calProbManage');
const {
    common
} = require('../lib/index');
const probApp = require('../reqApi/app/prob');
const prob = require('../reqApi/platfrom/prob');
const yssLogin = require('../prob/help/yssLogin');


describe('计算录取概率', async function () {
    const cal = calProbManage.setupCalProb()
    it('获取用户信息', async function () {
        const userInfo = await calProbManage.userLogin();
        await cal.updateUserInfo(userInfo);
        // console.log(cal);
    });
    it('获取院校院校信息', async function () {
        const probInfo = await calProbManage.getProbInfo();
        await cal.updateProbInfo(probInfo)
        // console.log(cal);
    });
    it('计算统考概率', async function () {
        let res = await cal.jointCalculate();
        console.log(`${cal.volDataMain.schoolName}概率：`, res);
    });
});