require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

//GET: Dynamic get using page-slug to retrieve page data from WP.
//JSON does not return data which isn't used by the react application.

app.get("/page/:pageName", async (req, res) => {
  const { pageName } = req.params;
  try {
    //Utilising wpapi for easier and cleaner calls to wordpress.
    const site = await require("wpapi").discover("http://localhost:8000/");
    //Issue wheree the wpapi call seems to hang if the slug does not exist.
    try {
      const page = await site.pages().slug(pageName);
      //Checks if any data is returned by the call. If not, returns a 404.
      if (page.length) {
        var newJson = {
          id: page[0].id,
          title: page[0].title.rendered,
          content: page[0].content.rendered,
        };
        return res.json(newJson);
      }
      //If the slug doesn't match a wordpress page.
      res.status(404);
      return res.json({
        error: "404 - This isn't the page you're looking for.",
      });
    } catch (e) {
      res.status(500);
      return res.json(e);
    }
  } catch (e) {
    res.status(500);
    return res.json(e);
  }
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
    //Get customised message from wordpress

    try {
      const site = await require("wpapi").discover("http://localhost:8000/");
      try {
        const page = await site.pages().slug("contact-us");
        let wpMessageResponse;
        if (page.length) {
          console.log(page[0]);
          //Return message from wordpress as a JSON also returns email.
          //Data would then be stored in a database but this wasn't required
          //in the provided scope.
          const responseMsg = {
            response: `${page[0].acf.contact_message_response}`,
            sentBy: req.body.email
          };
          res.json(responseMsg);
          res.status(404);
        }

        return res.json({
          error:
            "404 - Slug has been changed or the contact-us page has been deleted.",
        });
      } catch (error) {}
    } catch (err) {
      return next(e);
    }
  }
);

//Using dotenv package to store environment variables.
const server = app.listen(process.env.PORT || 7001, () => {
  console.log("Started at http://localhost:%d\n", server.address().port);
});
