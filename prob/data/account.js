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
        },
        kf: {
            loginName: 'kf01',
            password: 'Csk001'
        },
        ptzg: {
            loginName: 'mh01',
            password: 'Csk001'
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
        kf: {
            loginName: 'kf01',
            password: 'Ysk002'
        },
        ptzg: {
            loginName: 'mh01',
            password: 'Ysk002'
        }
    },
    online: {}
};

module.exports = account;

// module.exports = account[name];