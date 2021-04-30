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
function getCliReqId () {
    return `auto${Date.now()}${_.random(100000, 999999)}`;
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
        // .set('udid', 'yace')
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
    if ((result.success == false)) {
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
        .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
        // .set('Content-Type', 'application/json;charset=utf-8')
        // .set('Content-Type', 'multipart/form-data;charset=utf-8')
        // .set('Content-Type', 'text/plain, text/html,application/json')
        .set('udid', 'divice-liker365')
        .set('tkn', 'yx001')
        // .set('device', 'm')
        // .set('device', 'iPhone11')
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

httpRequest.sendOlinePost = async function (url, search) {
    let params = search;
    let res = {},
        body = {},
        reqUrl = '';
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
        // .set(' User-Agent', 'yks_andr10_v3683_w1080*2159_EMLAL00_WIFI_nan_nan')
        .set('Accept', 'application/json')
        .set('platformType', '1')
        // .set('master', '1')
        .set('yks', '1')
        .set('tkn', 'yx001')
        .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
        // .set('X-Requested-With', 'XMLHttpRequest')
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

function setUrlSearchParams (url, search) {
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

function decodeURI (encodedUrl) {
    return decodeURIComponent(encodedUrl); // .replace(/\+/g, ' ')
};

function logReqErrMsg ({
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