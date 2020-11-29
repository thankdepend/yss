const yssLogin = require('../../help/yssLogin');
const school = require('../../../reqApi/platfrom/school');


describe('加考题', async function () {
    before('登录', async function () {
        await yssLogin.platfrom({
            loginName: '13166',
            password: 'Yss13166',
        })
    });
    it('加考题-单选', async function () {
        const res = await school.saveExaminationPaperQuestion({
            questionName: `在"峙峪"人和"山顶洞"人的装饰品上，呈现出成熟的钻孔技术，这在雕刻史上具有重要意义。`,
            questionAnswer: "B",
            questionType: 1,
            paperId: 1,
            paperName: '川美理论测试密卷A卷',
            orderNum: 5,
            questionItemJson: [{
                    option: "A",
                    description: '玛雅人',
                }, {
                    option: "B",
                    description: '山顶洞人',
                },
                {
                    option: "C",
                    description: '罗马人',
                }, {
                    option: "D",
                    description: '阿兹特克人',
                }
            ],
            ticket: PLAT_TICKET
        })
        console.log(res);
    });
    it.skip('加考题-多选', async function () {
        const res = await school.saveExaminationPaperQuestion({
            questionName: `在"峙峪"人和"山顶洞"人的装饰品上，呈现出成熟的钻孔技术，这在雕刻史上具有重要意义。`,
            questionAnswer: "B",
            questionType: 1,
            paperId: 1,
            paperName: '川美理论测试密卷A卷',
            orderNum: 5,
            questionItemJson: [{
                    option: "A",
                    description: '玛雅人',
                }, {
                    option: "B",
                    description: '山顶洞人',
                },
                {
                    option: "C",
                    description: '罗马人',
                }, {
                    option: "D",
                    description: '阿兹特克人',
                }
            ],
            ticket: PLAT_TICKET
        })
        console.log(res);
    });

});