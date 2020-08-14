const wish = require('../../../reqApi/platfrom/wish');
const dict = require('../../../data/basicData')
const {
    common
} = require('../../../lib/index');
const {
    expect
} = require('chai');

class SchoolType {
    constructor() {
        /** 类别id */
        this.typeID = '';
        /** 类别名称 */
        this.typeName = '';
        /** 类别标志 */
        this.typeFlag = '';
        /** 排序号 */
        this.ord = '';
    }

    /** 保存院校类别 */
    async saveWishschooltype(params) {
        const totalPage = await wish.doWishSchoolTypeList({
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.totalPage);
        const res = await wish.saveWishschooltype(Object.assign({
            ticket: PLAT_TICKET,
            typeFlag: common.getRandomNum(5, 7), // 服务端写死，只有5,6,7
            // typeID: ,
            typeName: `蜜獾${common.getRandomStr(5)}类型`,
            ord: totalPage + 1,
        }, params));
        // 因为新增不返回id，我们去查列表第一条
        const findResult = await wish.doWishSchoolTypeList({
            likeTypeName: res.params.typeName,
            ticket: PLAT_TICKET
        }).then(res => res.result.datas.page.dataList[0]);
        this.typeID = findResult.typeID;
        this.typeName = findResult.typeName;
        this.typeFlag = findResult.typeFlag;
        this.ord = findResult.ord;
    }

    /** 删除留学院校类别 */
    async deleteWishschooltype() {
        const res = await wish.deleteWishschooltype({
            typeID: this.typeID,
            ticket: PLAT_TICKET
        });
        console.log(res);
    }

    /** 院校类别列表 */
    async wishSchoolTypeList(params) {
        const typeList = await wish.doWishSchoolTypeList(Object.assign({
            ticket: PLAT_TICKET
        }, params)).then(res => res.result.datas.page);
        console.log('院校类别列表', typeList);
        return typeList;
    }

    /** 院校类别列表断言 */
    async wishSchoolTypeListAssert(del) {
        if (del) {
            const res = await this.wishSchoolTypeList({
                typeName: this.typeName
            }).then(res => res.dataList);
            const findRes = res.find(obj => obj.typeID == this.typeID);
            expect(findRes).to.be.undefined();
        } else {
            const res = await this.wishSchoolTypeList({
                typeName: this.typeName
            }).then(res => res.dataList);
            const findRes = res.find(obj => obj.typeID == this.typeID)
            const mySchooltype = this;
            let exp = {
                typeID: mySchooltype.typeID,
                typeName: mySchooltype.typeName,
                typeFlag: mySchooltype.typeFlag,
                ord: mySchooltype.ord,
                isSelected: null,
                typeFlagStr: dict.abroadFlagType[mySchooltype.typeFlag],
            }

            common.isApproximatelyEqualAssert(exp, findRes)
        }
    }
}

const schoolTypeManage = module.exports = {};

schoolTypeManage.setupSchoolType = function () {
    return new SchoolType();
}