const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, maxLenght: 25, required: true },
  email: { type: String, unique: true, trim: true },
  password: { type: String, minLength: 8, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  phone: { type: String, max: 12, required: true },
  isGold: { type: Boolean, default: false }
});

userSchema.index({
  name: 1,
  email: 1
});

userSchema.index({
  name: "text",
  email: "text"
});

userSchema.methods.setPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};

userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
