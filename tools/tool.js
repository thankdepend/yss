const tool = module.exports = {}

const xlsx = require('node-xlsx');
const argv = require('yargs').argv;

const workSheetsFromFile = xlsx.parse(`${__dirname}\\demo.xlsx`);
/**
 * @alias 导入exl
 * @param {*} params 
 */
tool.ipmtExl = () => {
    return {
        workSheetsFromFile
    }
}

