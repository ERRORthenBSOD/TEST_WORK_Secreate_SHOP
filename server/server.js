require('express-async-errors');
const express = require('express');
const app = express();

const config = require('./connectors/config');
require('./startup/middleware')(app); // Middleware
require('./startup/errorsLog')(app); // Logs
require('./startup/routes')(app); // Routers
require('./startup/tasks')(app); // Tasks

app.set('port', config.get('express:port'));

app.listen(app.get('port'), () => {
    console.log('\x1b[35m' + ' start listening at %s port', app.get('port'));
});



module.exports = app;