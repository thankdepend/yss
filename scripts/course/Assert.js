/**
 * 常规的测试，我们只用到chai库断言就行，
 * 实际场景会使用自定义断言手段
 */

const { expect } = require("chai");
const { common } = require('../../lib/index')

// expect(3).to.be.equal(2);

// expect(typeof (1)).not.to.be.equal('number')
// expect([1, 2, 3]).to.include(4)

// 来看一条实际数据
let obj = {
    "archiveMode": 1,
    "archiveRule": 2,
    "artsOrSciences": 4,
    "batch": 1,
    "batchName": "本科提前批",
    "competitionDegree": 0.003111788,
    "createdBy": 1059117,
    "createdOn": 1615255117000,
    "createdOnStr": "2021-03-09 09:58:37",
    "cultureControlLine": 538.0,
    "cultureExpression": "(S-U/Q*750*0.5)/0.5/750*W",
    "dataYear": 2020,
    "diploma": 1,
    "diplomaStr": "本科",
    "enrollBasisType": 1,
    "enrollBasisTypeStr": "综合分",
    "enrollOnOffYear": 1,
    "enrollScoreCompare": 608.0,
    "enrollScoreMax": 618.75,
    "entrolScoreMin": 608.0,
    "entrolScoreMinCompare": 608.0,
    "examProfTypeName": "设计",
    "examType": 1,
    "expression": "R/W*750*0.5+U/Q*750*0.5",
    "id": 1847541,
    "isDeleted": false,
    "jointProfTypeID": 44,
    "jointProfTypeName": "声乐类",
    "lastPlanNum": 0,
    "modifiedBy": 1059117,
    "modifiedOn": 1615255117000,
    "modifiedOnStr": "2021-03-09 09:58:37",
    "p0": 0.4725,
    "planNum": 6,
    "preEnrollScoreMin": 608.0,
    "profCode": "16",
    "profControlLine": 255.0,
    "profID": 16,
    "profName": "绘画（中国画、油画）",
    "profRemark": "中国画、油画",
    "provinceID": "620000",
    "provinceName": "甘肃",
    "schAreaFullName": "北京",
    "schAreaID": "110100",
    "schAreaName": "北京",
    "schProvinceFullName": "北京",
    "schProvinceID": "110000",
    "schProvinceName": "北京",
    "schoolAttribute": 1,
    "schoolAttributeName": "公办",
    "schoolCusCode": "4111010002",
    "schoolID": 10002,
    "schoolName": "中国人民大学",
    "schoolNamePinyinStr": "Z",
    "schoolTagsName": "测试,双一流",
    "selectionRequirements": "数据更新",
    "typeID": 11,
    "typeName": "政法类"
}

let obj2 = {
    // "archiveMode": 1,
    // "archiveRule": 2,
    // "artsOrSciences": 4,
    // "batch": 1,
    "batchName": "专科提前批",
    "competitionDegree": 0.003111788,
    "createdBy": 1059117,
    "createdOn": 1615255117000,
    "createdOnStr": "2021-03-09 09:58:37",
    "cultureControlLine": 538.0,
    "cultureExpression": "(S-U/Q*750*0.5)/0.5/750*W",
    "dataYear": 2020,
    "diploma": 1,
    "diplomaStr": "本科",
    "enrollBasisType": 1,
    "enrollBasisTypeStr": "综合分",
    "enrollOnOffYear": 1,
    "enrollScoreCompare": 608.0,
    "enrollScoreMax": 618.75,
    "entrolScoreMin": 608.0,
    "entrolScoreMinCompare": 608.0,
    "examProfTypeName": "设计",
    "examType": 1,
    "expression": "R/W*750*0.5+U/Q*750*0.5",
    "id": 1847541,
    "isDeleted": false,
    "jointProfTypeID": 44,
    "jointProfTypeName": "声乐类",
    "lastPlanNum": 0,
    "modifiedBy": 1059117,
    "modifiedOn": 1615255117000,
    "modifiedOnStr": "2021-03-09 09:58:37",
    "p0": 0.4725,
    "planNum": 6,
    "preEnrollScoreMin": 608.0,
    "profCode": "16",
    "profControlLine": 255.0,
    "profID": 16,
    "profName": "绘画（中国画、油画）",
    "profRemark": "中国画、油画",
    "provinceID": "620000",
    "provinceName": "甘肃",
    "schAreaFullName": "北京",
    "schAreaID": "110100",
    "schAreaName": "北京",
    "schProvinceFullName": "北京",
    "schProvinceID": "110000",
    "schProvinceName": "北京",
    "schoolAttribute": 1,
    "schoolAttributeName": "公办",
    "schoolCusCode": "4111010002",
    "schoolID": 10002,
    "schoolName": "中国人民大学",
    "schoolNamePinyinStr": "Z",
    "schoolTagsName": "测试,双一流",
    "selectionRequirements": "数据更新",
    "typeID": 11,
    "typeName": "政法类"
}

// expect(obj).to.be.equal(obj2)
common.isApproximatelyEqualAssert(obj, obj2)