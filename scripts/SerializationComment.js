const h = {
    belongOrg: '',
    infoCategoryID: '',
    topFlag: 0,
    infoState: '',
    showListFlag: '',
    infoID: '',
    infoTitle: '',
    begDate: '',
    endDate: '',
    curPage: 1,
    pageSize: 15,
}

Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {*} ${key}`);
})