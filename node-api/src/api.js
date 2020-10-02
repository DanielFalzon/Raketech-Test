const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

//GET: Dynamic get using page-slug to retrieve page data from WP.
//JSON does not return data which isn't used by the react application.

app.get("/page/:pageId", async (req, res) => {
  const { pageId } = req.params;

  axios
    .get(`http://localhost:8000/wp-json/wp/v2/pages/${pageId}`)
    .then((page) => {
      if (page.data) {
        var newJson = {
          id: page.data.id,
          title: page.data.title.rendered,
          content: page.data.content.rendered,
        };
        return res.json(newJson);
      }
      return res.json({
        error: `No content has been found for page with ID ${pageId}`,
      });
    })
    .catch((err) => {
      res.status(err.response.status);
      return res.json({ error: `Axios: ${err.response.statusText}` });
    });
});

//POST: Body will contain form data posted in the contact form.
//Content is validated and a success message is retrieved from wordpress and sent to the user.
app.post(
  "/post-message",
  [
    //Validation middleware via express-validator
    body("fullName").notEmpty(),
    body("email").isEmail(),
    body("subject").notEmpty(),
    body("message").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    axios
      .get(`http://localhost:8000/wp-json/wp/v2/pages/5`)
      .then((page) => {
        if (page.data) {
          const responseMsg = {
            response: `${page.data.acf.contact_message_response}`,
            sentBy: req.body.email,
          };
          return res.json(responseMsg);
        }
        return res.json({
          error: `No content has been found for page with ID ${pageId}`,
        });
      })
      .catch((err) => {
        if (err.response.satus) {
          res.status(err.response.status);
          return res.json({ error: `Axios: ${err.response.statusText}` });
        }
        res.status(500);
        return res.json({ error: `Internal server error.` });
      });
  }
);

module.exports = app;
