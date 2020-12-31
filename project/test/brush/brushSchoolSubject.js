const yysLogin = require('../../help/base/yssLogin');
const {
    common
} = require('../../../lib/index');
const base = require('../../../reqApi/platfrom/base');
const school = require('../../../reqApi/platfrom/school');
const collegeManage = require('../../help/applyComposite/collegeManage');




/**
 * @alias 网络考试院校端 
 */
describe.skip('网络考试院校端', async function () {
    this.timeout(TESTCASE.timeout);
    let college = collegeManage.setupCollege();
    describe('设置报名', async function () {
        describe('设置报名', async function () {
            before('院校管理员登录', async function () {
                // let admin = {loginName:`${addCollegeInfo.params.xueXiaoID}`,password:`Yss${addCollegeInfo.params.xueXiaoID}`}
                // 指定用户
                let admin = {
                    loginName: '45600',
                    password: 'Yss45600'
                }
                const res = await yysLogin.schoolAdmin(admin)
                console.log(res);
            });
            it.skip('添加院校考试专业', async function () {
                await college.autoAddExamProf()
            });
            it.skip('院校常用专业库新增', async function () {
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
            it.skip('查询院校常用专业库列表', async function () {
                const res = await base.getprofessionInfoList({
                    ticket: PLAT_TICKET
                });
                console.log('查询院校常用专业库列表', res.result.datas);
            });
            it.skip('新增院校常用考点库', async function () {
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
                    kaoDianDZ: '杭州市余杭区杭州亦闲信息科技有限公司', // 写死
                    longitude: 119.998863, // 写死
                    latitude: 30.284084, // 写死
                    ticket: PLAT_TICKET
                }
                const res = await school.saveSite(kdParam)
                console.log('新增院校常用考点库', res);
            });
            it.skip('查询院校常用考点库列表', async function () {
                const res = await school.getsiteInfoList({
                    ticket: PLAT_TICKET
                });
                console.log('查询院校常用考点库列表', res);
            });
            // 视情加考试
            it.skip('保存考试（招考层次）', async function () {
                const monthArr = ['1-2月', '3-4月', '5-6月', '7-8月', '9-10月', '11-12月']
                const params = {
                    kaoShiMC: `${new Date().getFullYear()}年本科招生`,
                    kaoShiYF: `${monthArr[common.getRandomNum(1, monthArr.length)]}`,
                    kaoShiND: new Date().getFullYear()
                };
                const res = await school.saveExam(Object.assign({
                    // kaoShiID: , //编辑要传
                    kaoShiMC: '2021年测试考试',
                    kaoShiND: 2021, //  考试年度
                    kaoShiYF: '1-2月', // 考试月份
                    xianKaoZYS: 0, // 限考志愿数
                    zhiYuanShu: 0, // 专业志愿限报数
                    kaiTongBZ: 1, // 1为开通
                    ticket: PLAT_TICKET
                }, params));
                console.log('保存考试', res);
            });
            it.skip('查询专业列表', async function () {
                profList = await base.getprofessionInfoList({
                    year: new Date().getFullYear(),
                    currentFlag: 1,
                    zhuanYeMC: '',
                    curPage: 1,
                    pageSize: 15,
                });
            });
            it.skip('查询考试列表', async function () {
                const res = await school.getExamList({
                    kaoShiND: new Date().getFullYear(),
                    sortList: [],
                    ticket: PLAT_TICKET
                });
                console.log('查询考试列表', res);
            });
            it.skip('保存考试专业', async function () {
                const res = await school.saveExamProfAdd({
                    // kaoShiID: 12926, // 编辑要传
                    profType: 1,
                    profTypeId: 0,
                    zhuanYeID: 1223425,
                    ticket: PLAT_TICKET
                });
                console.log('保存考试专业', res);
            });
            it.skip('考试专业列表', async function () {
                await school.getExamProfList({
                    kaoShiID: 12926,
                    // zhuanYeID: ,
                    ticket: PLAT_TICKET
                });
            });
            /**
             * 很重要（核心)
             */
            it('保存科目', async function () {
                let baseData;
                /**
                 * @param {Number} kaoShiMC 考试名称
                 * @param {Number} zhuanYeMC 专业名称
                 */
                let subJectInput = {
                    kaoShiMC: '2021年本科招生',
                    zhuanYeMC: '计算机',
                };
                if (Object.getOwnPropertyNames(subJectInput).length != 0) {
                    baseData = await college.searchByNameAll(subJectInput);
                    await college.saveSubject({
                        kaoShiID: baseData.kaoShiID,
                        profId: baseData.zhuanYeID,
                    })
                } else {
                    throw new Error('没有指定的考试和专业')
                }

            });
            it('编辑科目', async function () {
                await college.saveSubjectInfo({
                    esId: college.esId,
                    kaoShizyID: college.kaoShizyID,
                }, 3)
            });
        });
    });
});