
/**
 * 计算
 * @module calculate
 */
let calculate = module.exports = {};


/**
 * add - 加
 * @alias module:calculate
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
calculate.add = function (a, b) {
	let c, d, e;
	try {
		c = a.toString().split('.')[1].length;
	} catch (f) {
		c = 0;
	}
	try {
		d = b.toString().split('.')[1].length;
	} catch (f) {
		d = 0;
	}
	e = Math.pow(10, Math.max(c, d));
	return (calculate.mul(a, e) + calculate.mul(b, e)) / e;
};

/**
 * sub - 减
 * @alias module:calculate
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
calculate.sub = function (a, b) {
	let c, d, e;
	try {
		c = a.toString().split('.')[1].length;
	} catch (f) {
		c = 0;
	}
	try {
		d = b.toString().split('.')[1].length;
	} catch (f) {
		d = 0;
	}
	e = Math.pow(10, Math.max(c, d));
	return (calculate.mul(a, e) - calculate.mul(b, e)) / e;
};

/**
 * mul - 乘
 * @alias module:calculate
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
calculate.mul = function (a, b) {
	let c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split('.')[1].length;
	} catch (f) { }
	try {
		c += e.split('.')[1].length;
	} catch (f) { }
	return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
};

/**
 * div - 除
 * @alias module:calculate
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
calculate.div = function (a, b) {
	let c, d, e = 0,
		f = 0;
	try {
		e = a.toString().split('.')[1].length;
	} catch (g) { }
	try {
		f = b.toString().split('.')[1].length;
	} catch (g) { }
	c = Number(a.toString().replace('.', ''));
	d = Number(b.toString().replace('.', ''));
	return calculate.mul(c / d, Math.pow(10, f - e));
};
