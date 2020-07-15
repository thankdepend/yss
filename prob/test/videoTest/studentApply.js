const yysLogin = require('../../help/yssLogin');
const {common} = require('../../../lib/index');
const user = require('../../../reqApi/user');
const stu = require('../../../reqApi/app/stu');
const service = require('../../../reqApi/app/service');

describe('学生报名', async function () {
    let loginInfo, loginAccount, time = Date.now();
    before('考生登录', async function () {
        loginAccount = {
            loginName: 'ceshiqzy',
            password: 'csk001', 
            device: 'm'
         }
         loginInfo = await yysLogin.clientLogin(loginAccount).then(res => res.result.datas.user);
    });
    it('获取考试个人信息', async function () {
        const res = await user.getStuinfo({
            data:{
                m:"",p:{}
            },
            ticket:TICKET
        });
        console.log('保存考生个人信息',res);
    });
    let saveUerData = { data: { "m": "", "p": { "zhengJianLX": 4, "shenFenZH": "CESHIQZY", "kaoShengXM": "邱振宇", "xingBie": "女", "chuShengRQ": "2002-01-01", "minZu": "苗族", "tongXinDZExt": "370000-370100-370113", "tongXinDZ": "我在哪我是谁", "addressee": "邱振宇", "shouJi": "11111111111", "tongXinYB": "111111", "jiaZhangDH": "11111111111", "qQ": "", "xueLi": "大学", "stuType": 3, "gaoKaoSFH": "130000", "gaoKaoSF": "河北省", "zhengZhiMM": "党员", "suoZaiXX": "文化课学习学校", "suoZaiHS": "专业课学习学校", "kaoShengHao": "20131111111111", "yingWangJie": "应届", "wenLiKe": "文科", "name": ["去打野"], "relation": ["其他"], "companyName": ["工作单位"], "job": ["个人植物"], "phoneNumber": ["11111111111"], "huKou": 1, "huJiDZ": "1", "familyIdNO": "", "midSchStartEndTime": "", "height": "30", "firstForeignLang": "", "secondForeignLang": "", "honour": "1", "introduction": "", "qualifyAuth": "1", "passFlag": "", "score": "", "shangHaiExamNO": "", "grade": 6, "huJiSZSF": "110000", "huJiSZSFMC": "北京市" } } }

    it.only('保存考生个人信息', async function () {
        let studentParam = {
            data:{
                ...(saveUerData.data)
            },
            ticket:TICKET,
        }
        const res = await user.saveStuinfo(studentParam);
        console.log('保存考生个人信息',res);
    });
    // it('报名-搜索院校', async function () {
    //     const res = await stu.seekCollege({
    //         data:{m:"",p:{keyword:"中国美术学院",curPage:1,pageSize:100}},
    //         ticket:TICKET
    //     });
    //     console.log('搜索院校',res);   
    // });
    // it('上传考试照片', async function () {
    //     const res = await service.uploadAuth({
    //         data:{
    //             "p":{
    //             "ord":"1","resUrl":"http://img.artstudent.cn/pr/2020-07-04/20487e819a984e8fa8996332a6fcd070.JPEG","typeName":"给考生拍照","tId":1,"typeCode":"Photo"
    //         },"m":""},
    //         ticket: TICKET
    //     });
    //     log('上传图片',res);
    // });

});