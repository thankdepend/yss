require('./global');

module.exports = {
    common: {
        ...require('./common'),
        ...require('./assert.js'),
        ...require('./calculate.js'),
        ...require('./dateHandler.js'),
        ...require('./httpRequest.js')
    }
}

// module.exports = require('./common');
// module.exports = require('./assert.js');
// module.exports = require('./calculate.js');
// module.exports = require('./dateHandler.js');
// module.exports = require('./httpRequest.js');