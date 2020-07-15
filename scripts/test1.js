// console.log('hello ',process.argv[4]);

// let yargs = require('yargs')
// .alias('n','name')
// // .boolean('n')
// // .boolean('env')
// // console.log('hello ',argv.env);
// // console.log('hi ',argv.name);
// // console.log('hi ',argv._);
// console.log(yargs.parse());
// // console.log(yargs);
// console.log('hhh',yargs.argv.name);
// console.log('gg',yargs.argv.env);

// const caps = require('../data/caps');

// console.log(caps);

// var fs = require('fs')

// const path = require('path')
// const ps = path.join('../prob/doc/mnls.jpg')
// console.log(ps);
// const a = require('../prob/data/doc.json');
// const b = require('../prob/doc/mnls.jpg');
// console.log(b);
// var fs = require('fs');
//   var data = fs.readFileSync('../prob/doc','utf-8');
// console.log(data);

const {
    common
} = require('../lib/index');
let a = ['男', '女'][common.getRandomNum(0, ['男', '女'].length - 1)];
console.log(a);