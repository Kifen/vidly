require("./models/db")();
const express = require("express");
const app = express();
const logger = require("./helpers/logger");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(
    `Server listening on port ${port}, and running in ${process.env.NODE_ENV} environment...`
  );
});

module.exports = app;
