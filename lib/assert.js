'use strict';
const dateHandler = require('./dateHandler');

/**
 * 断言
 * @module check
 */
let check = module.exports = {};

check.isMatch = function (actual, regex, msg) {
	if (!actual.match(regex)) {
		throw new Error(`${msg}`);
	};
};

const defIgnore = ['modelClass', 'alipay_status', 'weixinpay_status', 'version', 'globalId'], // 忽略字段
	similarKeys = ['birthday', 'show_styleid', 'opname', 'mainOpstaffName', 'staffName', 'seller.name', 'accountName']; // 相似字段 e.g. 000,总经理和总经理 认为是一样的

function mixIgnoreArr(ignore) {
	let ignoreArr = _.cloneDeep(defIgnore);
	ignoreArr.push(...ignore);
	return Array.from(new Set(ignoreArr));
};

/**
 * isApproximatelyEqualAssert - 判断两个对象相同key-value的值是否相等(断言)
 * @alias module:check
 * @param {object} expected 期望值
 * @param {object} actual   实际值
 * @param {array} [ignore=[]]   忽略字段
 * @param {object} [msg=''] 错误信息
 */
check.isApproximatelyEqualAssert = function (expected, actual, ignore = [], msg = '') {
	if (_.isEmpty(expected)) throw new Error(`expected=${JSON.stringify(expected)}，请检查\n${msg}`);
	if (_.isEmpty(actual)) throw new Error(`actual=${JSON.stringify(actual)}，请检查\n${msg}`);
	let result = check.isApproximatelyEqual(expected, actual, ignore);
	if (!result.flag) {
		throw new Error(`${msg}:\n\t${result.errorMsg}`);
	};
};

/**
 * isApproximatelyEqual - 判断两个对象相同key的值是否相等
 * @alias module:check
 * @param {object}  expected    期望值
 * @param {object}  actual      实际值
 * @param {array} [ignore=[]] 忽略字段
 * @return {object} {flag,errorMsg}
 */
check.isApproximatelyEqual = function (expected, actual, ignore = []) {
	let flag = true, // 是否相等
		errorMsg = ''; // 收集错误信息
	// hasCheck = false; // 是否发生过断言 (内部用,防止expected和actual完全不匹配,需要抛出错误)
	ignore = mixIgnoreArr(ignore);
	for (const key in expected) {
		if (actual.hasOwnProperty(key) && !ignore.includes(key)) {
			const [element1, element2] = [expected[key], actual[key]];
			if (typeof element1 == 'object') {
				if (typeof element2 == 'object') {
					const result = check.isApproximatelyEqual(element1, element2, ignore);
					flag = result.flag;
					if (!flag) {
						errorMsg += result.errorMsg.replace(/key=/, `key=${key}.`); // 替换第一个key
						break;
					};
				} else {
					errorMsg = `key=${key},typeof expected=${typeof element1},typeof actual=${typeof element2},类型不匹配`;
				};
			} else {
				// hasCheck = true;

				// 1.先判断是否相等  2.若key为相似字段 则判断是否为包含关系  3.判断日期/时间
				flag = valueFormat(element1) == valueFormat(element2);
				// console.log(`element1=${element1},element2=${element2},flag=${flag}`);
				flag = flag || similarKeys.includes(key) && (element2.length < element1.length ? element1.includes(element2) : String(element2).includes(element1));
				// console.log(`element1=${element1},element2=${element2},flag=${flag}`);
				// !dateHandler.isInvalidDate(element1) && !dateHandler.isInvalidDate(element2) &&
				flag = flag || (check.isAqualOptime(element1, element2));
				if (!flag) {
					errorMsg = `key=${key}, expected('${element1}') != actual('${element2}')`;
					break;
				};
			};
		};
	};
	// if(!hasCheck) {
	// 	errorMsg = `expected.keys:${Object.keys(expected)}和actual.keys:${Object.keys(actual)},未进行断言,请检查`;
	// };
	return {
		'flag': flag,
		'errorMsg': errorMsg,
	};
};

/**
 * isApproximatelyArrayAssert - 判断两个数组是否相等(断言)
 * @alias module:check
 * @param {object} expected 期望值
 * @param {object} actual   实际值
 * @param {object} [opts]   配置参数
 * @param {array} [opts.ignore=[]]   忽略字段
 * @param {object} [opts.msg=''] 错误信息
 * @param {object} [opts.key=[]] 匹配规则key数组
 */
check.isApproximatelyArrayAssert = function (expected, actual, opts = {}) {
	const result = check.isApproximatelyArray(expected, actual, opts);
	if (!result.flag) throw new Error(`${opts.msg || ''}\n\t${result.errorMsg}`);
};

/**
 * isApproximatelyArray - 判断两个数组是否相等
 * 数组[a1,a2,a3] 跟数组 [a2,a1,a3]，认为是相同的
 * @alias module:check
 * @param {array}  expected    期望数组
 * @param {array}  actual      实际数组
 * @param {object} opts
 * @return {object} {flag,errorMsg}
 */
check.isApproximatelyArray = function (expected, actual, {
	key = [],
	ignore = []
} = {}) {
	// 若2个数组的长度不同则认为是不同的
	let isApproximately = expected.length == actual.length;
	if (!isApproximately) {
		return {
			'flag': isApproximately,
			'errorMsg': `数组长度不同 expected.length=${expected.length},actual.length=${actual.length}`
		};
	};

	let errorMsg = '';
	if (key.length) {
		expected.forEach(_exp => {
			const keyMsg = key.map(ele => `${ele}=${_exp[ele]}`).join();
			const actualList = takeWhile(actual, (_actual) => key.every(_key => _.get(_exp, _key) == _.get(_actual, _key)));
			switch (actualList.length) {
				case 0:
					isApproximately = false;
					errorMsg += `\n匹配规则:${keyMsg},实际值中未匹配到信息,\n   exp=${JSON.stringify(_exp)}`;
					break;
				case 1: {
					const result = this.isApproximatelyEqual(_exp, actualList[0], ignore);
					if (!result.flag) {
						isApproximately = false;
						errorMsg += `\n匹配规则:${keyMsg},期望值与实际值不匹配, ${result.errorMsg}`;
					}
				}
				break;
			default:
				isApproximately = false;
				errorMsg += `\n匹配规则:${keyMsg},实际值中匹配到多条信息,\n   exp=${JSON.stringify(_exp)}`;
				break;
			}
		});
	} else {
		for (let i = 0, length = expected.length; i < length; i++) {
			isApproximately = check.isArrayContainObject(actual, expected[i], ignore);
			if (!isApproximately) {
				errorMsg = `\ni=${i},未找到期望值:${JSON.stringify(expected[i])}`; // actualArr=${JSON.stringify(actual)}
				break;
			};
		};
	};

	return {
		'flag': isApproximately,
		'errorMsg': errorMsg
	};
};

/**
 * isArrayContainObject - 数组中是否包含某个对象
 * @alias module:check
 * @param {array}  array       查询数组
 * @param {object}  obj         期望值对象
 * @param {array} [ignore=[]] 忽略字段
 * @return {boolean} flag
 */
check.isArrayContainObject = function (array, obj, ignore = []) {
	let ret;
	for (let i = 0, length = array.length; i < length; i++) {
		ret = check.isApproximatelyEqual(obj, array[i], ignore);
		if (ret.flag) break;
	};
	return ret.flag;
};

check.isArrayContainObjectAssert = function (obj1, obj2, ignore, msg = '') {
	let flag = check.isArrayContainObject(obj1, obj2, ignore);
	if (!flag) throw new Error(`${msg}`); // :\n\t${result.errorMsg}
};

/**
 * isFieldsEqual - 比较两个对象中的某些字段值是否相等
 * eg: obj1['actual'] 和 obj2['paysum'] 相比较
 * @alias module:check
 * @param {object} obj1     obj1
 * @param {object} obj2     obj2
 * @param {string} mapfield 'totalmoney;actual=paysum;agency|0'
 * @return {object} {flag,errorMsg}
 */
check.isFieldsEqual = function (obj1, obj2, mapfield) {
	let errorMsg = '';
	const fields = mapfield.split(';');
	for (let i = 0; i < fields.length; i++) {
		let isAql = true;
		const [
			[field1, def1],
			[field2, def2] = [field1, def1]
		] = fields[i].split('=').map((str) => str.split('|'));
		// console.log(`field1=${field1},def1=${def1},field2=${field2},def2=${def2}`);
		if (field1.includes('time') || field2.includes('time')) {
			isAql = check.isAqualOptime(obj1[field1], obj2[field2]);
		} else {
			isAql = valueFormat(obj1[field1], def1) == valueFormat(obj2[field2], def2);
		};
		if (!isAql) errorMsg += `\n\tobj1[${field1}]:${obj1[field1]} 不等于 obj2[${field2}]:${obj2[field2]}`;
	};

	return {
		flag: errorMsg.length === 0,
		errorMsg
	};
};

function valueFormat(value, defValue) {
	if (typeof value !== 'undefined') {
		value = isNaN(value) ? value : Number(value);
	} else if (typeof defValue !== 'undefined') {
		value = isNaN(defValue) ? defValue : Number(defValue);
	};
	return value;
};

/**
 * isFieldsEqualAssert - 比较两个对象中的某些字段值是否相等(断言)
 * @alias module:check
 * @param {object} obj1     期望值
 * @param {object} obj2     实际值
 * @param {string} mapfield 'totalmoney;actual=paysum;daishou'
 * @param {string} msg 错误信息
 */
check.isFieldsEqualAssert = function (obj1, obj2, mapfield, msg = '') {
	let result = check.isFieldsEqual(obj1, obj2, mapfield);
	if (!result.flag) throw new Error(`${msg}:\n\t${result.errorMsg}`);
};

/**
 * isAqualOptime - optime是否相似
 * @alias module:check
 * @param {string}   expected  期望值
 * @param {string}   actual    实际值
 * @param {number} [allow=1] 误差值min
 * @return {Boolean}
 */
check.isAqualOptime = function (expected, actual, allow = 2) {
	if (typeof expected === 'undefined' || typeof actual === 'undefined') return false;

	let ret = false;
	expected = dateHandler.hashkeyToOptime(expected);
	actual = dateHandler.hashkeyToOptime(actual);

	// 字符串转日期,不符合返回 Invalid Date
	const t1 = dateHandler.stringToDate(expected),
		t2 = dateHandler.stringToDate(actual);

	if (t1 !== 'Invalid Date' && t2 !== 'Invalid Date') {
		ret = Math.abs((t2 - t1) / 60000) <= allow;
	};

	if (t1 == 'Invalid Date' && t2 == 'Invalid Date') {
		return false;
	};

	if (!ret) {
		if (expected.length > actual.length) {
			return expected.includes(actual); // 去除最后一位，一般为秒 actual.slice(0, -1)
		} else {
			return actual.includes(expected); // .slice(0, -1)
		};
	};
	return ret;
};

check.isAqualOptimeAssert = (expected, actual, allow, msg = '') => {
	const flag = check.isAqualOptime(expected, actual, allow);
	if (!flag) throw new Error(`${msg}: expected:${expected} != actual:${actual}`);
};

/**
 * isArrayContainArray - array2中是否包含array1
 * @description array1.length <= array2.length
 * @param {array}  array1
 * @param {array}  array2
 * @param {array} [ignore=[]] 忽略字段
 * @return {object} {flag,errorMsg}
 */
check.isArrayContainArray = function (array1, array2, ignore = []) {
	let errorMsg = '';
	ignore = mixIgnoreArr(ignore);
	if (array1 && array1.length && array2 && array2.length) {
		if (array1.length > array2.length) {
			errorMsg = `isArrayContainArray验证array2中是否包含array1,参数array1.length:${array1.length} > array2.length:${array2.length}`;
		} else {
			array1.forEach((obj, index) => {
				let isContain = false;
				for (let i = 0, length = array2.length; i < length; i++) {
					let result = check.isApproximatelyEqual(array2[i], obj, ignore);
					if (result.flag) {
						isContain = true;
						break;
					};
				};
				if (!isContain) {
					errorMsg += (`index=${index},`);
				};
			});
		};
	} else {
		errorMsg = `参数错误:array1=${array1},array2=${array2}`;
	};
	return {
		flag: errorMsg.length === 0,
		errorMsg,
	};
};

/**
 * isArrayContainArrayAssert - array2中是否包含array1(断言)
 * @description 前提 array1.length <= array2.length
 * @param {array} array1 期望数组
 * @param {array} array2 实际数组
 * @param {array} [ignore=[]] 忽略字段
 * @param {string} [msg=[]] 错误信息
 */
check.isArrayContainArrayAssert = function (array1, array2, ignore = [], msg = '') {
	let result = check.isArrayContainArray(array1, array2, ignore);
	if (!result.flag) throw new Error(`${msg}\n\t${result.errorMsg}`);
};

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
check.difference = function (base, object) {
	function changes(object, base) {
		return _.transform(object, function (result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
};


function takeWhile(array, predicate) {
	if (array && array.length) {
		let list = [];
		array.forEach((obj, index, array) => predicate(obj, index, array) && list.push(obj));
		return list;
	} else {
		return [];
	};
};