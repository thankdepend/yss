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
        zyzg: {
            loginName: 'zyzg001',
            password: 'Csk001'
        },
        cbyy: {
            loginName: 'cbyy01',
            password: 'Csk001'
        },
        yyzg: {
            loginName: 'yyzg',
            password: 'csk001'
        },
        lxyy: {
            loginName: 'lxyy',
            password: 'Csk001'
        },
        // 系统管理员
        crm: {
            loginName: 'zyzg001',
            password: 'Csk001'
        },
        // “留学”机构管理员
        crm2: {
            loginName: 'zyzg-mh3',
            password: 'Csk001'
        },
        kfList: [
            {
                loginName: 'kf01',
                password: 'Csk001'
            },
            {
                loginName: 'kf02',
                password: 'Csk001'
            },
            {
                loginName: 'kf03',
                password: 'Csk001'
            },
            {
                loginName: 'kf04',
                password: 'Csk001'
            },
            {
                loginName: 'kf05',
                password: 'Csk001'
            },
        ]

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
        zyzg: {
            loginName: 'zyzg',
            password: 'Ysk002'
        },
        cbyy: {
            loginName: 'cbyy001',
            password: 'Ysk002'
        },
        yyzg: {
            loginName: 'yyzg',
            password: 'Ysk002'
        },
        lxyy: {
            loginName: 'lxyy01',
            password: 'Ysk002'
        },
        crm2: {
            loginName: 'lxyy01',
            password: 'Ysk002'
        }
    },
    dev: {
        kf: {
            loginName: 'kf01',
            password: 'Kfk001'
        },
        ptzg: {
            loginName: 'SHUWA',
            password: 'Csk001'
        },
        zyzg: {
            loginName: 'zyzg',
            password: 'Ysk002'
        },
        cbyy: {
            loginName: 'cbyy001',
            password: 'Ysk002'
        },
        yyzg: {
            loginName: 'yyzg',
            password: 'Ysk002'
        },
        lxyy: {
            loginName: 'lxyy01',
            password: 'Ysk002'
        },
    },
    online: {}
};

module.exports = account;

// module.exports = account[name];