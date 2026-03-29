import { validateForm } from "./match_creation_form_validation.js";

const match_creation_form = document.getElementById("match-creation-form")
match_creation_form.addEventListener("submit", startMatch)

const match_cancel_button = document.getElementById("match-cancel-button")
match_cancel_button.addEventListener("click", cancelMatch)

const nameElement = document.getElementById("match-display-name-input");
const pointsElement = document.querySelector("#points-to-play-input .dropdown-selected-item");
const algorithmElement = document.querySelector("#team-algorithm-input .dropdown-selected-item");
const courtsElement = document.getElementById("court-amount-input");


const timeData = createTimeObject()
function createTimeObject() {
    const date = new Date();

    const pad = (n) => n.toString().padStart(2, '0');
    const creationTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    let timeData = {
        time: creationTime,
        date: date.getDay(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }
    timeData["dateString"] = `${timeData.date}/${timeData.month}/${timeData.year}`;

    return timeData
}

const storageKey = `matches_count_${timeData.dateString}`;
var matchesToday = parseInt(localStorage.getItem(storageKey), 10) || 0;

const placeholderName = generatePlaceholderName()
function generatePlaceholderName() {
    const placeholderName = `untitled_match_${timeData.dateString}_${matchesToday}`;
    nameElement.placeholder = placeholderName;

    return placeholderName
}


function startMatch(event) {
    event.preventDefault();

    const validated = !validateForm()
    if (validated) {
        const hostUserId = "0";
        const matchId = `${timeData.dateString.replaceAll("/", "")}${matchesToday}`;

        var matchDisplayName = nameElement.value;
        if (!matchDisplayName || matchDisplayName.trim() === "") {
            matchDisplayName = placeholderName
        }
    
        const players = constructPlayersArray();

        const matchData = {
            matchId,
            hostUserId,
            matchDisplayName,
            creationData: {
                timeData,
                pointsToPlay: parseInt((pointsElement).innerText.replace(/[^\d]/g, ''), 10),
                courts: parseInt(courtsElement.value, 10),
                teamAlgorithm: algorithmElement.innerText 
            },
            matchData: {
                rounds: [],
                players,
                rankingByIndex: generateTemplatePlayerRanking(players.length)
            }
        };

        submitMatchData(matchData, hostUserId, matchId);
        localStorage.setItem(storageKey, matchesToday + 1);
    }
}


function constructPlayersArray() {
    const playerElements = document.querySelectorAll(".player-inputs input");
    let playersArray = [];

    if (playerElements && playerElements.length > 0) {
        playerElements.forEach((player) => {
            const playerData = {
                playerName: player.value,
                roundsPlayed: 0,
                pointsWon: 0,
                pointsLost: 0,
                wins: 0,
                losses: 0,
                winratePercentage: 0,
                pointGapArray: [],
                absPointGapArray: [],
                averagePointGap: 0,
                averageAbsPointGap: 0
            };

            playersArray.push(playerData)
        });
    }

    return playersArray;
}


function generateTemplatePlayerRanking(playerCount) {
    const rankingArray = []
    for (let i = 0; i < playerCount; i++) {
        rankingArray.push([i])
    }
    return rankingArray
}


function cancelMatch() {
    console.log("Match creation cancelled.");
}


async function submitMatchData(matchData, hostUserId, matchId) {
    const matchDataJSON = JSON.stringify(matchData, null, 4);

	fetch(`/api/match/save/${hostUserId}/${matchId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: matchDataJSON
	})
    
    .then(response => response.json())
	.then(data => {
		if (data.success) {
			const params = new URLSearchParams({
				hostUserId,
				matchId
			});

			window.location.href = '/match?' + params.toString();
		}
    })
}
