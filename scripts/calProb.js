const calProbManage = require('./calProbManage');
const {
    common
} = require('../lib/index');
const probApp = require('../reqApi/app/prob');
const prob = require('../reqApi/platfrom/prob');
const yssLogin = require('./../project/help/base/yssLogin');


describe('计算录取概率', async function () {
    const cal = calProbManage.setupCalProb()
    it('获取用户信息', async function () {
        /** 填写用户信息在这 ↓ */
        const userInfo = await calProbManage.userLogin();
        await cal.updateUserInfo(userInfo);
    });
    it('获取志愿院校信息', async function () {
        /** 填写院校数据id在这 ↓ */
        const probInfo = await calProbManage.getProbInfo();
        // console.log('probInfo', probInfo);
        await cal.updateProbInfo(probInfo)
    });
    it('更新省批次信息', async function () {
        let batchLineParam = {
            dataYear: cal.volDataMain.dataYear,
            provinceID: cal.stuInfoMain.provinceID,
            jointProfTypeID: cal.stuInfoMain.jointProfTypeID,
        }
        const batchLineInfo = await calProbManage.getProvinceBatchLine(batchLineParam);
        await cal.updateBatchLine(batchLineInfo);
    });
    it('更新省分数信息', async function () {
        const provinceInfo = await calProbManage.getProvinceScoreLine(cal.stuInfoMain.provinceID);
        // console.log('省份分数信息', provinceInfo);
        await cal.updateScoreLine(provinceInfo);
    });
    it('计算统考概率', async function () {
        const res = await cal.jointCalculate();
        console.log(`${cal.volDataMain.schoolName}(${cal.volDataMain.profName})专业概率为:`, res);
    });
});