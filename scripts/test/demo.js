const { expect } = require("chai");
const superagent = require('superagent')
const moment = require('moment')
function add (a, b) {
    return a + b
}

describe.skip('分享测试', function () {
    it('加法测试', function () {
        const res = add(1, 2);
        console.log(res);
        expect(4).to.be.equal(res)
    });
});

async function post (url, search) {
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

    return {
        reqUrl,
        params,
        result,
        duration
    };
}

describe('分享测试', async function () {
    it('登录接口测试', async function () {
        const res = await post('http://51bm.user.net.cn', {
            loginName: 'mihuan1',
            password: 'Csk001'
        })
        console.log(res);
    });
});

