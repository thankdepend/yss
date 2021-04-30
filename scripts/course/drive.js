/**
 * 因为我们在全局环境安装了mocha，所以可以使我们在命令行运行脚本
 * 原理是：识别到mocha，从路径中文文件从头遍历，识别层级为describe -> it
 */

it('测试1', () => {
    console.log(1);
});
describe('测试套件1', () => {
    console.log(2);
    it('测试3', () => {
        console.log(4);
    });
});
it('测试2', () => {
    console.log(3);
});
