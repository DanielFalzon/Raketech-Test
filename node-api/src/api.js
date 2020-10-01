require("dotenv").config();
const express = require("express");
var cors = require('cors');
const app = express();

app.use(cors({origin: '*'}));

//Page slug being used to retrieve the data for cleaner URLs.
app.get("/page/:pageName", async (req, res) => {
  const { pageName } = req.params;
  try {
    //Utilising wpapi for easier and cleaner calls to wordpress.
    const site = await require("wpapi").discover("http://localhost:8000/");
    try {
      const page = await site.pages().slug(pageName);
      //Checks if any data is returned by the call. If not, returns a 404.
      if (page.length) {
        var newJson = {
          id: page[0].id,
          title: page[0].title.rendered,
          content: page[0].content.rendered
        };
        return res.json(newJson);
      }
      return json(notFound);
    } catch (e) {
      res.status(500);
      return res.json(e);
    }
  } catch (e) {
    res.status(500);
    return res.json(e);
  }
});

//Using dotenv package to store environment variables.
const server = app.listen(process.env.PORT || 7001, () => {
  console.log("Started at http://localhost:%d\n", server.address().port);
});
