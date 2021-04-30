const yssLogin = require('../../help/base/yssLogin');
const hulaquan = require('../../../reqApi/platfrom/hulaquan');
const prob = require('../../../reqApi/platfrom/prob');
const pool = require('../../../reqApi/platfrom/pool');
const mysql = require('mysql2');
const { object } = require('underscore');
const common = require('../../../lib/commonFc');

// 模型类型
const modelType = [
    '统考|梯度志愿|投档方式综合分|投档公式文化分+专业分|投档最低分100',
    '统考|平行志愿|录取方式综合分|录取公式文化分+专业分|录取最低分100',
]


/** 连接数据库 */
async function createPool () {
    const pool = mysql.createPool({
        user: 'root', // 演示环境：baomingtest
        password: 'testtest', // 演示环境：baomingtest
        host: '192.168.18.203',  // 演示环境：mysql.51bm.net.cn
        port: 3307,  // 演示环境：3306
        database: 'pool',
        // charset: 'utf8mb4',
    });
    return pool.promise();
};

/** 数据库查询 */
async function msyqlQuery (sqlData) {
    const pool = await createPool()
    // console.log('数据库测试', pool);
    // let sql = 'select * from ba_exam_examprofsubject where profId = (?) and esId = (?)';
    let sql = sqlData;
    const queryResult =
        await pool.query(sql)
            .then(([rows, fields]) => {
                // console.log('方法内打印', rows);
                return rows;
            })
            .catch(console.log)

    // console.log('查询结果', queryResult[0]);
    // 关闭数据库连接（必须要做）！
    pool.end()
    return queryResult;
}

/** 数据池院校数据模拟生成 */
function poolDataMock (model, params = {}) {

    const modelData = choiceModel(model);
    // 次要数据
    let minor = {
        lengthOfSchooling: 2, // 学制[1:三年，2:四年，3:五年]
        tuition: 9000.0,  // 学费
        planNum: 5, // 招生人数
        diploma: 1,
        ticket: PLAT_TICKET
    }

    // 关键信息
    let json = Object.assign({
        dataYear: '', // 年份
        schoolId: '', // 学校id（新增不需要）
        profId: '', // 专业id
        aos: 1, // 文理科[1:文,2:理,3:不分文理]
        schoolExamCategory: '', // 校考类别
    }, minor, modelData, params)


    return json;
}

/** 选择模型 */
function choiceModel (model) {
    if (model == '统考|梯度志愿|投档方式综合分|投档公式文化分+专业分|投档最低分100') {
        let json = {
            archiveRule: 1, // 投档规则
            archiveType: 1, // 投档方式
            archiveFormulaId: 8, // 投档公式
            archiveCultExpression: 'S-U', // 投档文化分计算公式
            archiveMinScore: 100, // 投档最低分
            provinceId: '', // 省份id
            jointCategoryId: '', // 统考类别id
            examType: 1, // 考试类型[1:统考,2:校考]
            batch: 1, // 批次id
            p0: 0.4725, // p0
            enrollOnOffYear: 2, // 录取大小年
            p5: 0.55, // p5
        };
        return json;
    }
}

describe('志愿数据批量生成', async function () {
    this.timeout(90000);
    let schoolList, profList, genData,
        // 在这维护公共参数
        publicParams = {
            dataYear: 2017, // 数据年份
            provinceId: 630000, // 省份
            jointCategoryId: 24, // 统考类别id
            aos: 1 // 文理科id
        };

    it('查询所有院校', async function () {
        schoolList = await msyqlQuery("select distinct schoolName,schoolId FROM pool_data_pool");
        // console.log(schoolList);
    });
    it('查询所有专业', async function () {
        profList = await msyqlQuery("SELECT profId,profName,diploma FROM pool_base_prof_info");
        // console.log(profList);
    });
    // 设定起始分和截止分
    for (let i = 100; i < 101; i++) {
        it(`数据池数据构造${i}`, async function () {
            await yssLogin.platfrom({
                userType: 'zyzg'
            })
            // 自定义参数
            const customizeData = {
                dataYear: publicParams.dataYear,
                archiveMinScore: i,
                schoolId: schoolList[i - 1].schoolId,
                provinceId: publicParams.provinceId, // 省份id
                jointCategoryId: publicParams.jointCategoryId, // 统考类别id
                aos: publicParams.aos,
                profId: Number(profList[common.getRandomNum(0, profList.length - 1)].profNo),
                diploma: Number(profList[common.getRandomNum(0, profList.length - 1)].diploma)
            }
            // 选择数据模型，生成参数
            genData = poolDataMock(modelType[0], customizeData);
            // console.log(`打印${i}`, genData);

            const res = await pool.savePool(genData);
            console.log(res);
        });
        it('数据同步', async function () {
            // 查询需要同步的数据
            const poolListData = await pool.getPoolList({
                dataYear: genData.dataYear,
                provinceId: genData.provinceId,
                aos: genData.aos,
                jointCategoryId: genData.jointCategoryId,
                schoolId: genData.schoolId,
                ticket: PLAT_TICKET
            });
            // console.log('poolListData', poolListData.result.datas.page.dataList[0]);
            // 同步数据池数据
            const preSyncData = await pool.syncData({
                dataId: poolListData.result.datas.page.dataList[0].dataId,
                businessType: 2,
                ticket: PLAT_TICKET
            })
            // console.log('preSyncData', preSyncData);
            // 查询列表获取同步id
            const syncData = await prob.syncRecordList({
                dataSyncStatus: 2,
                provinceID: publicParams.provinceId,
                initiator: PLAT_LOGINDATA.loginName,
                ticket: PLAT_TICKET
            })
            // console.log(syncData);
            // console.log(syncData.result.datas.page);
            // 同步数据到概率表
            const res = await prob.syncOneRecord({
                id: syncData.result.datas.page.dataList[0].id,
                ticket: PLAT_TICKET
            })
            console.log(res);
        });

    }

});