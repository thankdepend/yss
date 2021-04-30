/**
 * 有时候用例执行时间会比较长，超过脚本的默认执行时间
 * 所以我们有时候需要指定脚本的超时时间
 */

const common = require('../../lib/commonFc');

describe('超时', async () => {
    // 毫秒
    this.timeout(10000)
    before(async () => {
        await common.delay(3000);
    });

    it('测试', async () => {
        console.log(1);
    });

});