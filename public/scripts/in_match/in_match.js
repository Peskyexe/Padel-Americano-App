import { generateTeamsRandom } from './teams_random.js';
import { updateChevronStates } from './round_switch_chevrons.js';
import { validatePoints, hideSliders, showSliders } from './round_switch_points.js';

// Henter inn host-bruker id og kamp id
// const params = new URLSearchParams(window.location.search);
// const hostUserId = params.get('hostUserId');
const matchId = params.get('matchId');
const hostUserId = "0";

const matchData = await loadMatchData();
export { matchData };

const totalCourts = matchData.creationData.courts;
const roundText = document.querySelector("header h1");

var matchObject = { };

var totalRounds = 0;
var activeRound = totalRounds + 1;
export { totalRounds, activeRound };

await startMatch();

const nextRoundButton = document.getElementById("next-round-button");
nextRoundButton.addEventListener("click", (event) => {
    newRound();
})


async function loadMatchData() {
    try {
        const response = await fetch(`/api/match/get/${hostUserId}/${matchId}`);
        if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);

        const matchData = await response.json();
        return matchData;
    } 
    catch (error) {
        console.error('Error loading match data:\nhost_user_id:', hostUserId, '\nmatch_id:', matchId, '\n', error);
    }
}


function updateCourts(roundObject) {
    for (let x = 1; x <= totalCourts; x++) {
        const courtObject = roundObject[`court${x}`]

        const courtElement = document.getElementById(`court-${x}`);
        const playerTextElements = courtElement.querySelectorAll('.player-name-text');

        playerTextElements[0].innerText = courtObject['team1']['player1'];
        playerTextElements[1].innerText = courtObject['team1']['player2'];
        playerTextElements[2].innerText = courtObject['team2']['player1'];
        playerTextElements[3].innerText = courtObject['team2']['player2'];

        // Hvis det er lagret poeng
        if (courtObject["team1points"]) {
            hideSliders(courtObject, x);
        }
        else {
            showSliders();
        }
    }

}


function createPlayersObject(players) {
    let playersObject = { };
    let index = 1;

    const playersArray = Object.values(players);
    playersArray.forEach(player => {
        const playerData = {
            playerName: player,
            ranking: 0,
            pointsWon: 0,
            wins: 0,
            winratePercentage: 0,
            averagePointGap: 0
        };
        playersObject[`player${index}`] = playerData;
        index ++;
    });

    return playersObject;
}


function saveCourtObject(courtIndex) {
    const courtElement = document.getElementById(`court-${courtIndex}`);

    let courtObject = {
        team1: {
            player1: courtElement.querySelector("#player-1").innerText,
            player2: courtElement.querySelector("#player-2").innerText
        },
        team2: {
            player1: courtElement.querySelector("#player-3").innerText,
            player2: courtElement.querySelector("#player-4").innerText
        },
        team1points: courtElement.querySelector("#team-1-score-input").value,
        team2points: courtElement.querySelector("#team-2-score-input").value
    };

    return courtObject;
}


function saveRoundObject() {
    let roundObject = { };

    for (let i = 1; i <= totalCourts; i++) {
        roundObject[`court${i}`] = saveCourtObject(i);
    }

    return roundObject;
}


async function startMatch() {
    matchObject = await loadMatchData();
    console.log(matchObject)
    newRound();
}


function endMatch() {

}


function newRound() {
    if (!validatePoints()) {
        totalRounds ++;

        const currentRoundObject = saveRoundObject(); 
        let newRoundObject = { };

        for (let i = 1; i <= totalCourts; i++) {
            newRoundObject[`court${i}`] = generateTeamsRandom(matchCreationData.players);
        }

        matchObject["rounds"][`round${activeRound}`] = currentRoundObject;
        matchObject["rounds"][`round${totalRounds}`] = newRoundObject;

        goToRound(totalRounds);
    }
}


function goToRound(roundIndex) {
    activeRound = roundIndex;
    const roundObject = matchObject["rounds"][`round${activeRound}`];

    updateCourts(roundObject);
    updateChevronStates(totalRounds, activeRound);
    roundText.innerText = `Round ${activeRound}`;
}
export { goToRound };


async function loadMatchData() {
    try {
        // Sender GET request til match playing API-en
        let response = await fetch(`/api/matches/playing/${hostUserId}/${matchId}`);
        console.log(response)
        if (response.status == 301) {
            createMatchDataFile()
            response = await fetch(`/api/matches/playing/${hostUserId}/${matchId}`);
            console.log(response)
        }
        else if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);

        const matchData = await response.json();
        return matchData;
    } 
    catch (error) {
        console.error('Error loading match data:\nhost_user_id:', hostUserId, '\nmatch_id:', matchId, '\n', error);
    }
}


async function saveMatchData(roundsObject) {
    const matchData = await loadMatchData();
    totalRounds = matchData.totalRounds;
}


// Henter inn spiller data basert på hvem index de har i matchData.
// For eks. hvis playerIndexArray = ["1", "4"], så henter funksjonen in dataen til player1 og player4
async function loadPlayersData(playersIndexArray) {
    const matchData = await loadMatchData();
    let playersData = { };
 
        playersIndexArray.forEach(playerIndex => {_:;xzzzzzzz,mcvrs[`player${playerIndex}`];
    });

    return playersData
}


function savePlayersData(playersIndexArray, playerObjectsArray) {

}


function createMatchDataFile() {
    const matchDataObject = {
        matchId: matchId,
        hostUserId: hostUserId,
        totalRounds: 0,
        rounds: { },
        players: createPlayersObject(matchCreationData.players)
    };

    const matchDataJSON = JSON.stringify(matchDataObject, null, 4);

	fetch('/api/matches/playing', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: matchDataJSON
	})
}