const express = require("express");
const app = express();
const path = require('path');
const { readFile, writeFile, mkdir } = require("fs").promises;


// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/healthz", (request, response) => {
    response.status(200).json({ status: "ok" });
});

app.get("/", (request, response) => {
    response.redirect("/match-creation");
});


// Rute for "match creation" siden
app.get("/match-creation", async (request, response) => {
    response.send( await readFile(path.join(__dirname, "public", "match_creation.html"), "utf8"));
});


// POST api for å kunne sende inn match_creation data, mangler alt av sikkerhets funksjonalitet
app.post("/api/matches/creation", async (request, response) => {
    try {
        const incoming_match_object = request.body;

        const user_id = incoming_match_object.hostUserId;
        const user_directory = path.join(__dirname, "userdata", user_id);

        // Sikrer at mappen eksisterer, og lager en nye en hvis den ikke finnes
        console.log("\nSaving creation data for user id:", user_id);
        console.log("Verifying directory:", user_directory)
        try {
            await mkdir(user_directory, { recursive: true });
            console.log("Directory verified successfully");
        } catch (mkdirError) {
            console.error("Error creating directory:", mkdirError);
            throw mkdirError;
        }
        
        // Leser den eksisternede filen
        let old_data;
        try {
            const file_content = await readFile(path.join(user_directory, "match_creation_data.json"), "utf8");
            old_data = JSON.parse(file_content);
        } catch (error) {
            // Hvis filen ikke finnes eller er ugyldig, start med tom template
            old_data = { user_matches: {} };
        }

        // Setter inkomende match data in i filen
        old_data.user_matches[incoming_match_object.matchId] = incoming_match_object;
        console.log(`Saved match with id: ${incoming_match_object.matchId}`);

        // Lagrer alt sammen tilbake til filen i template-format
        await writeFile(path.join(user_directory, "match_creation_data.json"), JSON.stringify(old_data, null, 4), "utf8");
        response.json({ success: true });
    } 
    
    catch (error) {
        console.error("Error saving match data", error);
        response.status(500).json({ success: false, error: error.message });
    }
});

app.get("/api/matches/creation/:uid/:mid", async (request, response) => {
    try {
        const user_id = request.params.uid;
        const match_id = request.params.mid;

        const user_directory = path.join(__dirname, "userdata", user_id);

        console.log(`Fetching match creation data for user: '${user_id}', match id: '${match_id}'`)

        let matches;
        try {
            console.log('Reading match_creation_data file')
            const file_content = await readFile(path.join(user_directory, "match_creation_data.json"), "utf8");
            matches = JSON.parse(file_content);
        } catch (error) {
            console.error('Failed to read match_creation_data file', user_id);
            throw error
        }
    }

    catch (error) {
        console.error("Error fetching match data", error);
        response.status(500).json({ success: false, error: error.message });
    }
})

// Rute for "in match" siden
app.get("/round", async (request, response) => {
    response.send( await readFile(path.join(__dirname, "public", "in_match.html"), "utf8"));
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on http://localhost:3000/match-creation. To stop the server, press Ctrl + C");
});
