const a = {
    typeIds: 26,
    provChName: '浙江省',
    prov: 330000,
}

let arr = [];
const c = '/** */ '
// const a = '/** */'+
const b = Object.keys(a);
b.forEach(obj => 
    arr.push(`${c} + \n + ${obj}`)
);
console.log(arr);



console.log(Object.keys(a));
    

// Object.keys(a).forEach(val => {
//     console.log(val,a[val]);
// })
