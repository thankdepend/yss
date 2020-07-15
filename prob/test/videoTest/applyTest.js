const yysLogin = require('../../help/yssLogin');
const wishFill = require('../../../reqApi/wishFill');
const common = require('../../../lib/common');
const basicData = require('../../../data/basicData');
const check = require('../../../lib/assert');
const calculate = require('../../../lib/calculate');
const platfromProb = require('../../../reqApi/platfrom/prob');
const base = require('../../../reqApi/platfrom/base');
const doc = require('../../data/doc.json');
const school = require('../../../reqApi/platfrom/school');

describe('视频考试', async function () {
    this.timeout(TESTCASE.timeout);
    before('平台登录-志愿主管', async function () {
        platFromInfo = await yysLogin.platfrom({loginName:'mh01',password:'Csk001'});
        console.log('平台登录',platFromInfo);
    });
    describe('报名', async function () {
        let AddCollegeInfo;
        // before('新增报名院校', async function () {
        //     const randomStr = common.getRandomStr(6), randomNum = common.getRandomNum(12000,99999),randomImage = doc.test.school[common.getRandomNum(0,doc.test.school.length)];
        //     let addParams = {
        //         preSchoolType: 1,
        //         xueXiaoMH: randomNum, // 代号
        //         xueXiaoID: randomNum,
        //         xueXiaoMC: `中国美术学院-${randomStr}`,
        //         schoolType: 1, // 是否签约：1为签约，2为未签约
        //         hotFlag: 2, // 热门标签: 1为
        //         typeIds: 26,
        //         provChName: '浙江省',
        //         prov: 330000,
        //         cityChName: '杭州市',
        //         city: 330100,
        //         areaChName: '下城区',
        //         area: 330103,
        //         classId: 5,
        //         studentType: '1,2,3,4,5', // 学生类型
        //         initUser: 'on', // 初始化用户，on为是
        //         // addr: ,
        //         // applyUrl: ,
        //         logo: `${randomImage}`,
        //         // subSystem: ,
        //         // sub: ,
        //         // orderNo: ,
        //         // mobileOrderNo: ,
        //         // siteConfirmType: ,
        //         ticket: PLAT_TICKET
        //     }
        //     AddCollegeInfo = await base.toAddCollege(addParams)
        //     console.log('保存信息',AddCollegeInfo);
        // });
    });
    
});
