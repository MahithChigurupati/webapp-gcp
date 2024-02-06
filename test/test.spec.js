const app = require("../api/app.js");
const request = require("supertest");

describe("Authentication Tests", () => {
  describe("Successes", () => {
    it("should check DB connection", (done) => {
      import("chai").then((chai) => {
        const expect = chai.expect;
        request(app)
          .get("/healthz")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
