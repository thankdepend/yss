const name = require('../../data/caps').name;

/**
    测试账号
 */

const account = {
    test: {
        user1: {
            loginName: '330325',
            password: 'Csk001',
            device: 'm'
        },
        user2: {
            loginName: '330340',
            password: 'Csk001',
            device: 'm'
        },
        kf: {
            loginName: 'kf01',
            password: 'Csk001'
        },
        ptzg: {
            loginName: 'mh01',
            password: 'Csk001'
        },
        yyzg: {
            loginName: 'yyzg',
            password: 'csk001'
        },
        lxyy: {
            loginName: 'lxyy',
            password: 'Csk001'
        }
    },
    pre: {
        user1: {
            loginName: 'dingding001',
            password: 'Ysk001',
            device: 'm'
        },
        user2: {
            loginName: 'dingding002',
            password: 'Ysk001',
            device: 'm'
        },
        kf: {
            loginName: 'kf01',
            password: 'Ysk002'
        },
        ptzg: {
            loginName: 'mh02',
            password: 'Ysk002'
        },
        yyzg: {
            loginName: 'yyzg',
            password: 'Ysk002'
        },
        lxyy: {
            loginName: 'lxyy01',
            password: 'Ysk002'
        }
    },
    online: {}
};

module.exports = account;

// module.exports = account[name];