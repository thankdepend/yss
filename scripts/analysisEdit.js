const h = {
    groupID: '',
    schoolName: '',
    groupName: `圈`,
    typeFlag: 1,
    typeID: '',
    verifyFlag: 3,
    isHot: 1,
}
let s = ``
Object.keys(h).forEach((key) => {
    s += `${key}: this.${key},\n`
})
// eval(s)
console.log(s);