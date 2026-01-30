// Kode for å styre alt angående å starte en kamp

import { validateForm } from "./match_creation_form_validation.js";

// Henter inn formen brukeren bruker til endre kampens innstilinger, legge til spillere og for å starte kampen
const match_creation_form = document.getElementById("match-creation-form")
match_creation_form.addEventListener("submit", createMatch)

// Henter inn knappen som brukes til å kansellere kampen
const match_cancel_button = document.getElementById("match-cancel-button")
match_cancel_button.addEventListener("click", cancelMatch)

// Variabel som skal hente in brukerens id til når jeg vil legge til kontoer.
// Bruker bare id 0 for å teste 
const user_id = "0";

// Henter dagens dato og lager en streng representasjon av den
const date = new Date();
const date_as_string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
const date_as_string_clean = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`

// Lager et objekt med dato data for eksportering
const date_data_object = {
    object: date,
    date_string: date_as_string,
    date_string_clean: date_as_string_clean
};

// Lager et objekt med fulle dato'en, lagres sammen med JSON'en
const creation_date_object = {
    day: date.getDay(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
}

// Nøkkel for localStorage for å holde styr på antall kamper i dag
const storageKey = `matches_count_${date_as_string}`;
export { date_data_object, storageKey };


// Funksjon for når brukeren først lager kampen.
function createMatch(event) {
    event.preventDefault();

    // Henter inn mengden kamper i dag, brukes for å generere unike navn
    let total_matches_today = parseInt(localStorage.getItem(storageKey), 10) || 0;
    const match_id = `${date_as_string_clean}${total_matches_today}`;


    // Display name: Hvis brukeren ikke har skrevet inn noe, så bruker vi placeholder navnet. Placeholder navnet er generert i public/scripts/match_creation/dynamic_display_name.js
    var match_display_name = document.getElementById("match-display-name-input").value;
    if (!match_display_name || match_display_name.trim() === "") {
        match_display_name = document.getElementById("match-display-name-input").placeholder;
    }

    // Denne pad funksjonen sørger for at tid alltid har to siffer (f.eks. hvis tiden var 09:05, hadde den blit sånn: 9:5. Dette fikser pad funskjonen)
    const pad = (n) => n.toString().padStart(2, '0');
    const creation_time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    // Jeg vet ikke helt hvordan denn greia fungerer '.replace(/[^\d]/g, '')', men den skal fjerne alle karakterer i strengen som ikke er et tall
    const points_to_play = document.querySelector("#points-to-play-input .dropdown-selected-item");
    const team_algorithm = document.querySelector("#team-algorithm-input .dropdown-selected-item");
    const amount_of_courts = parseInt(document.getElementById("court-amount-input").value, 10);

    const players = document.querySelectorAll(".player-inputs input");
    const players_object = constructPlayerObject(players);

    // Hvis det ikke er noe feil med det brukeren har skrevet in:
    if (validateForm(players, team_algorithm, points_to_play) == false) {
        // Setter opp rådata for kampen
        const match_creation_data = {
            matchId: match_id,
            hostUserId: user_id,
            matchDisplayName: match_display_name,
            creationDateObject: creation_date_object,
            creationDateString: date_as_string,
            creationTime: creation_time,
            // Fjerner alle andre karakter som ikke er ett tall i poinst-to-play elemente
            pointsToPlay: parseInt((points_to_play).innerText.replace(/[^\d]/g, ''), 10),
            teamCreationMethod: team_algorithm.innerText,
            players: players_object,
            amountOfCourts: amount_of_courts
        }
        submitMatchCreationData(match_creation_data);

        // Inkrementerer mengden kamper idag og setter det i localStorage
        total_matches_today += 1;
        localStorage.setItem(storageKey, total_matches_today);
    }
}

// Lager et objekt med spillerne
function constructPlayerObject(players_array) {
    if (players_array && players_array.length > 0) {
        let players_object = {};
        players_array.forEach((element, index) => {
            const key = `player_${index + 1}`;
            const value = element.value.trim();

            players_object[key] = value;
        });

        return players_object;
    }
}

function cancelMatch() {
    console.log("Match creation cancelled.");
}

// Funksjon for å sende creation data til serveren og sende deg til in-match siden
function submitMatchCreationData(match_data) {
    // Gjør om daten til JSON
    const match_data_json = JSON.stringify(match_data, null, 4);

    // Sender API post call til servern, og sender med JSON dataen
	fetch('/api/matches/creation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: match_data_json
	})
    
    // Etter og ha sendt dataen, hvis det ikke var noe feil så blir du tatt til in-match siden
    .then(response => response.json())
	.then(data => {
		if (data.success) {
			const params = new URLSearchParams({
				hostUserId: match_data.hostUserId,
				matchId: match_data.matchId
			});

			window.location.href = '/round?' + params.toString();
		}
    })
}
