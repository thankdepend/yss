const { common } = require('../../lib/index');
const fs = require('fs');

class LogAnalysis {
    constructor() {

    }

    start () {
        /** 数据个数 */
        this.num = 0;
        /** 失败个数 */
        this.fail = 0;
        /** 最小持续时间 */
        this.min = 99999;
        /** 最大持续时间 */
        this.max = 0;
        /** 平均持续时间 */
        this.avg = 0;
        /** 总持续时间 */
        this.total = 0;
        return this;
    }

    add (res) {
        // console.log(`res=${JSON.stringify(res)}`);

        this.num++;
        const { result, duration } = res;
        if (result.code != 0) {
            this.fail++;
            return this;
        }
        this.min = Math.min(duration, this.min);
        this.max = Math.max(duration, this.max);
        this.total += duration;
        return this;
    }

    add2 (res) {
        this.num++;
        const { duration } = res;
        // console.log(`addDuration=${JSON.stringify(duration)}`);

        this.min = Math.min(duration, this.min);
        this.max = Math.max(duration, this.max);
        this.total += duration;

        return this;
    }

    /**
     * 图片下载
     * @param {object} res
     */
    add3 (res) {
        // console.log(`res=${JSON.stringify(res)}`);

        this.num++;
        const { result, duration } = res;
        if (result.header[`content-length`] < 1) {
            this.fail++;
            return this;
        }
        this.min = Math.min(duration, this.min);
        this.max = Math.max(duration, this.max);
        this.total += duration;
        return this;
    }

    addFail (res) {
        this.num++;
        this.fail++;
        return this;
    }

    getInfo () {
        return {
            num: this.num,
            fail: this.fail,
            min: this.min,
            max: this.max,
            avg: common.div(this.total, this.num - this.fail).toFixed(2),
            failureRate: common.div(this.fail, this.num).toFixed(2),
        }
    }
};


module.exports = LogAnalysis;
