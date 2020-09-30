'use strict';
const caps = require('../data/caps');
// const format = require('../data/format.js');
const superagent = require('superagent');
const moment = require('moment');
const qs = require('qs');
const {
    string
} = require('yargs');
const {
    slice,
    functions
} = require('lodash');

/**
 * 请求类方法
 * 合并到lib/common中
 * @module httpRequest
 */
let httpRequest = module.exports = {};

/**
 * 生成cliReqId 拱服务端查询日志
 */
function getCliReqId() {
    return `auto${Date.now()}${_.random(100000, 999999)}`;
};

/**
 * callInterface - /slh/callInterface.do
 * @alias module:httpRequest
 * @async
 * @param {string} interfaceid 接口id
 * @param {Object} params      接口参数
 * @param {Object} params.check   是否需要断言 默认否
 * @return {Object} 请求结果
 */
httpRequest.callInterface = async function (interfaceid, params) {
    params.interfaceid = interfaceid;
    params.check = params.hasOwnProperty('check') ? params.check : false;
    const res = await httpRequest.callInterface2(params);
    // console.log('interfaceid:%j', res);
    return res.result;
};

httpRequest.callInterface2 = async function (params) {
    params = Object.assign({
        'epid': caps.epid,
        'slh_version': caps.slhVersion,
        'testTaskId': caps.testTaskId,
    }, params);
    return httpRequest.post('/slh/callInterface.do', params);
};


httpRequest.sendPost = async function (url, search) {
    let params = search;
    let res = {},
        body = {},
        reqUrl = '';
    // if (!url.includes('http')) {
    //     url = `${url}`;
    // };
    // const req = setUrlSearchParams(url, params);
    if (typeof (params) == 'object') {
        for (let key in params) {
            if (typeof (params[key]) == 'object') {
                body[key] = JSON.stringify(params[key]);
            } else {
                body[key] = params[key];
            };
        };
    } else {
        body.search = JSON.stringify(params)
    }

    reqUrl = decodeURI(url);

    const time = Date.now();
    // await superagent.post(req.url.href)
    await superagent.post(url)
        .timeout(0)
        // .type('application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('platformType', 1)
        .set('udid', 'divice-liker365')
        .set('tkn', 'yx001')
        .send(body)
        .redirects(2) // 跟随重定向
        .then((response) => {
            // response.status
            // console.log(response);
            res = JSON.parse(JSON.stringify(response));
        })
        .catch((err) => {
            // err.message, err.response
            // console.log(`err=${JSON.stringify(err)}`);
            logReqErrMsg({
                err,
                reqUrl
            });
        });
    // clearTimeout(t);

    const duration = Date.now() - time;
    // console.log(res.text);
    let result;
    try {
        result = JSON.parse(res.text);
    } catch (error) {
        result = res.text
    }

    res.header.date = moment().utc(res.header.date).format('YYYY-MM-DD HH:mm:ss');
    if ((result.code < 0 || result.hasOwnProperty('error'))) {
        throw new Error(`opTime:${res.header.date}\n\turl:${reqUrl}\n\tbody:${JSON.stringify(body)}\n\tresult:${res.text}`);
    };

    BASICDATA.url = reqUrl;
    return {
        reqUrl,
        params,
        result,
        opTime: res.header.date,
        duration
    };
}

httpRequest.sendGet = async function (url, params) {
    // console.log(params);
    let json = ''
    if (params) {
        let arr1 = Object.keys(params);
        // console.log(arr1);
        // let arr2 = Object.values(params);
        for (let k of arr1) {
            // console.log(k);
            json += `${k}=${params[k]}&`
        }

        json = json.slice(0, json.length - 1)

    }

    let res, req;
    req = url + json
    // console.log('req', req);
    const time = Date.now();
    // await superagent.post(req.url.href)
    await superagent.get(req)
        .timeout(0)
        .type('application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('platformType', 1)
        .set('udid', 'divice-liker365')
        .set('tkn', 'yx001')
        .redirects(3) // 跟随重定向
        .then((response) => {
            // response.status
            // console.log(response);
            res = JSON.parse(JSON.stringify(response));
        })
        .catch((err) => {
            console.log(err);
        });

    const duration = Date.now() - time;
    // console.log(res.text);

    return {
        // req,
        res
    };
}

httpRequest.evalPost = async function (url, search) {
    let params = search;
    let res = {},
        body = {},
        reqUrl = '';
    // if (!url.includes('http')) {
    //     url = `${url}`;
    // };
    // const req = setUrlSearchParams(url, params);
    if (typeof (params) == 'object') {
        for (let key in params) {
            if (typeof (params[key]) == 'object') {
                body[key] = JSON.stringify(params[key]);
            } else {
                body[key] = params[key];
            };
        };
    } else {
        body.search = JSON.stringify(params)
    }

    reqUrl = decodeURI(url);

    const time = Date.now();
    const agent = superagent.agent();
    await agent.post(url)
        .timeout(0)
        .set('Accept', 'text/plain, text/html,application/json')
        .set('udid', 'yace')
        .set('tkn', 'yx001')
        .set('device', 'iPhone11')
        // .set('Access-Control-Allow-Origin', 'http://crm.51bm.net.cn')
        // .set('Cookie', params.ticket)
        .send(body)
        // .redirects(2) // 跟随重定向
        .then((response) => {
            // response.status
            // console.log(response);
            res = JSON.parse(JSON.stringify(response));
            // console.log(res);
            // return agent.post(url)
        })
        .catch((err) => {
            // err.message, err.response
            // console.log(`err=${JSON.stringify(err)}`);
            logReqErrMsg({
                err,
                reqUrl
            });
        });
    // clearTimeout(t);

    const duration = Date.now() - time;
    // console.log(res.text);
    let result;
    try {
        result = JSON.parse(res.text);
    } catch (error) {
        result = res.text
    }

    res.header.date = moment().utc(res.header.date).format('YYYY-MM-DD HH:mm:ss');
    if ((result.code < 0 || result.hasOwnProperty('error'))) {
        throw new Error(`opTime:${res.header.date}\n\turl:${reqUrl}\n\tbody:${JSON.stringify(body)}\n\tresult:${res.text}`);
    };

    BASICDATA.url = reqUrl;
    return {
        reqUrl,
        params,
        result,
        opTime: res.header.date,
        duration
    };
}

httpRequest.sendGet = async function (url, params) {
    // console.log(params);
    let json = ''
    if (params) {
        let arr1 = Object.keys(params);
        // console.log(arr1);
        // let arr2 = Object.values(params);
        for (let k of arr1) {
            // console.log(k);
            json += `${k}=${params[k]}&`
        }

        json = json.slice(0, json.length - 1)

    }

    let res, req;
    req = url + json
    // console.log('req', req);
    const time = Date.now();
    // await superagent.post(req.url.href)
    await superagent.get(req)
        .timeout(0)
        .type('application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('platformType', 1)
        .set('udid', 'divice-liker365')
        .set('tkn', 'yx001')
        .redirects(3) // 跟随重定向
        .then((response) => {
            // response.status
            // console.log(response);
            res = JSON.parse(JSON.stringify(response));
        })
        .catch((err) => {
            console.log(err);
        });

    const duration = Date.now() - time;
    // console.log(res.text);

    return {
        // req,
        res
    };
}

function setUrlSearchParams(url, search) {
    const myURL = new URL(url);

    return {
        url: myURL,
        search
    };
};

httpRequest.post = async function (url, search) {
    let params = _.cloneDeep(search);
    let res = {},
        body = {},
        reqUrl = '',
        check = params.hasOwnProperty('check') ? params.check : true;
    delete params.check;

    if (!url.includes('http')) {
        url = `${caps.url}${url}`;
    };
    const req = setUrlSearchParams(url, params);
    for (let key in params) {
        if (typeof (params[key]) == 'object') {
            body[key] = JSON.stringify(params[key]);
        } else {
            body[key] = params[key];
        };
    };
    reqUrl = decodeURI(req.url);
    const time = Date.now();
    await superagent.post(req.url.href)
        .timeout(0)
        .type('form')
        .set('platformType', 1)
        .set('udid', 'divice-liker365')
        .set('tkn', 'yx001')
        .send(body)
        .then((response) => {
            // response.status
            // console.log(response);

            res = JSON.parse(JSON.stringify(response)); //
        }).catch((err) => {
            // err.message, err.response
            // console.log(`err=${JSON.stringify(err)}`);
            logReqErrMsg({
                err,
                reqUrl
            });
        });
    // clearTimeout(t);

    const duration = Date.now() - time;
    // console.log(res.text);
    let result;
    try {
        result = JSON.parse(res.text);
    } catch (error) {
        result = res.text
    }

    res.header.date = moment().utc(res.header.date).format('YYYY-MM-DD HH:mm:ss');
    if (check && (result.code < 0 || result.hasOwnProperty('error'))) {
        throw new Error(`opTime:${res.header.date}\n\turl:${reqUrl}\n\tbody:${JSON.stringify(body)}\n\tresult:${res.text}`);
    };

    BASICDATA.url = reqUrl;
    return {
        reqUrl,
        params,
        result,
        opTime: res.header.date,
        duration
    };
};

httpRequest.logSlowMsg = function ({
    reqUrl,
    duration
}) {
    // if (duration > 7000) {
    // 	console.log(`请求响应较慢:${reqUrl}\n持续时间:${duration}`);
    // }
};


httpRequest.postH5 = async function (url, params = {}) {
    console.log('参数', params);
    const sendBody = {
        data: JSON.stringify(params.data),
        ticket: params.ticket
    }
    console.log('请求参数', sendBody);
    await superagent.post(url)
        .timeout(0)
        .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('tkn', 'yx001')
        .set('yks', '1')
        .set('platformType', 1)
        .send(sendBody)
        .then((response) => {
            console.log(response.text);
        }).catch((err) => {
            // err.message, err.response
            throw new Error(`请求失败:\n${JSON.stringify(err)}`);
        });
};

httpRequest.get = async function (url, search) {
    let params = _.cloneDeep(search);
    let res = {},
        body = {},
        reqUrl = '',
        check = params.hasOwnProperty('check') ? params.check : true;
    delete params.check;
    if (!url.includes('http')) {
        url = `${caps.url}${url}`;
    };
    const req = setUrlSearchParams(url, params);
    for (let key in params) {
        if (typeof (params[key]) == 'object') {
            body[key] = JSON.stringify(params[key]);
        } else {
            body[key] = params[key];
        };
    };
    reqUrl = decodeURI(req.url);

    const time = Date.now();
    // const t = setTimeout(() => {
    // 	console.log(`\nopTime:${moment(time).format('YYYY-MM-DD HH:mm:ss')}\n请求响应慢:${reqUrl}`);
    // }, 10000);
    await superagent.get(req.url.href)
        .timeout(0)
        .type('form')
        .query(body)
        .then((response) => {
            // if (params.apiKey == 'ec-spchb-dresShopShare-getDresShareQrCodeBase64') {
            // 	console.log(decodeURI(res.req.url));
            // };
            res = JSON.parse(JSON.stringify(response)); //
        }).catch((err) => {
            // err.message, err.response
            // err.req.url = decodeURI(err.req.url);
            logReqErrMsg({
                err,
                reqUrl
            });
        });
    const duration = Date.now() - time,
        result = JSON.parse(res.text);
    res.header.date = moment().utc(res.header.date).format('YYYY-MM-DD HH:mm:ss');
    if (check && (result.code < 0 || result.hasOwnProperty('error'))) {
        // throw new Error(`opTime:${res.header.date}\n\turl:${reqUrl}\n\tresult:${res.text}`);
        throw new Error(`opTime:${res.header.date}\n\turl:${reqUrl}\n\tbody:${JSON.stringify(body)}\n\tresult:${res.text}`);
    };
    httpRequest.logSlowMsg({
        reqUrl,
        duration
    });
    return {
        reqUrl,
        params,
        result,
        opTime: res.header.date,
        duration
    };
};

function decodeURI(encodedUrl) {
    return decodeURIComponent(encodedUrl); // .replace(/\+/g, ' ')
};

function logReqErrMsg({
    err,
    reqUrl
}) {
    if (!err.response) {
        throw new Error(`请求失败:\n\turl:${reqUrl}\n\tresult:${JSON.stringify(err)}`);
    }
    const response = JSON.parse(JSON.stringify(err)).response;
    // \n\t text: ${response.text || ''}
    throw new Error(`请求失败:\n\t opTime:${moment().utc(response.header.date).format('YYYY-MM-DD HH:mm:ss')}\n\t url:${response.req.url}\n\t data:${JSON.stringify(response.req.data || '')}\n\t status: ${response.status}`);
};

httpRequest.superagent = superagent;

/**
 * setGlobalParam - 修改单个全局参数
 * @alias module:httpRequest
 * @async
 * @param {string}    code         参数代码
 * @param {string}    val          参数值
 * @param {boolean} [check=true] 断言 参数修改是否成功
 * @return {object} check=false时,返回请求结果 {val:ok}
 */
httpRequest.setGlobalParam = async function (code, val, check = true) {
    let paramReturn = await httpRequest.callInterface('cs-param', {
        'code': code,
        'val': val
    });
    if (check) {
        expect(paramReturn, `修改系统参数${code}:${val}失败,reason:${JSON.stringify(paramReturn)}`).to.includes({
            val: 'ok'
        });
    } else {
        return paramReturn;
    };
};

/**
 * setGlobalParams - 批量保存系统参数
 * @alias module:httpRequest
 * @async
 * @param {array} paramsArr [{code,val},{code,val}]
 */
httpRequest.setGlobalParams = async function (paramsArr) {
    for (let i = 0, length = paramsArr.length; i < length; i++) {
        await httpRequest.setGlobalParam(paramsArr[i].code, paramsArr[i].val);
    };
};

/**
 * getResults - 获取接口返回结果
 * @alias module:httpRequest
 * @async
 * @param {object} obj {interfaceid:param}
 * @return {object} {interfaceid:result}
 */
httpRequest.getResults = async function (obj) {
    let json = {};
    let promises = _.mapValues(obj, (value, key) => {
        let today = value.today == true ? true : false;
        delete value.today;
        let param = key.includes('ql-') ? format.qlParamsFormat(value, today) : value;
        // if(key == 'ql-1209') console.log(`param = ${JSON.stringify(param)}`);
        return httpRequest.callInterface(key, param);
    });
    let keys = Object.keys(promises);
    let results = await Promise.all(Object.values(promises));
    keys.forEach((key, index) => {
        if (results[index].error) {
            obj[key].interfaceid = key;
            throw new Error(`接口${key}请求失败:\n\tparams:${JSON.stringify(obj[key])}\n\tresult:${JSON.stringify(results[index])}`);
        };
        json[key] = results[index];
    });
    return json;
};


/**
 * editBilling - 新增单据
 * @alias module:httpRequest
 * @async
 * @param {object}    jsonparam    sf接口的jsonparam 需要含interfaceid
 * @param {boolean} [check=true] 是否需要断言
 * @return {object} {params:jsonparam,result:结果,duration:持续时间(ms)}
 */
httpRequest.editBilling = async function (jsonparam, check = true) {
    jsonparam = format.jsonparamFormat(_.cloneDeep(jsonparam));
    let time = Date.now();
    let result = await httpRequest.callInterface(jsonparam.interfaceid, {
        jsonparam,
        check
    });
    let duration = Date.now() - time;

    // 开单成功后添加延迟,等待qf,ql接口的数据同步
    if (USEECINTERFACE == 2) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (jsonparam.interfaceid == 'sf-1924-1') result.orderno = result.billno;
    };

    return {
        params: jsonparam,
        result,
        duration,
    };
};