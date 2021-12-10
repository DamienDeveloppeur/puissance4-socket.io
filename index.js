const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");

console.log("test")

app.get("/", (req,res, next) => {
    fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        return res.send(text);
    });
    
});
// fourni par heroku : process.env.port
app.listen(port, () => {
    console.log("App running on port :" + port)
})

// location.reload();