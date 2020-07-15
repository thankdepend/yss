'use strict';
const moment = require('moment');
/**
 * 日期操作
 * @module dateHandler
 */
let dateHandler = module.exports = {};

/**
 * isInvalidDate - 判断字符串是否是日期格式
 * @alias module:dateHandler
 * @param {string} date
 * @return {boolean}
 */
dateHandler.isInvalidDate = (date) => {
	const myDate = new Date(date);
	return isNaN(date) && myDate != 'Invalid Date';
};

/**
 * stringToDate - 将字符串转成日期,不符合的返回Invalid Date
 *
 * @alias module:dateHandler
 * @param {string} dateString 日期字符串
 * @return {Date} YYYY-MM-DD HH:mm:ss
 */
dateHandler.stringToDate = (dateString) => {
	// 是否MM-DD开头
	let reg = new RegExp(/^(0?[1-9]|[1][0-2])-(0?\d|[12]\d|3[01])/);
	if (reg.test(dateString)) {
		return moment(`${moment().year()}-${dateString.replace(/:(\d{3})/, '')}`);
	};

	// 是否YY-MM-DD开头
	reg = new RegExp(/^\d{2}-(0?[1-9]|[1][0-2])-(0?\d|[12]\d|3[01])/);
	if (reg.test(dateString)) {
		return moment(`20${dateString.replace(/:(\d{3})/, '')}`);
	};

	// 是否YYYY-MM-DD开头
	reg = new RegExp(/^\d{4}-(0?[1-9]|[1][0-2])-(0?\d|[12]\d|3[01])/);
	if (reg.test(dateString)) {
		return moment(dateString.replace(/:(\d{3})/, ''));
	};

	// 是否包含HH:mm
	reg = new RegExp(/(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])/);
	if (reg.test(dateString)) {
		return moment(`${moment().format('Y-MM-DD')} ${dateString.replace(/:(\d{3})/, '')}`);
	};

	return 'Invalid Date';
};

/**
 * dateToString - 将日期转字符串
 * @alias module:dateHandler
 * @param {string} [format=yyyy-MM-dd] 日期格式
 * 目前只支持[yyyy-MM-dd,MM-dd HH:mm,yyyy-MM-dd HH:mm:ss,MM-dd]
 * @param {object} [date={}]           默认是当前日期
 * @return {string}
 */
dateHandler.dateToString = (format = 'yyyy-MM-dd', date = new Date()) => {
	let resultStr;

	let year = date.getFullYear();
	let month = zeroPadding(date.getMonth() + 1);
	let dateStr = zeroPadding(date.getDate());
	let hours = zeroPadding(date.getHours() + 1);
	let minutes = zeroPadding(date.getMinutes() + 1);
	let seconds = zeroPadding(date.getSeconds() + 1);

	switch (format) {
		case 'YYYY-MM-DD HH:mm:ss':
			resultStr = year + '-' + month + '-' + dateStr + ' ' + hours + ':' + minutes + ':' + seconds;
			break;

		case 'yyyy-MM-dd':
			resultStr = year + '-' + month + '-' + dateStr;
			break;

		case 'MM-dd HH:mm':
			resultStr = month + '-' + dateStr + ' ' + hours + ':' + minutes;
			break;

		case 'MM-dd':
			resultStr = month + '-' + dateStr;
			break;

		case 'MM/dd':
			resultStr = month + '/' + dateStr;
			break;

		default:
			resultStr = '日期格式有误';
			break;
	}

	return resultStr;
};

/**
 * getDateString - 获取日期字符串
 * @alias module:dateHandler
 * @param {array} timeArray 加减日期的数额[-1,0,+2]
 * @return {string}
 */
dateHandler.getDateString = (timeArray, fmt = 'Y-MM-DD') => {
	return moment().add({ years: timeArray[0], months: timeArray[1], days: timeArray[2] }).format(fmt);
};

/**
 * compareDate1ToDate2 - 将两个日期对象做比较
 * @alias module:dateHandler
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean} date1 > date2 返回true 否则返回false
 */
dateHandler.compareDate1ToDate2 = (date1, date2) => {
	return date1 > date2;
};

/**
 * compareDateString - 将两个日期字符串做比较
 * @alias module:dateHandler
 * @param {string} dateStr1
 * @param {string} dateStr2
 * @return {type} date1 > date2 返回true  否则返回false
 */
dateHandler.compareDateString = (dateStr1, dateStr2) => {
	let date1 = dateHandler.stringToDate(dateStr1);
	let date2 = dateHandler.stringToDate(dateStr2);
	return date1 > date2;
};

/**
 * subtractionDateString - 将两个日期字符串做比较
 * @alias module:dateHandler
 * @param {string} dateStr1
 * @param {string} dateStr2
 * @return {number} date1>date2 返回1, date1==date2 返回0, date1<date2 返回-1
 */
dateHandler.subtractionDateString = (dateStr1, dateStr2) => {
	let date1 = dateHandler.stringToDate(dateStr1);
	let date2 = dateHandler.stringToDate(dateStr2);

	if (date1 > date2) {
		return 1;
	} else if (date1 < date2) {
		return -1;
	} else {
		return 0;
	}
};

/**
 * getCurrentMonth - 获取本月第一天,最后一天的日期字符串
 * @alias module:dateHandler
 * @return {object} {firstDate,lastDate}
 */
dateHandler.getCurrentMonth = () => {
	return {
		'firstDate': moment().date(1).format('Y-MM-DD'),
		'lastDate': moment().date(1).add({ months: 1, day: -1 }).format('Y-MM-DD'),
	};
};

/**
 * getCurrentWeek - 获取本周第一天,最后一天的日期字符串
 * @alias module:dateHandler
 * @description 周一到周日
 * @return {object} {firstDate,lastDate}
 */
dateHandler.getCurrentWeek = () => {
	const todayOfWeek = moment().day();
	return {
		firstDate: moment().subtract(todayOfWeek - 1, 'days').format('Y-MM-DD'),
		lastDate: moment().add(7 - todayOfWeek, 'days').format('Y-MM-DD'),
	};
};

/**
 * getCurrentDate - 获取当前日期
 * @alias module:dateHandler
 * @param {string} [fmt=YYYY-MM-DD] 日期格式
 * @return {string} dateString
 */
dateHandler.getCurrentDate = (fmt = 'YYYY-MM-DD') => {
	return moment().format(fmt);
};

/**
 * getCurrentTime - 获取当前时间
 * @alias module:dateHandler
 * @return {string} YYYY-MM-DD HH:mm:ss
 */
dateHandler.getCurrentTime = () => {
	return moment().format('YYYY-MM-DD HH:mm:ss');
};
/**
 * getCurrentPreciseTime - 获取当前精确时间
 * @alias module:dateHandler
 * @return {string} YYYY-MM-DD HH:mm:ss:SSS
 */
dateHandler.getCurrentPreciseTime = () => {
	return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
};

/**
 * compareDate1ToDate2 - UTC转当前时间
 * @alias module:dateHandler
 * @param {Date} dateString
 * @return {string} 当前时间
 */
dateHandler.utcToLocaleDate = (dateString, fmt = 'yyyy-MM-dd') => {
	const date = new Date(dateString);
	return dateHandler.dateToString(fmt, date);
};

/*
 * 月、日、时、分、秒 小于10的在前面补零
 *
 */
function zeroPadding(num) {
	return num < 10 ? '0' + num : num;
};

/**
 * getPrefixYear - 返回年的前缀 如：2017返回20 1998 返回19
 * @alias module:dateHandler
 * @param {object} [time={}] date
 * @return {string}
 */
dateHandler.getPrefixYear = (time = new Date()) => {
	let year = time.getFullYear();
	return year.substr(0, 2);
};

//
/**
 * hashkeyToOptime - 去掉hashKey前面的deviceNo
 * @description 验证时，有时会用开单接口参数的hashKey作为依据去验证其他接口的时间字段
 * @param {string} str hashkey e.g. 88:63:df:9e:43:6b-2018-06-21 01:04:50:522
 * @return {string} optime
 */
dateHandler.hashkeyToOptime = (str) => {
	return String(str).replace(/([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}-/, '');
};
