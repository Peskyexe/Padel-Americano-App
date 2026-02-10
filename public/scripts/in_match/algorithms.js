// const teams_object = {
//     'team_1': {
//         'player_1': 'Alex',
//         'player_2': 'OK'
//     },
//     'team_2': {
//         'player_1': 'Daniel',
//         'player_2': 'Jørgen'        
//     }
// }

// const players_object = {
//     "player_1": "Jørgen",
//     "player_2": "Daniel",
//     "player_3": "OK",
//     "player_4": "Alex"
// }

function generateTeamsRandom(players_object) {
    let teams_object = {
        'team_1': {},
        'team_2': {}
    };

    // Gjør om spiller objektet til en array/liste
    let players_array = Object.values(players_object);

    for (let i = 1; i < 5; i++) {
        // Genererer en random index basert på hvor lang spiller listen er
        const random_index = Math.floor(Math.random() * players_array.length);
        const selected_player = players_array[random_index];
        players_array.splice(random_index, 1);

        if (i < 3) {
            teams_object['team_1'][`player_${i}`] = selected_player; 
        }
        else {
            teams_object['team_2'][`player_${i-2}`] = selected_player;
        }
    }

    console.log('Generated new teams (random):', teams_object);
    return teams_object;
}


// Vi har ikke tid til å faktisk implementere Americano algoritmen
function generateTeamsAmericano(player_array) {
    
}

export { generateTeamsRandom, generateTeamsAmericano };