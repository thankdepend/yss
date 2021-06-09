const pubilc = require('../../../reqApi/platfrom/public');
const caps = require('../../../data/caps');
const {
    common
} = require('../../../lib/index');

class Pubilc {
    constructor() {
        this.paramKey = {
            EVALUATION_TEACHER_DEFAULT_PRICE: '0.01'
        };
    }

    /** 保存评画价格 */
    async saveEvalPrice (params) {
        await pubilc.saveParam({
            paramKey: 'EVALUATION_TEACHER_DEFAULT_PRICE',
            paramName: '评画默认价格',
            paramType: 1,
            paramValue: this.paramKey.EVALUATION_TEACHER_DEFAULT_PRICE,
            paramValueTemp: this.paramKey.EVALUATION_TEACHER_DEFAULT_PRICE,
            paramValueTemp: this.paramKey.EVALUATION_TEACHER_DEFAULT_PRICE,
            remark: '只能设置为金额',
            status: 1,
            ticket: PLAT_TICKET
        })
    }

}


const pubilcManage = module.exports = {};

pubilcManage.setupPubilc = async function () {
    return new Pubilc();
}