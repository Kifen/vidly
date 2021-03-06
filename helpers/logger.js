require("winston-mongodb");
const winston = require("winston");
const appRoot = require("app-root-path");
const config = require("config");

var options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    silent: `${config.get("logger")}`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    prettyPrint: true,
    colorize: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    timeStamp: function() {
      return new Date().toLocaleDateString();
    }
  },
  mongo: {
    level: "info",
    silent: `${config.get("logger")}`,
    db: "mongodb://localhost/vidly",
    name: "winston_mongoDB",
    tryReconnect: true,
    leaveConnectionOpen: false,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    timeStamp: function() {
      return new Date().toLocaleDateString();
    }
  },
  console: {
    level: "debug",
    handleExceptions: true,
    silent: `${config.get("logger")}`,
    json: true,
    colorize: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }
};

let logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.MongoDB(options.mongo),
    new winston.transports.Console(options.console)
  ],
  exitOnError: true // do not exit on handled exceptions
});

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green"
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

process.on("unhandledRejection", ex => {
  throw ex;
});

module.exports = logger;
