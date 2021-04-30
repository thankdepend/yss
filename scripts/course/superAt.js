/**
 * node没有很好的接口请求库，所以为了实现接口测试目的，
 * 我们要用到第三方的接口请求依赖库
 * 可选的axios|ajax，不过因为mocha框架对superAgent支持比较好，所以我们用的superAgent
 */

/** 这是一个经过本土化的请求方法，在平时，我们不需要去管它，只需要传递参数给它就行了 */
async function sendPost (url, search) {
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