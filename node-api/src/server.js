require("dotenv").config();
const app = require("./api");

app.listen(process.env.PORT || 7001, () => {
    console.log("Started at server started.");
});