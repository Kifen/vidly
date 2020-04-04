const { Genre } = require("../../models");
const chai = require("chai");
const mongoose = require("mongoose");
const chaiHttp = require("chai-http");
const app = require("../../app");
const dbHandler = require("../db-handler");

const { expect } = chai;

chai.use(chaiHttp);

describe("/api/genres", () => {
  const baseApi = "/api/genres";
  before(async () => {
    await dbHandler.connect();
  });

  after(async () => {
    await dbHandler.closeDatabase();
  });

  afterEach(async () => {
    await dbHandler.clearDatabase();
  });

  const getObjectId = id => {
    return mongoose.Types.ObjectId(id);
  };

  describe("GET /", () => {
    it("should return all genres", done => {
      const data = [{ genre: "genre1" }, { genre: "genre2" }];
      Genre.collection.insertMany(data);
      chai
        .request(app)
        .get(baseApi)
        .end((err, res) => {
          expect(res.status).eql(200);
          expect(res.body.data.genres.length).eql(2);
          done();
        });
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if id is valid", done => {
      const genre = new Genre({ genre: "genre1" });
      genre.save();
      chai
        .request(app)
        .get(`${baseApi}/${genre._id}`)
        .end((err, res) => {
          expect(res.status).eql(200);
          expect(res.body.data.genre.genre).eql("genre1");
          expect(getObjectId(res.body.data.genre._id)).eql(genre._id);
          done();
        });
    });

    it("should return 404 if id is invalid", done => {
      chai
        .request(app)
        .get(`${baseApi}/1`)
        .end((err, res) => {
          expect(res.status).eql(404);
          done();
        });
    });
  });

  describe("POST /", () => {
    it("should create a genre if req body is valid", done => {
      const body = { genre: "genre1" };
      chai
        .request(app)
        .post(baseApi)
        .send(body)
        .end((err, res) => {
          expect(res.status).eql(200);
          expect(res.body.data).to.have.property("genre");
          done();
        });
    });
  });

  describe("POST /", () => {
    it("should return 500 if req body is invalid", done => {
      const body = { name: "genre2" };
      chai
        .request(app)
        .post(baseApi)
        .send(body)
        .end((err, res) => {
          expect(res.status).eql(500);
          done();
        });
    });
  });

  describe("PUT /:id", () => {
    it("should update a genre if req body and id is valid", done => {
      const body = { genre: "genre2" };
      const genre = new Genre({ genre: "genre1" });
      genre.save();
      chai
        .request(app)
        .put(`${baseApi}/${genre._id}`)
        .send(body)
        .end((err, res) => {
          expect(res.status).eql(200);
          expect(res.body.data).to.have.property("genre");
          expect(res.body.message).eql("Genre updated successfully.");
          done();
        });
    });

    it("should return 404 if ID invalid", done => {
      const body = { name: "genre1" };
      chai
        .request(app)
        .put(`${baseApi}/1`)
        .send(body)
        .end((err, res) => {
          expect(res.status).eql(404);
          expect(res.body.message).eql("Invalid ID.");
          done();
        });
    });

    it("should return 500 if req body is invalid", done => {
      const body = { name: "genre1" };
      const genre = new Genre({ genre: "genre2" });
      genre.save();
      chai
        .request(app)
        .put(`${baseApi}/${genre._id}`)
        .send(body)
        .end((err, res) => {
          expect(res.status).eql(500);
          done();
        });
    });

    it("should return 404 if genre already exists", done => {
      const body = { genre: "genre1" };
      const genre = new Genre({ genre: "genre1" });
      genre.save();
      chai
        .request(app)
        .put(`${baseApi}/${genre._id}`)
        .send(body)
        .end((err, res) => {
          expect(res.status).eql(404);
          expect(res.body.message).eql(`Genre ${genre.genre} already exists.`);
          done();
        });
    });

    it("should return 404 if genre with valid id does not exists", done => {
      const id = "5e88c0a9e10a6a63969d1091";
      const body = { genre: "genre1" };
      chai
        .request(app)
        .put(`${baseApi}/${id}`)
        .send(body)
        .end((err, res) => {
          expect(res.status).eql(404);
          expect(res.body.message).eql(`Genre with given id ${id} not found.`);
          done();
        });
    });
  });

  describe("DELETE /", () => {
    it("should delete a genre if id is valid", done => {
      const genre = new Genre({ genre: "genre1" });
      genre.save();
      chai
        .request(app)
        .delete(`${baseApi}/${genre._id}`)
        .end((err, res) => {
          expect(res.status).eql(200);
          expect(res.body.message).eql(
            `Successfully deleted genre ${genre._id}.`
          );
          done();
        });
    });

    it("should return 404 if id is invalid", done => {
      const genre = new Genre({ genre: "genre1" });
      genre.save();
      chai
        .request(app)
        .delete(`${baseApi}/1`)
        .end((err, res) => {
          expect(res.status).eql(404);
          expect(res.body.message).eql("Invalid ID.");
          done();
        });
    });

    it("should return 404 if genre with valid id does not exists", done => {
      const id = "5e88c59a48a4376e71647c6b";
      chai
        .request(app)
        .delete(`${baseApi}/${id}`)
        .end((err, res) => {
          expect(res.status).eql(404);
          expect(res.body.message).eql(`Genre with id ${id} not found.`);
          done();
        });
    });
  });
});
