const yysLogin = require('../../help/yssLogin');
const wishFill = require('../../../reqApi/app/wishFill');
const {
    common
} = require('../../../lib/index');
const basicData = require('../../../data/basicData');
const calculate = require('../../../lib/calculate');
const platfromProb = require('../../../reqApi/platfrom/prob');
const base = require('../../../reqApi/platfrom/base');
const doc = require('../../data/doc.json');
const school = require('../../../reqApi/platfrom/school');


// 网络考试院校端
describe.skip('视频考试', async function () {
    this.timeout(TESTCASE.timeout);
    
    before('平台登录-志愿主管', async function () {
        platFromInfo = await yysLogin.platfrom({
            loginName: 'mh01',
            password: 'Csk001'
        });
        console.log('平台登录', platFromInfo);
    });
    describe('报名', async function () {
        let addCollegeInfo;
        // 不要刷学校！不要刷学校！不要刷学校！
        before.skip('新增报名院校', async function () {
            const randomStr = common.getRandomStr(6),
                randomNum = common.getRandomNum(12000, 99999),
                randomImage = doc.test.school[common.getRandomNum(0, doc.test.school.length)];
            let addParams = {
                preSchoolType: 1,
                xueXiaoMH: randomNum, // 代号
                xueXiaoID: randomNum,
                xueXiaoMC: `中国美术学院-${randomStr}`,
                schoolType: 1, // 是否签约：1为签约，2为未签约
                hotFlag: 2, // 热门标签: 1为
                typeIds: 26,
                provChName: '浙江省',
                prov: 330000,
                cityChName: '杭州市',
                city: 330100,
                areaChName: '下城区',
                area: 330103,
                classId: 5,
                studentType: '1,2,3,4,5', // 学生类型
                initUser: 'on', // 初始化用户，on为是
                // addr: ,
                // applyUrl: ,
                logo: `${randomImage}`,
                // subSystem: ,
                // sub: ,
                // orderNo: ,
                // mobileOrderNo: ,
                // siteConfirmType: ,
                ticket: PLAT_TICKET
            }
            addCollegeInfo = await base.toAddCollege(addParams)
            console.log('保存信息', addCollegeInfo);
        });
        describe('设置报名', async function () {
            before('院校管理员登录', async function () {
                // let admin = {loginName:`${addCollegeInfo.params.xueXiaoID}`,password:`Yss${addCollegeInfo.params.xueXiaoID}`}
                // 指定用户
                let admin = {
                    loginName: '11122',
                    password: 'Yss11122'
                }
                const res = await yysLogin.schoolAdmin(admin)
                console.log(res);
            });
            it('院校常用专业库新增', async function () {
                // 取到总条数
                const pageRes = await base.getprofessionInfoList({
                    currentFlag: 1,
                    ticket: PLAT_TICKET
                }).then(res => res.result.datas);
                
                const professionRes = await base.getprofessionInfoList({
                    currentFlag: 1,
                    pageSize: pageRes.page.totalSize,
                    ticket: PLAT_TICKET
                }).then(res => res.result.datas.professionList);
                // console.log('列表',professionRes);

                let bhArr = [],
                    max;
                professionRes.forEach(obj => bhArr.push(parseInt(obj.zhuanYeBH)));


                // 取列表最大值
                if (bhArr.length >= 1) {
                    max = bhArr.reduce(function (a, b) {
                        return b > a ? b : a;
                    });
                } else {
                    max = 0
                }
                // 如果列表没数据就新增
                if (pageRes.page.totalSize < 1) {
                    let profession = {
                        prof: [{
                            zhuanYeBH: common.add(max, 1),
                            cengJiMC: `考试专业${common.getRandomStr(5)}`,
                            zhuanYeCJ: '1',
                            fuZhuanYe: 0,
                            // zhuanYeID: 1223423,
                            zhuanYeMC: `专业之名${common.getRandomStr(5)}`,
                        }],
                        ticket: PLAT_TICKET
                    }
                    const res = await base.saveBacthProfession(profession)
                    console.log('院校常用专业库新增', res);
                }
                
            });
            it('查询院校常用专业库列表', async function () {
                const res = await base.getprofessionInfoList({
                    ticket: PLAT_TICKET
                });
                console.log('查询院校常用专业库列表',res.result.datas);
            });
            it('新增院校常用考点库', async function () {
                // // 查询考点列表
                // const siteInfo = await school.getsiteInfoList({ticket: PLAT_TICKET});
                // console.log('查询院校常用考点库列表',siteInfo);
                const kdParam = {
                    kaoDianJC: `kd${common.getRandomStr(6)}`,
                    kaoDianQC: `考点${common.getRandomStr(6)}`,
                    kaoDianSZSFMC: '浙江省', // 写死
                    kaoDianSZSF: 330000, // 写死
                    kaoDianSZSMC: '杭州市', // 写死
                    kaoDianSZS: 330100, // 写死
                    kaoDianSZQMC: '余杭区', // 写死
                    kaoDianSZQ: 330110, // 写死
                    checkType: 1,
                    kaoDianDZ: '杭州市余杭区西溪堂-8号楼', // 写死
                    longitude: 119.998863, // 写死
                    latitude: 30.284084, // 写死
                    ticket: PLAT_TICKET
                }
                const res = await school.saveSite(kdParam)
                console.log('新增院校常用考点库', res);
            });
            it('查询院校常用考点库列表', async function () {
                const res = await school.getsiteInfoList({
                    ticket: PLAT_TICKET
                });
                console.log('查询院校常用考点库列表', res);
            });
            // 视情加考试
            it.skip('保存考试', async function () {
                const monthArr = ['1-2月', '3-4月', '5-6月', '7-8月', '9-10月', '11-12月']
                const params = {
                    kaoShiMC: `${new Date().getFullYear()}年本科招生`,
                    kaoShiYF: `${monthArr[common.getRandomNum(1,monthArr.length)]}`,
                    kaoShiND: new Date().getFullYear()
                };
                const res = await school.saveExam(Object.assign({
                    // kaoShiID: , //编辑要传
                    kaoShiMC: '2020年本科招生',
                    kaoShiND: 2020, //  考试年度
                    kaoShiYF: '1-2月', // 考试月份
                    xianKaoZYS: 0,
                    zhiYuanShu: 0,
                    kaiTongBZ: 1, // 1为开通
                    ticket: PLAT_TICKET
                }, params));
                console.log('保存考试', res);
            });
            it('查询考试列表', async function () {
                const res = await school.getExamList({
                    kaoShiND: new Date().getFullYear(),
                    sortList: [],
                    ticket: PLAT_TICKET
                });
                console.log('查询考试列表', res);
            });
            it('保存考试专业', async function () {
                const res = await school.saveExamProfAdd({
                    // kaoShiID: 12926, // 编辑要传
                    profType: 1,
                    profTypeId: 0,
                    zhuanYeID: 1223425,
                    ticket: PLAT_TICKET
                });
                console.log('保存考试专业', res);
            });
            it('考试专业列表', async function () {
                await school.getExamProfList({
                    kaoShiID: 12926,
                    // zhuanYeID: ,
                    ticket: PLAT_TICKET
                });
            });
        });
    });

});