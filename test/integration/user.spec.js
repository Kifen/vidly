const chaiHttp = require("chai-http");
const chai = require("chai");
const mongoose = require("mongoose");
const app = require("../../app");
const dbHandler = require("../test_handler");
const { User } = require("../../models");

const { expect } = chai;
chai.use(chaiHttp);

describe("/api/users", () => {
  const baseApi = "/api/users";
  before(() => {
    dbHandler.connect();
  });

  after(() => {
    dbHandler.closeDatabase();
  });

  afterEach(() => {
    dbHandler.clearDatabase();
  });
});
