const factionBase = require('./factionalismManage');
const hulaquanApp = require('../../../reqApi/app/hulaquan');
const {
    common
} = require('../../../lib/index');
const {
    assert,
    expect
} = require('chai');

/**
 * 帖子
 */
class WaterFull extends factionBase {
    constructor() {
        super();
    }

    /** 帖子详情 */
    async waterFullDetail(params) {
        const a = await this.getGroupList();
        const res = await hulaquanApp.getGroupDetail({
            data: {
                m: '',
                p: {
                    groupID: this.groupID
                }
            }
        });
        return res;
    }

    /** 帖子详情断言 */
    async waterFullDetailAssert(params) {
        const res = await this.waterFullDetail();
        console.log('打印详情', res);
    }

}

const waterFullManage = module.exports = {};

waterFullManage.setupWaterFull = function () {
    return new WaterFull();
}
// Object.setPrototypeOf(Child.prototype, factionBase);