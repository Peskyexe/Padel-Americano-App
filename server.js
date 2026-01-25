const express = require("express");
const app = express();
const path = require('path');
const { readFile, writeFile } = require("fs").promises;

// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/assets', express.static(path.join(__dirname, "assets")));

// Rute for "match creation" siden
app.get("/match_creation", async (request, response) => {
    response.send( await readFile(path.join(__dirname, "public", "match_creation.html"), "utf8"));
});

// Tester noe API greier
// POST api for å kunne sende inn match_creation data, mangler alt av sikkerhet funk
app.post("/match_creation/submit", async (request, response) => {
    try {
        const match_creation_data = request.body;
        const user_id = "0";
        
        // Read existing JSON file
        let old_data = [];
        try {
            const fileContent = await readFile(path.join(__dirname, "userdata", user_id, "match_creation_data.json"), "utf8");
            old_data = JSON.parse(fileContent);
        } catch (error) {
            // File doesn't exist or is empty, start with empty array
            old_data = [];
        }
        
        // Add new booking
        old_data.push(match_creation_data);
        
        // Save to file
        await writeFile(path.join(__dirname, "userdata", user_id, "match_creation_data.json"), JSON.stringify(old_data, null, 2), "utf8");
        response.json({ success: true });
    } 
    
    catch (error) {
        console.error("Error saving match data", error);
        response.status(500).json({ success: false, error: error.message });
    }
});

// Rute for "in match" siden
app.get("/round", async (request, response) => {
    response.send( await readFile(path.join(__dirname, "public", "in_round.html"), "utf8"));
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on http://localhost:3000/match_creation. To stop the server, press Ctrl + C");
});
