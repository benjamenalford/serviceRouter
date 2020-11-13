const bunyan = require('bunyan');
const config = require('./config').config;

//var log = bunyan.createLogger({ name: 'SeeClickFixLogger' });
exports.log = bunyan.createLogger({
    name: 'SeeClickFixLogger',
    streams: [{
            level: 'info',
            stream: process.stdout,
        },
        {
            level: 'error',
            stream: process.stdout,
        },
        {
            level: 'debug',
            stream: process.stdout,
            //path: './logs/seeClick-debug.log' //get from config
        }
    ],
    level: 'info'
});