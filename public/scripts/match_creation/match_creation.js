// Kode for å styre alt angående å starte en kamp

import { validateForm } from "./match_creation_form_validation.js";

// Henter inn formen brukeren bruker til endre kampens innstilinger, legge til spillere og for å starte kampen
const match_creation_form = document.getElementById("match-creation-form")
match_creation_form.addEventListener("submit", startMatch)

// Henter inn knappen som brukes til å kansellere kampen
const match_cancel_button = document.getElementById("match-cancel-button")
match_cancel_button.addEventListener("click", cancelMatchCreation)

// Variabel som skal hente in brukerens Id til når jeg vil legge til kontoer å sånt.
const user_id = 0;

// Henter dagens dato og lager en streng representasjon av den
const date = new Date();
const date_as_string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
const date_as_string_clean = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`

// Lager et objekt med dato data for eksportering
const date_data = {
    object: date,
    date_string: date_as_string,
    date_string_clean: date_as_string_clean
};

// Nøkkel for localStorage for å holde styr på antall kamper i dag
const storageKey = `matches_count_${date_as_string}`;
export { date_data, storageKey };


// Funksjon for når brukeren først lager kampen.
function startMatch(event) {
    event.preventDefault();

    // Henter inn mengden kamper i dag, brukes for å generere unike navn
    let total_matches_today = parseInt(localStorage.getItem(storageKey), 10) || 0;

    // Display name: Hvis brukeren ikke har skrevet inn noe, så bruker vi placeholder navnet. Placeholder navnet er generert i public/scripts/match_creation/dynamic_display_name.js
    var match_display_name = document.getElementById("match-display-name-input").value;
    if (!match_display_name || match_display_name.trim() === "") {
        match_display_name = document.getElementById("match-display-name-input").placeholder;
    }

    // Denne pad funksjonen sørger for at tid alltid har to siffer (f.eks. hvis tiden var 09:05, hadde den blit sånn: 9:5. Dette fikser pad funskjonen)
    const pad = (n) => n.toString().padStart(2, '0');
    const creation_time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    const creation_date = [date.getDate(), date.getMonth() + 1, date.getFullYear()];

    const points_to_play = document.querySelector("#points-to-play-input .dropdown-selected-item");
    const team_algorithm = document.querySelector("#team-algorithm-input .dropdown-selected-item");
    const amount_of_courts = document.getElementById("court-amount-input").value;

    const players = document.querySelectorAll(".player-inputs input");
    const players_object = {};

    // Lager et objekt med spillerne
    // Spillerene sitt navn blir enten det brukeren skrev inn, eller hvis det ikke ble skrevet noe inn, så bruker den placeholder-teksten
    if (players && players.length > 0) {
        players.forEach((element, index) => {
            const key = `player_${index + 1}`;
            const value = (element.value && element.value.trim() !== '') ? element.value : element.placeholder;
            players_object[key] = value;
        });
    }

    if (validateForm(players, team_algorithm, points_to_play) == false) {
        // Setter opp rådata for kampen
        const match_creation_data = {
            matchId: `${date_as_string_clean}${total_matches_today}`,
            hostUserId: user_id,
            matchDisplayName: match_display_name,
            creationDate: creation_date,
            creationDateString: date_as_string,
            creationTime: creation_time,
            pointsToPlay: points_to_play.innerText,
            teamCreationMethod: team_algorithm.innerText,
            players: players_object,
            amountOfCourts: amount_of_courts
        }

        // Inkrementerer mengden kamper idag og setter det i localStorage
        total_matches_today += 1;
        localStorage.setItem(storageKey, total_matches_today);

        const match_creation_data_json = JSON.stringify(match_creation_data)
        console.log(match_creation_data_json)
    }
}

function cancelMatchCreation() {
    console.log("Match creation cancelled.");
}

function saveMatchCreationData(json_data) {
	fetch('/match_creation/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: json_data
	})
}
