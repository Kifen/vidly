const express = require("express");
const winston = require("./startup/logging");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Server listening on port ${port}`));

module.exports = app;
