require('dotenv').config();
const express = require('express');
const app = express();


//Page slug being used to retrieve the data for cleaner URLs.
app.get("/page/:pageName", async (req, res) => {
    const {pageName} = req.params;
    try{
        //Utilising wpapi for easier and cleaner calls to wordpress.
        const site = await require('wpapi').discover('http://localhost:8000/');
        try{
            const page = await site.pages().slug(pageName);
            //Checks if any data is returned by the call. If not, returns a 404.
            if(page.length){
                return res.json(page[0]);
            }
            return json(notFound);
        }catch(e){
            res.status(404);
		    return res.json("Requested page does not exist.");
        }
    } catch(e){
        res.status(500);
        return res.json("jo");
    }
});

const server = app.listen(process.env.PORT || 7001, () => {
    console.log("Started at http://localhost:%d\n", server.address().port);
  });