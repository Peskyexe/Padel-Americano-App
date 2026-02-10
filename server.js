const { match } = require("assert");
const express = require("express");
const app = express();
const path = require('path');
const { readFile, writeFile, mkdir } = require("fs").promises;


// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// Rute for "match creation" siden
app.get("/match-creation", async (request, response) => {
    response.send( await readFile(path.join(__dirname, "public", "match_creation.html"), "utf8"));
});


// POST api for å kunne sende inn match_creation data, mangler alt av sikkerhets funksjonalitet
app.post("/api/matches/creation", async (request, response) => {
    try {
        const incoming_match_object = request.body;
        const user_id = incoming_match_object.hostUserId;
        const match_id = incoming_match_object.matchId;
        const user_directory = path.join(__dirname, "userdata", user_id);

        // Sikrer at mappen eksisterer, og lager en nye en hvis den ikke finnes
        console.log("\nSaving creation data for user id:", user_id);
        console.log("Verifying directory:", user_directory)
        try {
            await mkdir(user_directory, { recursive: true });
            console.log("Directory verifiedd/created successfully.");
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

        // Putter inkomende match data in i JSON objektet
        old_data.user_matches[match_id] = incoming_match_object;
        
        // Skriver over den gammle filen med ny å gammel data
        await writeFile(path.join(user_directory, "match_creation_data.json"), JSON.stringify(old_data, null, 4), "utf8");
        console.log(`Saved match with id: ${match_id}`);

        response.json({ success: true });
    } 
    catch (error) {
        console.error("Error saving match data", error);
        response.status(500).json({ success: false, error: error.message });
    }
});


// API for å hente in match-creation-data ved bruk av bruker id og kamp id
app.get("/api/matches/creation/:uid/:mid", async (request, response) => {
    try {
        const user_id = request.params.uid;
        const match_id = request.params.mid;

        const user_directory = path.join(__dirname, "userdata", user_id);

        console.log(`\nRetriving match creation data for user id: ${user_id}, match id: ${match_id}`)

        let matches;
        console.log('Reading match creation data file...')
        // Prøver å lese 'match_creation_data.json' filen til brukeren, å gjør om JSON-en til et JS objekt
        try {
            const file_content = await readFile(path.join(user_directory, "match_creation_data.json"), "utf8");
            matches = JSON.parse(file_content);
            console.log('Sucessfully read file')
        } catch (error) {
            console.error('Error reading file:', error);
        }

        // Henter in selve kampen brukeren ber om ved bruk av match id, å sender den som response
        const match = matches.user_matches[match_id.toString()];
        response.json(match);
    }
    catch (error) {
        console.error("Error retriving match data:", error);
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
