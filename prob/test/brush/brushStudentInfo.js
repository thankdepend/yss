const {
    common
} = require("../../../lib/index");
const user = require("../../../reqApi/app/user");
const service = require("../../../reqApi/app/service");
const account = require("../../data/account");
const yysLogin = require("../../help/yssLogin");

// const burshNum = process.argv
// console.log('参数', burshNum);

let argv = require("yargs").argv;
console.log("个数", argv.n);
for (let a = 1; a <= argv.n; a++) {
    describe.skip(`刷学生报名${a}`, async function () {
        this.timeout(TESTCASE.timeout);
        let loginInfo,
            loginAccount,
            time = Date.now();
        it("保存考生个人信息", async function () {
            loginAccount = {
                loginName: `330330`,
                password: "Csk001",
                // loginName: `DINGDING00${a}`,
                // password: 'Ysk001',
                device: "m",
            };
            common.delay(500);
            loginInfo = await yysLogin
                .clientLogin(loginAccount)
                .then((res) => res.result.datas.user);
            // console.log('登录信息',loginInfo);
            console.log("身份证", loginAccount.loginName);
            let studentParams = {
                data: {
                    m: "",
                    p: {
                        zhengJianLX: 3,
                        shenFenZH: `${loginAccount.loginName}`,
                        kaoShengXM: "xxk",
                        xingBie: "男",
                        chuShengRQ: `${common.getCurrentDate()}`,
                        minZu: "汉族",
                        tongXinDZExt: "230000-230300",
                        tongXinDZ: common.getRandomStr(5),
                        addressee: "xxk",
                        shouJi: 13221197273,
                        tongXinYB: 558855,
                        jiaZhangDH: 13221197273,
                        qQ: "",
                        xueLi: "初中",
                        stuType: 2,
                        gaoKaoSFH: 340000,
                        gaoKaoSF: "安徽省",
                        zhengZhiMM: "团员",
                        suoZaiXX: common.getRandomStr(5),
                        kaoShengHao: "",
                        yingWangJie: "应届",
                        wenLiKe: "不分文理",
                        name: [common.getRandomStr(3)],
                        relation: ["父亲"],
                        companyName: [common.getRandomStr(3)],
                        job: [`obj-${common.getRandomStr(3)}`],
                        phoneNumber: [13221197273],
                        huKou: "",
                        qualifyAuth: "",
                        passFlag: "",
                        grade: "",
                    },
                },
                ticket: TICKET,
            };
            // console.log('请求', studentParams);
            const res = await user.saveStuinfo(studentParams);
            console.log("保存考生个人信息", res);
        });
        it.skip("完善考生信息", async function () {
            platFromInfo = await yysLogin.platfrom({
                loginName: "autoGen1",
                password: "Csk001",
            });
            console.log("用户登录", platFromInfo);

            // console.log('平台登录',platFromInfo);
            // const a = await user.getStuInfo({
            //     ticket:PLAT_TICKET,
            // });
            // console.log(a);

            let params = {
                tk: PLAT_TICKET,
                firstSaveFlag: "firstSaveFlag",
                zhengJianLX: 4,
                shenFenZH: "AUTOGEN1",
                xingBie: "男",
                chuShengRQ: "2020-07-04",
                kaoShengXM: "xxk",
                stuType: 2,
                gaoKaoSF: "浙江省",
                gaoKaoSFH: 330000,
                diShiMing: -1,
                languageStr: 1,
                shouJi: 13221197273,
                yingWangJie: "应届",
                zhengZhiMM: "团员",
                minZu: "汉族",
                xueLi: "高中",
                suoZaiXX: "哈哈高中",
                tongXinDZSF: 330000,
                tongXinDZDS: 330100,
                tongXinDZDQ: 330110,
                tongXinDZExt: "330000-330100-330110",
                tongXinDZ: "萨达",
                addressee: "xxk",
                tongXinYB: 325116,
                jiaZhangDH: 13221197273,
                name: "xxk",
                relation: "父亲",
                companyName: "奥德赛大",
                job: "萨达打算",
                ticket: PLAT_TICKET,
            };
            const infoRes = await user.saveStuinfo(params);
            console.log(infoRes);
        });
        it("上传考生照片", async function () {
            await service.uploadAuth({
                data: {
                    p: {
                        ord: "1",
                        resUrl: "http://img.artstudent.cn/pr/2020-07-13/43a2935393424c48b386442e6922c8d9.JPEG",
                        typeName: "给考生拍照",
                        tId: 9,
                        typeCode: "Photo",
                    },
                    m: "",
                },
                ticket: TICKET,
            });
        });
    });
}