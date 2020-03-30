const { User } = require("../../models");
const _ = require("lodash");
const { sendJSONResponse } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password, isAdmin, phone, isGold } = req.body;
  const exists = await User.findOne({ email });
  if (exists)
    return sendJSONResponse(
      res,
      400,
      null,
      req.method,
      "Account with this email already exists!"
    );

  const user = new User({ name, email, isAdmin, phone, isGold });
  user.password = await user.setPassword(password);
  await user.save();
  const token = user.generateAuthToken();

  const data = {
    token,
    user: _.pick(user, ["_id", "name", "email", "isGold", "isAdmin", "phone"])
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

  const validPassword = await user.verifyPassword(password);
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

const getUsers = async (req, res) => {
  const users = await User.find().sort("name");
  return sendJSONResponse(res, 200, { users }, req.method, "Success");
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).sort("name");
  if (!user)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Genre with id ${req.params.id} not found`
    );

  return sendJSONResponse(res, 200, { user: user }, req.method, "Success");
};

const updateUser = async (req, res) => {
  ({ ...body } = req.body);
  console.log(body);
  const user = await User.findByIdAndUpdate(req.params.id, body, {
    new: true
  });
  if (!user)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Customer with given id ${req.params.id} not found...`
    );
  sendJSONResponse(
    res,
    200,
    { user: user },
    req.method,
    "User updated successfully."
  );
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `User with id ${req.params.id} not found...`
    );

  return sendJSONResponse(
    res,
    200,
    { user: user },
    req.method,
    `Deleted user with id ${req.params.id}`
  );
};

module.exports = {
  login,
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
