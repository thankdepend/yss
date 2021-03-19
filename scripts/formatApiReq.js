/**
 *
 * =>>>>>> 粘贴json到h   生成这样的格式  * @param {*} id
 * 
 */

const h = {
    "userId": 0,
    "userName": 0,
    "schoolId": 0,
    "schoolName": 0,
    "examId": 0,
    "examName": 0,
    "pointId": 0,
    "pointName": 0,
    "profId": 0,
    "profName": 0,
    "registrationFormUrl": 0,
    "baoKaoId": 0,

}


Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {*} ${key}`);
})