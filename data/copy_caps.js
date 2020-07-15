'use strict';
const fs = require('fs');
const path = require('path');

let caps = {
	url: 'http://139.196.124.16:8001',
	// deviceNo: 'a4:d1:8c:08:46:09',//线上环境必填
	epid: '5541',
	name: 'adev1',
	slhVersion: '9.3501',
	dlProductCode: 'ipadslh', // ,web,pocketslh
	testTaskId: new Date().getTime(), // 接口测试覆盖统计
};
// console.log(`testTaskId=${caps.testTaskId}`);

const envCaps = {

	app1: {
		url: 'http://139.196.124.16:8021',
		// deviceNo: '98:ca:33:1f:a4:8a', //ipad蓝牙
		epid: '14593',
		socketURL: '101.132.186.4:6061',
		sn: '1421044620419',
		dlProductCode: 'ipadslh',
	},
	app3: {
		url: 'http://139.196.124.16:8023',
		// deviceNo: '98:ca:33:1f:a4:8a', //ipad蓝牙
		epid: '18033',
		socketURL: '101.132.186.4:6061',
		sn: '1464847609641',
		dlProductCode: 'ipadslh',
	},
	yans1: {
		url: 'http://123.207.69.228:8081',
		epid: '267155',
		sn: '1497449706949',
		dlProductCode: 'ipadslh',
	},
	adev1: {
		url: 'http://139.196.124.16:8001',
		// deviceNo: 'a4:d1:8c:08:46:09',
		epid: '5541',
		socketURL: '101.132.186.4:6061',
		sn: '1400221154483',
		dlProductCode: 'ipadslh',
	},

	adev3: {
		url: 'http://139.196.124.16:8003',
		// deviceNo: '88:63:df:9e:43:6b', //iMac的wifi
		// epid: '7341', //账套gg-xujxia
		epid: '13009',
		socketURL: '101.132.186.4:6061',
		sn: '1444784224518',
		dlProductCode: 'ipadslh',
	},

	adev5: {
		url: 'http://139.196.124.16:8005',
		// deviceNo: 'e0:b5:2d:ea:ad:ca',
		epid: '12483',
		socketURL: '101.132.186.4:6061',
		sn: '1509454373920',
		dlProductCode: 'ipadslh',
	},
	saas_online: {
		url: 'http://123.207.69.228:8081',
		epid: '272227',
		sn: '1509454373920',
		dlProductCode: 'ipadslh',
	},

	adev7: {
		url: 'http://139.196.124.16:8007',
		// deviceNo: '88:63:df:9e:43:6b',
		epid: '13277',
		socketURL: '101.132.186.4:6061',
		sn: '1479776417757',
	},

	// 刘日本地环境
	dev_lr: {
		url: 'http://192.168.0.109:8081',
		epid: '1100135',
		dlProductCode: 'ipadslh',
	},

	// 二代开发环境 dlProductCode:web 未绑定真机
	// 德贵的 192.168.0.101:10000
	slh2_dev: {
		url: 'http://192.168.0.28:8081', //
		// deviceNo: 'a4:d1:8c:08:46:09',
		epid: '237', // 帐套:lxx
		dlProductCode: 'web',
	},
	slh2_xs: {
		url: 'http://182.61.24.95:7921',
		epid: '100030827',
		dlProductCode: 'web',
	},

	slh2_dev2: {
		url: 'http://192.168.0.31:7901',
		// epid: '336',//tzhehe
		epid: 237, // lxx
		dlProductCode: 'web',
	},

	// 二代测试环境
	slh2_test: {
		url: 'http://139.196.124.16:7901',
		// deviceNo: 'FC:FC:48:2C:29:98',
		epid: '13137', //
		msgUrl: '115.231.110.247:6061',
		sn: '1505962301075',
	},

	slh2_cb3: {
		url: 'http://101.201.172.68:7922',
		epid: 9, // nq002 '100000002'
		deviceNo: 'fc:fc:48:2c:29:97',
		// dlProductCode: 'web',
		unitId: '',
	},

	slh2_rdc: {
		url: 'http://192.168.0.31:7901', // 二代开发环境
		epid: '873'
	},

	slh2_asdd1: { // 二代审核环境
		url: 'http://139.196.124.16:7901',
		// epid: '11769',
		// deviceNo: 'e0:b5:2d:ea:ad:cb',
		// dlProductCode: ''
		epid: '100030527'
	},

	cs3d1: {
		url: 'http://122.112.218.102:7901',
		ssurl: 'https://ssbei.hzecool.com',
		epid: 100053177, // '13297', //'13137',//100047749
		unitId: 100049291,
		deviceNo: 'DC:08:0F:BC:EC:AC', // 'e0:b5:2d:ea:ad:cb', // 'FC:FC:48:2C:29:98',
	},

	cs3d2: { // 二代测试环境
		url: 'http://139.196.124.16:7902',
		ssurl: 'https://sst.hzecool.com',
		unitId: 27797,
		epid: '27557', // '14449', // '13297', //'13137','24041'
		deviceNo: 'e0:b5:2d:ea:ad:cb' // 'e0:b5:2d:ea:ad:cb', //'FC:FC:48:2C:29:98', //54:99:63:15:D6:AE被被人切换
	},

	cs3d3: {
		url: 'http://139.196.124.16:7903',
		ssurl: 'https://sst.hzecool.com',
		epid: '22037',
		deviceNo: 'c0:b6:58:d5:92:58',
		// dlProductCode: ''
	},
	cs3d5: { // 二代合库测试环境
		url: 'http://139.196.124.16:7905',
		ssurl: 'https://sst.hzecool.com',
		epid: '29177',
		deviceNo: '8C:FE:57:28:88:2E', // 'B8:63:4D:C2:76:65'
	},


	sd_online: {
		url: 'http://101.201.172.68:7922',
	},

	sd_cg4: { // 二代线上环境
		url: 'http://182.61.24.95:7921',
		ssurl: 'https://ss.hzecool.com',
		epid: '100052455',
		deviceNo: '8C:FE:57:28:88:2E',
	},

	omo_online: {
		url: 'https://bg2.slh.hzdlsoft.com:8625',
	},

	sp_dev: {
		// url: 'http://192.168.0.34',
		url: 'http://192.168.0.4', // 近江机房
	},

	// http://c.hzdlsoft.com:7082/Wiki.jsp?page=Sp测试环境
	sp_test: {
		url: 'https://spdev.hzecool.com',
	},

	// http://c.hzdlsoft.com:7082/Wiki.jsp?page=Sp审核环境
	sp_chk: {
		url: 'https://spchk.hzecool.com',
	},
	// sp审核环境 北方
	sp_chl: {
		url: 'https://spchl.hzecool.com',
	},

	// http://c.hzdlsoft.com:7082/Wiki.jsp?page=Sp预发布环境
	sp_pre: {
		url: 'https://sppre.hzecool.com',
	},

	// http://c.hzdlsoft.com:7082/Wiki.jsp?page=线上环境测试#section-_E7_BA_BF_E4_B8_8A_E7_8E_AF_E5_A2_83_E6_B5_8B_E8_AF_95-_E5_B9_B3_E5_8F_B0_E7_BA_BF_E4_B8_8A_E6_B5_8B_E8_AF_95_E7_8E_AF_E5_A2_83_E7_A1_AE_E8_AE_A4
	sp_online: {
		// url: 'https://sp.hzecool.com',
		// url: 'https://spbak.hzecool.com'
		// url:'https://spop.hzecool.com'
		url: 'https://spt.hzecool.com',
	},

	xboss: {
		url: 'http://115.159.17.102:8011',
		epid: '78509',
		// deviceNo: '0c:4d:e9:b1:9f:23',
	},

	// 和cb3是互通的
	cg4: {
		url: 'http://182.61.24.95:7921',
		// epid: 9, //nq002 '100000002'
		// deviceNo: 'fc:fc:48:2c:29:97',
		// unitId: '',
	},

	abiz: {
		url: 'http://223.6.248.236:7890',
		sn: '1497449706949',
		// deviceNo: '',
		epid: '99105',
	},

	a01: {
		url: 'http://120.26.66.21:8081',
		sn: '1427528444314',
		// deviceNo: '',
		epid: '97177',
	},

	a02: {
		url: 'http://42.96.249.254:8082',
		sn: '1427528639190',
		// deviceNo: '',
		epid: '47634',
	},

	a03: {
		url: 'http://223.6.248.236:8083',
		sn: '1427528902582',
		// deviceNo: '',
		epid: '98465',
	},

	a04: {
		url: 'http://42.96.249.254:8084',
		sn: '1427528959371',
		// deviceNo: '',
		epid: '47642',
	},
	a05: {
		url: 'http://119.29.46.191:8085',
		sn: '1517375741642',
		// deviceNo: '',
		epid: '238995',
	},
	a06: {
		url: 'http://101.201.172.68:8086',
		sn: '1517375912831',
		// deviceNo: '',
		epid: '36452',
	},
	a07: {
		url: 'http://119.29.46.191:8087',
		sn: '1517375954682',
		// deviceNo: '',
		epid: '239011',
	},
	a08: {
		url: 'http://101.201.172.68:8088',
		sn: '1517376035010',
		// deviceNo: '',
		epid: '36460',
	},
	a11: {
		url: 'http://115.159.17.102:8011',
		sn: '1480060349738',
		// deviceNo: '',
		epid: '147605',
	},
	a12: {
		url: 'http://42.96.249.254:8012',
		sn: '1508996395942',
		// deviceNo: '',
		epid: '56902',
	},
	a13: {
		url: 'http://115.159.17.102:8013',
		sn: '1502443210292',
		// deviceNo: '',
		epid: '147845',
	},
	a14: {
		url: 'http://39.105.226.58:8014',
		sn: '1562134054369',
		epid: '58218'
	},
	a15: {
		url: 'http://182.61.6.194:8015',
		sn: '1517375169804',
		// deviceNo: '',
		epid: '131703',
	},
	a16: {
		url: 'http://101.201.172.68:8016',
		sn: '1517376125596',
		// deviceNo: '',
		epid: '51320',
	},
	a17: {
		url: 'http://182.61.6.194:8017',
		sn: '1517376168116',
		// deviceNo: '',
		epid: '131719',
	},
	a18: {
		url: 'http://180.76.162.156:8018',
		sn: '1562134215398',
		// deviceNo: '',
		epid: '42476'
	},
	a31: {
		url: 'http://223.6.248.236:8031',
		sn: '1527584134843',
		// deviceNo: '',
		epid: '249947',
	},
	a35: {
		url: 'http://182.61.24.95:8035',
		sn: '1527666478705',
		// deviceNo: '',
		epid: '142477',
	},
	a41: {
		// url: 'http://223.6.248.236:8041',
		url: 'http://106.12.78.57:8081',
		sn: '1550547788283',
		// deviceNo: '',
		epid: '118705',
	},
	a45: {
		url: 'http://182.61.24.95:8045',
		sn: '1550547849068',
		// deviceNo: '',
		epid: '75454',
	},
	abz1: {
		url: 'http://120.26.66.21:9090', // 1代线上环境
		sn: '1533720960098',
		// deviceNo: '',
		epid: '101001',
	},
	t01: {
		url: 'http://120.26.66.21:7081',
		sn: '1427528444314',
		// deviceNo: '',
		epid: '97177',
	},
	t02: {
		url: 'http://42.96.249.254:7082',
		sn: '1427528639190',
		// deviceNo: '',
		epid: '47634',
	},
	t03: {
		url: 'http://223.6.248.236:7083',
		sn: '1427528902582',
		// deviceNo: '',
		epid: '98465',
	},
	t04: {
		url: 'http://42.96.249.254:7084',
		sn: '1427528959371',
		// deviceNo: '',
		epid: '47642',
	},
	t05: {
		url: 'http://119.29.46.191:7085',
		sn: '1517375741642',
		// deviceNo: '',
		epid: '238995',
	},
	t06: {
		url: 'http://101.201.172.68:7086',
		sn: '1517375912831',
		// deviceNo: '',
		epid: '36452',
	},
	t07: {
		url: 'http://119.29.46.191:7087',
		sn: '1517375954682',
		// deviceNo: '',
		epid: '239011',
	},
	t08: {
		url: 'http://101.201.172.68:7088',
		sn: '1517376035010',
		// deviceNo: '',
		epid: '36460',
	},
	t11: {
		url: 'http://115.159.17.102:7011',
		sn: '1480060349738',
		// deviceNo: '',
		epid: '147605',
	},
	t12: {
		url: 'http://42.96.249.254:7012',
		sn: '1508996395942',
		// deviceNo: '',
		epid: '56902',
	},
	t13: {
		url: 'http://115.159.17.102:7013',
		sn: '1502443210292',
		// deviceNo: '',
		epid: '147845',
	},
	t15: {
		url: 'http://182.61.6.194:7015',
		sn: '1517375169804',
		// deviceNo: '',
		epid: '131703',
	},
	t16: {
		url: 'http://101.201.172.68:7016',
		sn: '1517376125596',
		// deviceNo: '',
		epid: '51320',
	},
	t17: {
		url: 'http://182.61.6.194:7017',
		sn: '1517376168116',
		// deviceNo: '',
		epid: '131719',
	},
	t31: {
		url: 'http://223.6.248.236:7031',
		sn: '1527584134843',
		// deviceNo: '',
		epid: '249947',
	},
	t35: {
		url: 'http://182.61.24.95:7035',
		sn: '1527666478705',
		// deviceNo: '',
		epid: '142477',
	},
	t41: {
		url: 'http://223.6.248.236:7041',
		sn: '1550547788283',
		// deviceNo: '',
		epid: '118705',
	},
	t45: {
		url: 'http://182.61.24.95:7045',
		sn: '1550547849068',
		// deviceNo: '',
		epid: '75454',
	},
	ss_dev: {
		url: 'https://ssdev.hzecool.com',
	},
	ss_test: {
		url: 'https://sst.hzecool.com',
		// url: 'http://192.168.0.3'
	},
	ss_chk: {
		// url: 'https://sschk.hzecool.com',
		url: 'http://192.168.0.52',
		// 高可用 备用地址 (目前还没用到)
		// url: 'https://sschkbak.hzecool.com',
		// url: 'http://192.168.0.116',
	},
	ss_pre: {
		url: 'https://sspre2.hzecool.com',
	},
	ss_online: {
		url: 'https://ssbei.hzecool.com', // 北方
		// url: 'https://ss.hzecool.com',
	},
	plant_test: {
		url: 'https://hzdev.hzdlsoft.com',
	},
	plant_online: {
		// url: 'http://pay.hzdlsoft.com',
	},
	mkt_test: {},
	mkt_chk: {},
	mkt_online: {},
};

const argv = require('yargs')
	.option('env', {
		alias: 'envName',
		// default: 'slh2_test',
		describe: '运行环境',
		type: 'string'
	})
	.option('epid', {
		describe: '帐套id',
		type: 'string'
	})
	.option('sn', {
		describe: '根据sn获取客户服务器,会覆盖env设置',
		type: 'string'
	})
	.option('apiLog', {
		describe: '显示接口日志',
		default: false,
		type: 'boolean'
	})
	.help('h')
	.alias('h', 'help')
	.usage('Usage: mocha xxx.js [options]')
	.example('mocha test --env=adev3', 'adev3环境下运行test目录下所有用例')
	.argv;
// console.log(`argv = ${JSON.stringify(argv)}`);

const envName = argv.env;
caps.envName = envName;
if (envName) {
	if (envCaps[envName]) {
		Object.assign(caps, envCaps[envName]);
		caps.name = envName;
		caps.epid = argv.epid || envCaps[envName].epid;
	} else {
		console.error(`环境名称'${envName}'错误,请确认\n可使用环境:${Object.keys(envCaps)}`);
		process.exit();
	};
};


if (argv.myCaps) {
	caps = JSON.parse(fs.readFileSync(path.join(__dirname, './myCaps.json')));
};

if (argv.epid) {
	console.log(`当前登录帐套epid为:${argv.epid}`);
	caps.epid = argv.epid;
};

/**
 * 更新当前环境配置
 * @description 切换环境时使用
 * @param {object} params
 * @param {string} params.name 环境名称
 */
caps.updateEnvByName = params => {
	if (!envCaps[params.name]) {
		throw new Error(`更新环境失败,环境名称'${envName}'错误,请确认\n可使用环境:${Object.keys(envCaps)}`);
	};
	Object.assign(caps, envCaps[params.name]);
	caps.name = params.name;
};

caps.email = {
	service: 'qq', // 'smtp.163.com', smtp.qq.com
	user: 'luxx666@qq.com',
	pass: 'amnmxdwhhmiibigh',
};

module.exports = caps;