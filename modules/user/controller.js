const { User } = require("../../models");
const _ = require("lodash");
const { sendJSONResponse } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists)
    return sendJSONResponse(
      res,
      400,
      null,
      req.method,
      "Account with this email already exists!"
    );

  const user = new User({ name, email });
  user.password = await user.setPassword(password);
  await user.save();
  const token = user.generateAuthToken();

  const data = {
    token,
    user: _.pick(user, ["_id", "name", "email"])
  };

  return sendJSONResponse(
    res,
    200,
    data,
    req.method,
    "User registration successfull"
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return sendJSONResponse(
      res,
      400,
      null,
      req.method,
      "Invalid email or password."
    );

  const validPassword = user.verifyPassword(user.password);
  if (!validPassword)
    return sendJSONResponse(
      res,
      404,
      req.method,
      null,
      "Invalid email or password"
    );

  const token = user.generateAuthToken();
  const data = {
    token,
    user: _.pick(user, ["name", "email"])
  };

  return sendJSONResponse(res, 200, data, req.method, "Login successfull!");
};

module.exports = {
  login,
  register
};
