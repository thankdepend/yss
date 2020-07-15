const name = require('../../data/caps').name;

/**
    测试账号
 */

const account = {
    test: {
        user1: {
            loginName: '330325',
            passWord: 'Csk001',
            device: 'm'
        },
        user2: {
            loginName: '330340',
            passWord: 'Csk001',
            device: 'm'
        }
    },
    pre: {
        user: {
            loginName: 'dingding001',
            passWord: 'Ysk001',
            device: 'm'
        },
        user2: {
            loginName: 'dingding002',
            passWord: 'Ysk001',
            device: 'm'
        },
    },
    online: {}
};

module.exports = account;

// module.exports = account[name];