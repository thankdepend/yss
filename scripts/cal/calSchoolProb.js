const calSchoolProbManage = require('../calSchoolProbManage');
const {
    common
} = require('../../lib/index');
const probApp = require('../../reqApi/app/prob');
const prob = require('../../reqApi/platfrom/prob');
const yssLogin = require('../../project/help/base/yssLogin');


describe('计算录取概率', async function () {
    const cal = calSchoolProbManage.setupCalProb()
    it('获取用户信息', async function () {
        /** 填写用户信息在这 ↓ */
        const userInfo = await calSchoolProbManage.userLogin();
        // console.log('userInfo', userInfo);
        await cal.updateUserInfo(userInfo);
    });
    it('获取志愿院校信息', async function () {
        /** 填写院校数据id在这 ↓ */
        const probInfo = await calSchoolProbManage.getProbInfo();
        // console.log('probInfo', probInfo);
        await cal.updateProbInfo(probInfo)
    });

    it('更新省分数信息', async function () {
        const provinceInfo = await calSchoolProbManage.getProvinceScoreLine(cal.stuInfoMain.provinceID);
        // console.log('省份分数信息', provinceInfo);
        await cal.updateScoreLine(provinceInfo);
    });
    it('更新省批次线信息', async function () {
        let batchLineParam = {
            dataYear: cal.scoreLineMain.dataYear,
            provinceID: cal.scoreLineMain.provinceId,
            jointProfTypeID: cal.scoreLineMain.jointProfTypeID,
        }
        const batchLineInfo = await calSchoolProbManage.getProvinceBatchLine(batchLineParam);
        await cal.updateBatchLine(batchLineInfo);
    });
    it('计算统考概率', async function () {
        console.log(cal);
        const res = await cal.schoolCalculate();
        console.log(`${cal.schoolExamMain.schoolName}(${cal.schoolExamMain.profName})专业概率为:`, res);
    });
});