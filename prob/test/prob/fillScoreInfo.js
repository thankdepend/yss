const yssLogin = require('../../help/yssLogin');
const wishFill = require('../../../reqApi/app/wishFill');
const wish = require('../../../reqApi/app/wish');
const prob = require('../../../reqApi/app/prob');
const provinceScoreLine = require('../../../reqApi/app/provinceScoreLine');
const basicData = require('../../../data/basicData');
const {
    common
} = require('../../../lib/index');
const platfromProb = require('../../../reqApi/platfrom/prob');

describe('完善信息', function () {
    this.timeout(TESTCASE.timeout);
    // 修改次数
    const num = 1000;
    let loginInfo, ModifyNum, loginAccount, time = Date.now();
    before('登录', async function () {
        // 需要登录的用户，默认有用户，可以不传
        loginAccount = {
            loginName: 'dingding001',
            password: 'Ysk001',
            device: 'm'
        }
        loginInfo = await yssLogin.clientLogin(loginAccount).then(res => res.result.datas.user);

        // 获取修改次数
        const gteUserInfo = await prob.getUser({
            data: {
                "p": {},
                "m": ""
            },
            ts: time,
            ticket: TICKET
        }).then(res => res.result.datas.obj);
        ModifyNum = {
            canModifyJointScoreNum: gteUserInfo.canModifyJointScoreNum,
            canModifyCollEntrNum: gteUserInfo.canModifyCollEntrNum,
            probabilityCanModProvNum: gteUserInfo.probabilityCanModProvNum,
            englishModifyNum: gteUserInfo.englishModifyNum,
            englishLeftNum: gteUserInfo.englishLeftNum,
            chineseModifyNum: gteUserInfo.chineseModifyNum,
            chineseLeftNum: gteUserInfo.chineseLeftNum,
        }
    });
    describe('设置修改次数', async function () {
        let probUserNumDetail;
        before('平台登录', async function () {
            platFromInfo = await yssLogin.platfrom({
                loginName: 'cbyy',
                password: 'Ysk002'
            });
            console.log('平台登录', platFromInfo);
        });
        it('查看概率用户', async function () {
            probUserNumDetail = await platfromProb.getProbUser({
                userName: loginAccount.loginName,
                ticket: PLAT_TICKET
            }).then(res => res.result.datas.page.dataList[0])
            // console.log('概率用户',probUserNumDetail);
        });
        it('修改用户次数', async function () {
            const res = await platfromProb.saveModifyNumEdit({
                userID: probUserNumDetail.userID,
                userName: probUserNumDetail.userName,
                provinceName: probUserNumDetail.provinceName,
                jointProfTypeName: probUserNumDetail.jointProfTypeName,
                artsOrSciencesStr: probUserNumDetail.artsOrSciencesStr,
                collEntrExamScore: probUserNumDetail.collEntrExamScore,
                jointExamScore: probUserNumDetail.jointExamScore,
                probabilityModProvNum: probUserNumDetail.probabilityModProvNum,
                modifyNum: probUserNumDetail.modifyNum,
                modifyJointScoreNum: probUserNumDetail.modifyJointScoreNum,
                englishModifyNum: probUserNumDetail.englishModifyNum,
                chineseModifyNum: probUserNumDetail.chineseModifyNum,
                probabilityCanModProvNum: num,
                canModifyCollEntrNum: num,
                canModifyJointScoreNum: num,
                chineseLeftNum: num,
                englishLeftNum: num,
                remark: null,
                ticket: PLAT_TICKET
            })
        });
    })
    it('保存用户-新接口', async function () {
        const scoreLineInfo = await provinceScoreLine.getAosAndProfTypeList({
            data: {
                p: {
                    provinceId: basicData.province['湖北'],
                },
                m: ''
            },
            ticket: TICKET,
            ts: time
        }).then(res => res.result.datas.list[0].jointCategoryList[0]);
        console.log('详细', scoreLineInfo)
        // 定制参数
        let params = {}
        let saveReq = Object.assign({
            data: {
                p: {
                    "profTypeStatus": scoreLineInfo.profTypeStatus,
                    "jointExamScore": common.getRandomNum(1, scoreLineInfo.q), // 统考分数
                    "englishScore": common.getRandomNum(1, scoreLineInfo.englishFullScore),
                    "jointProfTypeName": scoreLineInfo.jointCategoryName, // 统考类别
                    "userTryUse": false,
                    "artsOrSciences": scoreLineInfo.aos, // 文理科类型
                    "collEntrExamScore": common.getRandomNum(1, scoreLineInfo.w), // 文化分数
                    "chineseScore": common.getRandomNum(1, scoreLineInfo.chineseFullScore), // 语文成绩
                    "provinceName": scoreLineInfo.provinceName, // 省份名称
                    "reduceNumAvailable": true,
                    "provinceID": scoreLineInfo.provinceId, // 省份id
                    "jointProfTypeID": scoreLineInfo.jointCategoryId
                },
                m: ""
            },
            ts: time,
            ticket: TICKET
        }, params)
        const res = await prob.saveUser(saveReq)
        // console.log(params.data);
        const savePamas = res.params.data.p;
        // console.log('保存响应',res.params.data.p);
        const probUserInfo = await prob.getUser({
            data: {
                "p": {},
                "m": ""
            },
            ts: time,
            ticket: TICKET
        }).then(res => res.result.datas.obj);
        // console.log('概率用户信息- 实际值',probUserInfo);
        userInfoExp = {
            userID: loginInfo.userId,
            profTypeStatus: savePamas.profTypeStatus,
            jointExamScore: savePamas.jointExamScore,
            collEntrExamScore: savePamas.collEntrExamScore,
            canModifyJointScoreNum: common.sub(ModifyNum.canModifyJointScoreNum, 1),
            canModifyCollEntrNum: common.sub(ModifyNum.canModifyCollEntrNum, 1),
            probabilityCanModProvNum: common.sub(ModifyNum.probabilityCanModProvNum, 1),
            englishModifyNum: common.sub(ModifyNum.englishModifyNum, 1),
            englishLeftNum: common.sub(ModifyNum.englishLeftNum, 1),
            chineseModifyNum: common.sub(ModifyNum.chineseModifyNum, 1),
            chineseLeftNum: common.sub(ModifyNum.chineseLeftNum, 1),
            provinceID: savePamas.provinceID,
            provinceName: savePamas.provinceName,
            artsOrSciences: savePamas.artsOrSciences,
            jointProfTypeID: savePamas.jointProfTypeID,
            jointProfTypeName: savePamas.jointProfTypeName,
            englishScore: savePamas.englishScore,
            chineseScore: savePamas.chineseScore,
            artsOrSciencesStr: scoreLineInfo.aos == savePamas.artsOrSciences ? scoreLineInfo.aosName : '文科',
            profTypeStatusStr: scoreLineInfo.profTypeStatus == savePamas.profTypeStatus ? scoreLineInfo.profTypeStatusName : '统考和校考',
            simpleProvinceName: savePamas.provinceName
        }
        console.log('期望值', userInfoExp);
        // 断言
        common.isApproximatelyEqual(userInfoExp, probUserInfo)
    });
})