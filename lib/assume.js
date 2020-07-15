
module.exports = {
    assume: function assume(assertion) {
        return () => {
            try {
                assertion();
            } catch (err) {
                return err.message;
            }
            return null;
        };
    },
    /**
     * 根据条件动态跳过用例
     * @description 根据条件动态跳过用例
     * @param {function|boolean} assumption 断言
     * @param {string} message 跳过提示
     */
    assuming: function (assumption, message = '') {
        let itFunction = (str, fn) => it.skip(`${str}-SKIPPED-${message}`, fn);
        if (typeof assumption === 'function') {
            const result = this.assume(assumption)();
            if (result == null) {
                itFunction = it;
            } else {
                if (message === '') {
                    message = `(${result})`;
                } else {
                    message = `(${message})`;
                }
            }
        } else {
            if (assumption === true) {
                itFunction = it;
            } else if (message !== '') {
                message = `(${message})`;
            }
        }
        return itFunction;
    },

};
