const nConfig = require('nconf');

nConfig.argv().env().file({
    file: `${__dirname}/../config.json`,
});

module.exports = nConfig;
