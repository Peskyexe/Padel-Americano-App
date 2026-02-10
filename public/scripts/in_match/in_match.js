import { generateTeamsRandom } from './algorithms.js';

// Henter inn host-bruker id og kamp id
const params = new URLSearchParams(window.location.search);
const host_user_id = params.get('hostUserId');
const match_id = params.get('matchId');

const match_creation_data = await loadMatchCreationData();
updatePlayerNames(generateTeamsRandom(match_creation_data.players));

// Funksjon for å hente in creation data fra serveren
async function loadMatchCreationData() {
    try {
        console.log('Loading match creation data...');

        // Sender GET request til match creation API-en
        const response = await fetch(`/api/matches/creation/${host_user_id}/${match_id}`);
        if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);

        const match_creation_data = await response.json();
        console.log('Match creation data loaded.');

        return match_creation_data;
    } 
    catch (error) {
        console.error('Error loading match creation data:\nhost_user_id:', host_user_id, '\nmatch_id:', match_id, '\nerror:', error);
    }
}

// Funskjon for å oppdatere navnene til spillerene
function updatePlayerNames(teams_object) {
    // Gjør om teams objektet til en array
    let teams_array = Object.values(teams_object['team_1']);
    teams_array.push(teams_object['team_2']['player_1']);
    teams_array.push(teams_object['team_2']['player_2']);

    // Henter inn tekts elementene
    const player_text_elements = document.querySelectorAll('.player-name-text');

    // Endrer teksten til elementene
    for (let i = 0; i < 4; i++) {
        player_text_elements[i].innerText = teams_array[i];
    }
}
