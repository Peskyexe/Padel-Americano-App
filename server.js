const express = require("express");
const app = express();
const path = require('path');
const { readFile, writeFile } = require("fs").promises;

// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/assets', express.static(path.join(__dirname, "assets")));

// Home page route
app.get("/", async (request, response) => {
    response.send( await readFile(path.join(__dirname, "public", "testing.html"), "utf8"));
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on http://localhost:3000/. To stop the server, press Ctrl + C");
});
