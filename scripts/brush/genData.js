const yssLogin = require('../../project/help/base/yssLogin');
const hulaquan = require('../../reqApi/platfrom/hulaquan');
const prob = require('../../reqApi/platfrom/prob');
const pool = require('../../reqApi/platfrom/pool');
const mysql = require('mysql2');
const { object } = require('underscore');
const common = require('../../lib/commonFc');
const argv = require('yargs').argv;

// 模型类型
const modelType = [
    '统考|平行志愿|投档方式综合分|投档公式文化分+专业分|投档最低分100',
    '统考|梯度志愿|录取方式综合分|录取公式文化分+专业分|录取最低分100',
]


/** 连接数据库 */
async function createPool () {
    let pool;
    if (argv.env == 'test') {
        pool = mysql.createPool({
            user: 'root', // 演示环境：baomingtest
            password: 'testtest', // 演示环境：baomingtest
            host: '192.168.18.203',  // 演示环境：mysql.51bm.net.cn
            port: 3307,  // 演示环境：3306
            database: 'pool',
            // charset: 'utf8mb4',
        });
    } else if (argv.env == 'pre') {
        pool = mysql.createPool({
            user: 'baomingtest', // 演示环境：baomingtest
            password: 'baomingtest', // 演示环境：baomingtest
            host: 'mysql.51bm.net.cn',  // 演示环境：mysql.51bm.net.cn
            port: 3306,  // 演示环境：3306
            database: 'pool',
            // charset: 'utf8mb4',
        });
    }
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
        lengthOfSchooling: common.getRandomNum(1, 3), // 学制[1:三年，2:四年，3:五年]
        tuition: common.getRandomNum(5000, 40000),  // 学费
        planNum: common.getRandomNum(5, 50), // 招生人数
        diploma: 1,  // 学历：本科
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
    if (model == '统考|平行志愿|投档方式综合分|投档公式文化分+专业分|投档最低分100') {
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
    else if (model == '统考|梯度志愿|录取方式综合分|录取公式文化分+专业分|录取最低分100') {
        let json = {
            archiveRule: 2, // 投档规则:梯度志愿
            enrollType: 1, // 录取方式：综合分
            enrollFormulaId: 29, // 录取公式：写死
            culturalExpression: '(S-(U/Q)*0.6*750)/750/0.4*W', // 综合分文化计算公式
            enrollScoreMin: 100, // 录取最低分
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

    /**
     * 设定起始分和截止分
     * i为录取最低分
     */
    for (let i = 100; i < 101; i++) {
        it(`数据池数据构造${i}`, async function () {
            await yssLogin.platfrom({
                userType: 'zyzg'
            })
            console.log(profList);
            // 自定义参数
            const customizeData = {
                dataYear: publicParams.dataYear,
                archiveMinScore: i,
                schoolId: schoolList[i - 1].schoolId,
                provinceId: publicParams.provinceId, // 省份id
                jointCategoryId: publicParams.jointCategoryId, // 统考类别id
                aos: publicParams.aos,
                profId: Number(profList[common.getRandomNum(0, profList.length - 1)].profId),
                diploma: Number(profList[common.getRandomNum(0, profList.length - 1)].diploma)
            }
            // 选择数据模型，生成参数
            genData = poolDataMock(modelType[1], customizeData);
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