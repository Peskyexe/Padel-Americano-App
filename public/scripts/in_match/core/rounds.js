import { generateTeamsRandom } from "./teams.js";
import { updateCourts, getCourtPoints } from "./ui.js";
import { updateChevronStates } from "../round_switch_chevrons.js";
import { totalCourts, matchState, match } from "../controller.js";
import { saveMatch } from "./match.js";
import { updatePlayerStats, updateAllPlayerRankings } from "./players.js";

async function nextRound() {
    matchState.totalRounds++;

    saveCurrentRound();
    updateAllPlayerStats();
    updateAllPlayerRankings();

    match.matchData.rounds[matchState.totalRounds] = getNewRound();

    const saveSuccessful = await saveMatch();
    if (saveSuccessful == true) {
        goToRound(matchState.totalRounds);
    }
    else {
        console.error("Error saving match data")
    }
}

function saveCurrentRound() {
    let currentRound = match.matchData.rounds[matchState.activeRoundIndex];

    // For every court
    for (let i = 1; i <= totalCourts; i++) {
        const points = getCourtPoints(i);

        currentRound[`court${i}`].team1Points = points.team1;
        currentRound[`court${i}`].team2Points = points.team2;
    }

    match.matchData.rounds[matchState.activeRoundIndex] = currentRound;
}

function getNewRound() {
    let newRound = {};

    // Generate team matchups
    const [ matchups, playersPlaying ] = generateTeamsRandom(match.matchData.players, totalCourts);

    // For every court
    for (let i = 0; i < totalCourts; i++) {
        newRound[`court${i + 1}`] = matchups[i];
    }

    return newRound;
}

function goToRound(roundIndex) {
    matchState.activeRoundIndex = roundIndex;
    const round = match.matchData.rounds[matchState.activeRoundIndex];

    updateCourts(round);
    updateChevronStates(matchState.totalRounds, matchState.activeRoundIndex);

    const roundText = document.querySelector("header h1");
    roundText.innerText = `Round ${matchState.activeRoundIndex + 1}`;
}

function updateAllPlayerStats() {
    const currentRound = match.matchData.rounds[matchState.activeRoundIndex];

    // For every court
    for (let i = 1; i <= totalCourts; i++) {
        const court = currentRound[`court${i}`];
        
        const team1Points = court.team1Points;
        const team2Points = court.team2Points;

        const team1Players = Object.values(court.team1);
        team1Players.forEach((playerIndex) => {
            updatePlayerStats(playerIndex, team1Points, team2Points);
        });

        const team2Players = Object.values(court.team2);
        team2Players.forEach((playerIndex) => {
            updatePlayerStats(playerIndex, team2Points, team1Points);
        });
    }
}

export { nextRound, getNewRound, goToRound };