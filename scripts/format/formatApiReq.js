/**
 *
 * =>>>>>> 粘贴json到h   生成这样的格式  * @param {*} id
 * 
 */

const h = {
    userName: '',
    willCountry: '',
    studyBudget: '',
    consultGrade: '',
    signType: '',
    curPage: 1,
    pageSize: 15,

}


Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {Number} ${key}`);
})