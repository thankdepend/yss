const h = {
    roomId: '',
    roomName: '',
    beginRepDate: '',
    endRepDate: '',
    anchorId: '',
    showFlag: '',
    roomStatus: '',
    categoryName: '',
    categoryID: '',
    curPage: 1,
    pageSize: 15,
}

Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {*} ${key}`);
})