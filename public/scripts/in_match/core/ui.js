import { hideSliders, showSliders } from "../round_switch_points.js";
import { totalCourts, match } from "../controller.js";

function updateCourts(round) {
    // For each court
    for (let i = 1; i <= totalCourts; i++) {
        const court = round[`court${i}`]

        const courtElement = document.getElementById(`court-${i}`);
        const playerTextElements = courtElement.querySelectorAll('.player-name-text');

        playerTextElements[0].innerText = match.matchData.players[court.team1['player1Index']].playerName;
        playerTextElements[1].innerText = match.matchData.players[court.team1['player2Index']].playerName;
        playerTextElements[2].innerText = match.matchData.players[court.team2['player1Index']].playerName;
        playerTextElements[3].innerText = match.matchData.players[court.team2['player2Index']].playerName;

        // Hvis det er lagret poeng
        if (court.team1Points) {
            hideSliders(court, i);
        }
        else {
            showSliders();
        }
    }
}

function getCourtPoints(courtIndex) {
    const courtWrapper = document.getElementById(`court-${courtIndex}`);

    const team1Points = parseInt(courtWrapper.querySelector("#team-1-score-input").value);
    const team2Points = parseInt(courtWrapper.querySelector("#team-2-score-input").value);

    const points = {
        team1: team1Points,
        team2: team2Points
    };

    return points;
}

export { updateCourts, getCourtPoints }; 