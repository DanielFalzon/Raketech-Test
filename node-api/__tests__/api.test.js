require("dotenv").config();
const app = require("../src/api");
const request = require("supertest");

describe("Testing the API", () => {
  test("Successful request to /page endpoint", () => {
    return request(app)
      .get("/page/5")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("Test run when failing to retrieve page from wordpress", () => {
    return request(app)
      .get("/page/3")
      .then((response) => {
        expect(
          response.statusCode === 401 || response.statusCode == 404
        ).toBeTruthy();
      });
  });

  test("Successful post from contact form with valid body", () => {
    return request(app)
      .post("/post-message")
      .send({
        fullName: "Daniel Falzon",
        email: "danie.falzon@gmail.com",
        subject: "some sbject",
        message: "some message",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("response");
        expect(response.body).toHaveProperty("sentBy");
      });
  });

  test("Failed post from contact form with an invalid email.", () => {
    return request(app)
      .post("/post-message")
      .send({
        fullName: "Daniel Falzon",
        email: "danie.falzon",
        subject: "some sbject",
        message: "some message",
      })
      .then((response) => {
        let Obj = {
          value: "danie.falzon",
          msg: "Invalid value",
          param: "email",
          location: "body",
        };

        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0]).toMatchObject(Obj);
      });
  });
});
