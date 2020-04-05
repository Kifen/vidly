const { expect } = require("chai");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

describe("User model", () => {
  const password = "password";

  it("should create a hash from user password", async () => {
    const user = new User();
    await user.setPassword(password);
    expect(user.password).to.be.a("string");
  });

  it("should retrun true if a correct password is passed", async () => {
    const user = new User();
    await user.setPassword(password);
    const result = await user.verifyPassword(password);
    expect(result).to.be.true;
  });

  it("should retrun false if an incorrect password is passed", async () => {
    const user = new User();
    await user.setPassword("passwordd");
    const result = await user.verifyPassword(password);
    expect(result).to.be.false;
  });

  it("should generate a valid json web token", done => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "Tom Hanks",
      isAdmin: true
    };

    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).to.deep.include(payload);
    done();
  });
});
