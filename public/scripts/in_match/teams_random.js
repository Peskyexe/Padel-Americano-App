
function generateTeamsRandom(players_object) {
    let teams_object = {
        'team1': {},
        'team2': {}
    };

    // Gjør om spiller objektet til en array/liste
    let players_array = Object.values(players_object);

    for (let i = 1; i < 5; i++) {
        // Genererer en random index basert på hvor lang spiller listen er
        const random_index = Math.floor(Math.random() * players_array.length);
        const selected_player = players_array[random_index];
        players_array.splice(random_index, 1);

        if (i < 3) {
            teams_object['team1'][`player${i}`] = selected_player; 
        }
        else {
            teams_object['team2'][`player${i-2}`] = selected_player;
        }
    }

    return teams_object;
}

export { generateTeamsRandom };