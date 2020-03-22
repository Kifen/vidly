require('winston-mongodb');
const winston = require('winston');
const appRoot = require('app-root-path');

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        prettyPrint: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        timeStamp: function () {
            return (new Date()).toLocaleDateString();
        }
    },
    mongo: {
        level: 'info',
        silent: true,
        db: 'mongodb://localhost/vidly',
        name: 'winston_mongoDB',
        tryReconnect: true,
        leaveConnectionOpen: false,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        timeStamp: function () {
            return (new Date()).toLocaleDateString();
        }
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    },
};

var logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.MongoDB(options.mongo),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green'
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;