function generateTeamsRandom(playersArray, totalCourts) {
    let matchupsArray = [];
    let playingArray = [];

    let availableIndices = Array.from({ length: playersArray.length }, (_, i) => i);

    for (let courtIndex = 0; courtIndex < totalCourts; courtIndex++) {
        let teamsObject = {
            'team1': {},
            'team2': {}
        };

        for (let i = 1; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * availableIndices.length);

            const originalIndex = availableIndices[randomIndex];
            playingArray.push(originalIndex);

            availableIndices.splice(randomIndex, 1);

            if (i < 3) {
                teamsObject['team1'][`player${i}Index`] = originalIndex; 
            }
            else {
                teamsObject['team2'][`player${i-2}Index`] = originalIndex;
            }

            
        }

        matchupsArray.push(teamsObject);
    }

    return [matchupsArray, playingArray];
}

export { generateTeamsRandom };