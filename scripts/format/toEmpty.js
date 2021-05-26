const words = `   '</script>\r\n' +
'</div>\r\n' +
'<script>\r\n' +
"\tseajs.use('common/footer');\r\n" +
'</script>\n' +
'\n' +
'</body>\n' +
'\n' +
'    seajs.use("user/student/accountSafe/zhengjianBind");\n' +
'</script>\n' +
'\n' +`;

let arr = words.split(`\n`).toString().split(`'`).toString().split(`+`).toString().split(`,`).toString().split('').toString();
console.log(arr);

// let arr = words.map(word => {
//     return `${word}`
// })
// console.log(arr);