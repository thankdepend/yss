const guide = require('../../reqApi/app/guide')

class Guide {
    constructor() {

    }

    /** 保存指南用户 */
    async saveGuideUser(params) {
        let json = Object.assign({
            data: {
                "m": "",
                "p": {
                    "provinceName": "青海",
                    "provinceID": "630000",
                    "jointProfTypeID": 10,
                    "jointProfTypeName": "播音与主持类",
                    "artsOrSciences": 1
                }
            },
            ticket: TICKET
        }, params)
        const res = await guide.saveGuideUser(json);
        console.log(res);
    }

    /** 指南统考类型列表 */
    async getGuideUnifiedTypeList() {
        const res = await guide.getGuideUnifiedTypeList({
            data: {
                "m": "",
                "p": {
                    "provinceId": "630000",
                    "artsOrSciences": 1,
                    "jointProfTypeId": 10
                }
            },
            ticket: TICKET
        });
    }

    /** 获取指南首页公告 */
    async getAnnouceList() {
        const res = await guide.getAnnouceList({
            ticket: TICKET
        });
        console.log(res);
    }

    /** 获取指南院校列表 */
    async getJointSchoolList() {
        const res = await guide.getJointSchoolList({
            data: {
                "m": "",
                "p": {
                    "curPage": 1,
                    "provinceId": "630000",
                    "artsOrSciences": 1,
                    "jointProfTypeId": 10
                }
            },
            ticket: TICKET
        });
        console.log(res);
    }
}

const guideManage = module.exports = {};

guideManage.setupGuide = function (params) {
    return new Guide(params);
}