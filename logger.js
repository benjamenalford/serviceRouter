const bunyan = require('bunyan');
const config = require('./config').config;

//var log = bunyan.createLogger({ name: 'SeeClickFixLogger' });
exports.log = bunyan.createLogger({
    name: config.appName,
    streams: [{
            level: 'info',
            //stream: process.stdout,
            path: './logs/ephemera-debug.log'
        },
        {
            level: 'error',
            //stream: process.stdout,
            path: './logs/ephemera-debug.log'
        },
        {
            level: 'debug',
            //stream: process.stdout,
            path: './logs/ephemera-debug.log' //get from config
        }
    ],
    level: 'info'
});