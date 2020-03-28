const jwt = require("jsonwebtoken");
const config = require("config");
const { sendJSONResponse } = require("../helpers");

const authenticate = (req, res, next, isAdmin) => {
  const token = req.headers.authorization;
  if (!token)
    return sendJSONResponse(
      res,
      401,
      null,
      req.method,
      "Authentication failed. Provide an authentication token."
    );

  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    if (!isAdmin) return next();
    else {
      if (!req.user.isAdmin)
        return sendJSONResponse(res, 403, null, req.method, "Access denied");
      next();
    }
  } catch (ex) {
    return sendJSONResponse(
      res,
      400,
      null,
      req.method,
      "Authentication failed."
    );
  }
};

const authenticateUser = (req, res, next) => {
  authenticate(req, res, next, false);
};

const authenticateAdmin = (req, res, next) => {
  authenticate(req, res, next, true);
};

module.exports = {
  authenticateUser,
  authenticateAdmin
};
