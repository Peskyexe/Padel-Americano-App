import { getNewRound, goToRound } from './rounds.js';
import { matchState, hostUserId, matchId, match } from '../controller.js';

async function loadMatch() {
    try {
        const response = await fetch(`/api/match/get/${hostUserId}/${matchId}`);
        if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);

        const match = await response.json();
        return match;
    } 
    catch (error) {
        console.error('Error loading match data:\nhost_user_id:', hostUserId, '\nmatch_id:', matchId, '\n', error);
    }
}

async function saveMatch() {
    const matchDataJSON = JSON.stringify(match, null, 4);

    return fetch(`/api/match/save/${hostUserId}/${matchId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: matchDataJSON
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return true;
        }
        return false;
    })
}

async function startMatch() {
    const newRound = getNewRound();
    match.matchData.rounds[matchState.activeRoundIndex] = newRound;

    await saveMatch(match, hostUserId, matchId);

    goToRound(matchState.activeRoundIndex);
}


function endMatch() {

}

export { loadMatch, saveMatch, startMatch, endMatch };