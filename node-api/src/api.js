const express = require('express');
const app = express();

app.get("/page/:pageName", async (req, res) => {
    const {pageName} = req.params;
    try{
        const site = await require('wpapi').discover('http://localhost:8000/');
        try{
            const page = await site.pages().slug(pageName);
            if(page.length){
                return res.json(page[0]);
            }
            return json(notFound);
        }catch(e){
            res.status(500);
		    return res.json(e);
        }
    } catch(e){
        res.status(500);
        return res.json(e);
    }
});

const server = app.listen(7000, () => {
    console.log("Started at http://localhost:%d\n", server.address().port);
  });