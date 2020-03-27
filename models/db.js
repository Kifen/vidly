const mongoose = require("mongoose");
const logger = require("../helpers/logger");
const config = require("config");

module.exports = () => {
  const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(config.get("db"), options);

  if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", true);
  }

  mongoose.connection.on("connected", () => {
    logger.debug(`Connected to mongoDB: <${config.get("db")}>`);
  });

  mongoose.connection.on("error", e => {
    logger.error(e.message, err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.info("Disconnected from mongoDB...");
  });
};
