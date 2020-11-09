/**
 * @alias 院校信息
 */
let params = {
    // parallel: true, // 是否是平行志愿
    archiveRule: 1, // 投档规则,1为平行，2为梯度
    // gradient: true, // 是否是梯度志愿
    archiveMode: 1, // 投档公式 3为专业分
    // unifiedExam : false, // 投档公式是否是“统考专业分”
    // castRank: false, // 投档位次是否存在
    // archiveRank: 100, // 投档位次
    isRank: true, // 录取综合分公式是否按排名录取
    archiveRule: 1, // 投档规则，平行或非平行
    archiveMode: 1, // 投档方式，只取前4种其他的相对较少，[1:综合分,2:文化分,3:专业分,4:专业分排名]
    archiveExpression: 'R*0.4+U*2.5*0.6', // 投档公式
}

/**
 * @alias 考生信息
 */
let value = {
    jointRank: 1, // 统考位次
    comprehensiveRank: 1, // 综合分位次
    rank: 200, // 考生位次/考生专业分位次/综合分位次
    castRank: 2020, // 投档位次/预计投档位次/录取最低位次
    predictEnrollRank: 101, // 预计录取位次
    jointExamScore: 231, // 考生统考分(专业)
    collEntrExamScore: 200, // 考生文化分
    castMinScore: 340, // 投档最低分/录取最低分/预计录取最低分/预计投档最低分
}

async function getUserInfo() {
    await yssLogin.clientLogin({
        loginName: '330340',
        password: 'Csk001'
    })
    const res = await probApp.getUser({
        ticket: TICKET
    });
    // console.log(res);
    return res.result.datas.obj;
}

async function getSchoolInfo() {
    // 平台登录
    const login = await yssLogin.platfrom({
        userType: 'zyzg'
    });
    console.log('登录', login);
    const res = await prob.getJointScoreList({
        id: 218296, // 院校专业数据id
        ticket: PLAT_TICKET
    })
    const jointInfo = res.result.datas.page
    console.log(jointInfo);
    Object.assign(params, jointInfo)
}

describe('获取信息', async function () {
    it('获取用户信息', async function () {
        const userInfo = await getUserInfo().then()
        console.log('实际响应', userInfo);
        value.jointExamScore = userInfo.jointExamScore
        value.rank = userInfo.jointRank
    });
    it('获取院校院校信息', async function () {
        await getSchoolInfo().then();
    });
    it('计算', async function () {
        const cal = calculate(params, value);
        console.log('概率：', cal);
    });
});


// 计算概率
function calculate(params, value) {
    // 如果是平行
    if (params.archiveRule == 1) {
        // 如果投档公式是“统考专业分”
        if (params.archiveMode == 3) {
            console.log('投档公式是“统考专业分”');
            if (p.archiveRank != undefined && p.archiveRank != null && value.rank) {
                // 公式2
                let cal = Number((0.4725 - Math.atan((value.rank - value.castRank) / value.castRank) * 5.1) * 100).toFixed(2) + '%';
                console.log("考生位次和投档位次同时存在");
                return cal;
            } else {
                // 公式1
                let cal = Number((0.4725 + Math.atan((value.jointExamScore - value.castMinScore) / value.castMinScore) * 5.1) * 100).toFixed(2) + '%';
                console.log("考生位次和投档位次不同时存在");
                return cal;
            }
        } else {
            // 如果投档位次存在
            if (params.castRank) {
                // 公式2
                let cal = Number((0.4725 - Math.atan((value.rank - value.castRank) / value.castRank) * 5.1) * 100).toFixed(2) + '%';
                console.log("投档位次存在");
                return cal;
            } else {
                if (value.jointExamScore - value.castMinScore < 0) {
                    return '没过线0%'
                } else if (params.archiveMode) {
                    switch (params.archiveMode) {
                        case 1:
                            // 公式1(按综合分计算)
                            value.jointExamScore
                            let cal = Number((0.4725 + Math.atan((value.jointExamScore - value.castMinScore) / value.castMinScore) * 5.1) * 100).toFixed(2) + '%';
                            console.log('投档位次不存在');
                            return cal;
                            break;
                        case 2:
                            // 公式1(按文化分计算)
                            // [1:综合分,2:文化分,3:专业分,4:专业分排名]
                            break;
                        case 3:

                        case 4:

                        default:
                            break;
                    }
                } else {
                    // 公式1
                    let cal = Number((0.4725 + Math.atan((value.jointExamScore - value.castMinScore) / value.castMinScore) * 5.1) * 100).toFixed(2) + '%';
                    console.log('投档位次不存在');
                    return cal;
                }

            }
        }
    } else {
        if (params.isRank) {
            // 如果是按排名录取
            // 公式2
            let cal = Number((0.4725 - Math.atan((value.rank - value.castRank) / value.castRank) * 5.1) * 100).toFixed(2) + '%';
            return cal;
        } else {
            // 公式1
            let cal = Number((0.4725 + Math.atan((value.jointExamScore - value.castMinScore) / value.castMinScore) * 5.1) * 100).toFixed(2) + '%';
            return cal;
        }
    }
}

// const cal = calculate(params,value);
// console.log('概率：',cal);