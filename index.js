//import important packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { json } = require("body-parser");
//initialize express
const app = express();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.listen(PORT, () => console.log("server running on port " + PORT));