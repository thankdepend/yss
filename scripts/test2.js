const name = require('../../data/caps').name;

const account = {
    yss_test: {
        prob_user1: {
            loginName: '330325',
            passWord: 'Csk001',
            device: 'm'
        },
        prob_user2: {
            loginName: '330340',
            passWord: 'Csk001',
            device: 'm'
        }
    },
}

module.exports = account[name];