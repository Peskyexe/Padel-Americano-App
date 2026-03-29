import { startMatch, loadMatch } from "./core/match.js";
import { nextRound } from "./core/rounds.js";
import { validatePoints } from "./round_switch_points.js";


const params = new URLSearchParams(window.location.search);
const hostUserId = params.get('hostUserId');
const matchId = params.get('matchId');

export { hostUserId, matchId}


const match = await loadMatch(hostUserId, matchId);

const totalCourts = match.creationData.courts;
const matchState = {
    totalRounds: 0,
    activeRoundIndex: 0
};

export { totalCourts, matchState, match };

await startMatch(match, hostUserId, matchId);


const nextRoundButton = document.getElementById("next-round-button");
nextRoundButton.addEventListener("click", async (event) => {
    if (!validatePoints()) {
        await nextRound();
    }
})