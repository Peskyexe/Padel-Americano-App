const express = require("express");
const app = express();
const path = require('path');
const { readFile } = require("fs").promises;


const publicPath = path.join(process.cwd(), "public");
app.use(express.json());
app.use(express.static(publicPath));


app.get("/match-creation", async (request, response) => {
    response.send( await readFile(path.join(publicPath, "match_creation.html"), "utf8"));
});

app.get("/match", async (request, response) => {
    response.send( await readFile(path.join(publicPath, "in_match.html"), "utf8"));
});

const matchApiRoutes = require("./routes/match.routes");
app.use("/api/match", matchApiRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on http://localhost:3000/match-creation. To stop the server, press Ctrl + C");
});
