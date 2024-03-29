require('./global');

module.exports = {
    common: {
        ...require('./commonFc'),
        ...require('./assert.js'),
        ...require('./calculate.js'),
        ...require('./dateHandler.js'),
        ...require('./httpRequest.js'),
        ...require('./global.js'),
        ...require('./reqParam.js')
    }
    // ...require('./commonFc'),
    // ...require('./assert.js'),
    // ...require('./calculate.js'),
    // ...require('./dateHandler.js'),
    // ...require('./httpRequest.js'),
    // ...require('./global.js'),
    // ...require('./reqParam.js')
}

// module.exports = require('./common');
// module.exports = require('./assert.js');
// module.exports = require('./calculate.js');
// module.exports = require('./dateHandler.js');
// module.exports = require('./httpRequest.js');