console.log("Match creation script loaded.");

// Henter in formen brukeren bruker til å start en kamp
const match_creation_form = document.getElementById("match-creation-form")
match_creation_form.addEventListener("submit", startMatch)

// Funksjon for når brukeren først lager kampen.
function startMatch(event) {
    console.log("Starting match");
    event.preventDefault();

    const date = new Date();
    const date_as_string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    // Holder styr på hvor mange kamper som er laget i dag for å lage unike navn
    const storageKey = `matches_count_${date_as_string}`;
    let total_matches_today = parseInt(localStorage.getItem(storageKey), 10) || 0;
    total_matches_today += 1;
    localStorage.setItem(storageKey, total_matches_today);

    // Display name: Hvis brukeren ikke har skrevet inn noe, lager vi et standard navn
    var match_display_name = document.getElementById("match-display-name-input").value;
    if (!match_display_name || match_display_name.trim() === "") {
        match_display_name = `untitled_match_${date_as_string}_${total_matches_today}`;
    }

    const creation_date = [date.getDate(), date.getMonth() + 1, date.getFullYear()];

    // Denne pad funksjonen sørger for at tid alltid har to siffer (f.eks. 09:05)
    const pad = (n) => n.toString().padStart(2, '0');
    const creation_time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    const points_to_play = document.querySelector("#points-to-play-input .dropdown-selected-item");
    const team_creation_method = document.querySelector("#team-creation-method-input .dropdown-selected-item");
    const players = document.querySelectorAll(".player-input input");

    // Lager et objekt med spillerne
    // Spillerene sitt navn blir enten det brukeren skrev inn, eller hvis det ikke ble skrevet noe inn, så bruker den placeholder-teksten
    const players_object = {};
    if (players && players.length > 0) {
        players.forEach((element, index) => {
            const key = `player_${index + 1}`;
            const value = (element.value && element.value.trim() !== '') ? element.value : element.placeholder;
            players_object[key] = value;
        });
    }

    var amount_of_courts = document.getElementById("court-amount-input").value;
    if (!amount_of_courts || amount_of_courts.trim() === "") {
        amount_of_courts = Math.floor(players.length / 4);
    }

    // Setter opp rådata for kampen
    const raw_match_data = {
        matchName: `${date_as_string}_${total_matches_today}`,
        matchDisplayName: match_display_name,
        creationDate: creation_date,
        creationDateString: date_as_string,
        creationTime: creation_time,
        pointsToPlay: points_to_play.innerText,
        teamCreationMethod: team_creation_method.innerText,
        players: players_object,
        amountOfCourts: amount_of_courts
    }

    const raw_match_data_json = JSON.stringify(raw_match_data)
    console.log(raw_match_data_json)
}
