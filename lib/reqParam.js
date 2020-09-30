const reqParam = module.exports = {}

/**
 * @alias yssApp请求参数序列化
 * @param {*} params 
 */
reqParam.yssAppJson = (params = {}) => {
    return {
        data: {
            m: "",
            p: Object.assign({}, params)
        },
        ticket: TICKET
    }
}