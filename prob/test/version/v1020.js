const indexApp = require('../../../reqApi/app/index');
const infoApp = require('../../../reqApi/app/info');
const wishApp = require('../../../reqApi/app/wish');
const wish = require('../../../reqApi/platfrom/wish');
const yssLogin = require('../../help/yssLogin');
const probApp = require('../../../reqApi/app/prob');
const pay = require('../../../reqApi/app/pay');
const yxkApp = require('../../../reqApi/app/xyk');
const guideApp = require('../../../reqApi/app/guide');

describe('平台部', async function () {
    this.timeout(TESTCASE.timeout);
    before('用户登录', async function () {
        await yssLogin.clientLogin();
    });
    it('获取首页资讯分类列表', async function () {
        const qIndex = await indexApp.queryIndex({
            data: {
                m: "",
                p: {},
            }, ticket: TICKET
        })
        console.log(qIndex);
        console.log(qIndex.result.datas.obj);
    });
    it('根据省份查询资讯列表', async function () {
        const qInfo = await infoApp.queryInfoListByProvinceCode({
            data: {
                m: '',
                p: {
                    provinceCode: 230000
                }
            }
        })
        console.log(qInfo);
        console.log(qInfo.result.datas.page);
    });
    it('留学国家列表', async function () {
        const countryList = await wishApp.queryAbroadCountryList({
            data: {
                m: '',
                p: {}
            }, ticket: TICKET
        })
        console.log(countryList);
        console.log(countryList.result.datas.page.dataList);
    });
    it('留学国家详情', async function () {
        const countryDetail = await wishApp.getAbroadCountryDetail({
            data: {
                m: '',
                p: {
                    countryId: 2
                }
            }, ticket: TICKET
        })
        console.log(countryDetail);
        console.log(countryDetail.result.datas);
    });
    describe('后台-研究生留学', async function () {
        before('登录', async function () {
            await yssLogin.platfrom({
                userType: "lxyy"
            });
        });
        it('研究生国家列表', async function () {
            const res = await wish.loadAbroadCountryData({ ticket: PLAT_TICKET });
            console.log(res);
        });
    });
});

describe.skip('C部', async function () {
    this.timeout(TESTCASE.timeout);
    before('用户登录', async function () {
        await yssLogin.clientLogin({
            loginName: 'xyf201',
            password: 'Csk001'
        });
    });
    let giftData, consultData;
    describe('大礼包业务', async function () {
        it('志愿大礼包价格页', async function () {
            const res = await probApp.probGoodsPrice({
                data: {
                    m: '',
                    p: {
                        goodsID: 13,
                        dingDanLX: 27,
                    }
                }, ticket: TICKET
            })
            console.log('大礼包', res);
            console.log(res.result.datas.obj);
        });
        describe('大礼包订单流程', async function () {
            before('大礼包下单', async function () {
                giftData = await probApp.probGoodsPlaceOrder({
                    data: {
                        m: "",
                        p: {
                            goodsID: 13,
                        }
                    }, ticket: TICKET
                });
                console.log('大礼包下单', giftData);
                if (giftData.result.message == '已购买过，不允许重复购买！') {
                    throw new Error('已购买过，不允许重复购买')
                }
            });
            it('大礼包支付', async function () {
                const res = await pay.payOrder(giftData.result.datas.obj);
                console.log('支付1', res);
                if (res.result.message == '调用失败') {
                    throw new Error('已经支付同类型订单')
                }
            });
        });

        it('用户各服务购买状态以及到期时间', async function () {
            const res = await probApp.userBuyed({
                data: {
                    m: '',
                    p: {

                    }
                }, ticket: TICKET
            })
            console.log(res);
            console.log(res.result.datas.obj);
        });
    });
    describe('志愿咨询', async function () {
        it('志愿咨询价格页', async function () {
            const res = await probApp.probGoodsPrice({
                data: {
                    m: '',
                    p: {
                        goodsID: 6,
                        dingDanLX: 19,
                    }
                }, ticket: TICKET
            })
            console.log('志愿咨询', res);
            console.log(res.result.datas.obj);
        });
        describe('志愿咨询订单流程', async function () {
            before('志愿咨询下单', async function () {
                consultData = await probApp.probGoodsPlaceOrder({
                    data: {
                        m: "",
                        p: {
                            goodsID: 6,
                        }
                    }, ticket: TICKET
                });
                console.log('志愿咨询下单', consultData);
                if (consultData.result.message == '已购买过，不允许重复购买！') {
                    throw new Error('已购买过，不允许重复购买')
                }
            });
            it('咨询支付', async function () {
                const res = await pay.payOrder(consultData.result.datas.obj);
                console.log('支付2', res);
                if (res.result.message == '调用失败') {
                    throw new Error('已经支付同类型订单')
                }
            });
        });

        it('用户各服务购买状态以及到期时间', async function () {
            const res = await probApp.userBuyed({
                data: {
                    m: '',
                    p: {

                    }
                }, ticket: TICKET
            })
            console.log(res);
            console.log(res.result.datas.obj);
        });
    });
    describe.skip('概率视频', async function () {
        it('概率视频分类列表页', async function () {
            const res = await yxkApp.queryVideoCategoryList({
                data: {
                    m: '',
                    p: {}
                }
            })
            console.log(res);
            console.log(res.result.datas.list);
        });
        it('概率视频列表页', async function () {
            const res = await yxkApp.queryVideoList({
                data: {
                    m: '',
                    p: {
                        curPage: 2,
                        categoryIdList: [211],
                        orderByType: 15,
                        asc: true,
                    }
                }
            })
            console.log(res);
        });

    });

    describe.only('指南', async function () {
        it('保存指南用户（旧）', async function () {
            const res = await guideApp.saveGuideUser({
                data: {
                    m: "",
                    p: {
                        provinceName: "青海",
                        provinceID: 110000,
                        jointProfTypeID: 10,
                        jointProfTypeName: "播音与主持类",
                        artsOrSciences: 1
                    }
                }, ticket: TICKET
            })
            console.log(res);
        });
        it('保存指南用户（新）', async function () {
            const res = await guideApp.saveGuideUserNew({
                data: {
                    m: '',
                    p: {
                        provinceID: 110000,
                        provinceName: "北京市",
                        artsOrSciences: 1,
                        examStuType: 1,
                    }
                }, ticket: TICKET
            });
            console.log(res);
        });
        it('校考院校列表', async function () {
            const res = await guideApp.querySchoolExamList({
                data: {
                    m: '',
                    p: {
                        curPage: 1,
                        provinceId: 520000,
                        artsOrSciences: 1,
                        examStuType: 1,
                        examType: 1
                    }
                }, ticket: TICKET
            })
            console.log(res);
            console.log(res.result.datas.page);
        });
    });

});