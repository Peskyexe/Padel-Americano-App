import { match } from "../controller.js";

function updatePlayerStats(playerIndex, pointsWonThisRound, pointsLostThisRound) {
    const stats = getPlayerStats(playerIndex);

    stats.roundsPlayed += 1;

    stats.pointsWon += pointsWonThisRound;
    stats.pointsLost += pointsLostThisRound;

    if (pointsWonThisRound > pointsLostThisRound) {
        stats.wins += 1;
    }
    else if (pointsLostThisRound > pointsWonThisRound) {
        stats.losses += 1;
    }

    stats.winratePercentage = (stats.wins / stats.roundsPlayed) * 100;

    stats.pointGapArray.push(pointsWonThisRound - pointsLostThisRound);
    stats.absPointGapArray.push(Math.abs(pointsWonThisRound - pointsLostThisRound))

    stats.averagePointGap = calculateAvgPointGap(stats.pointGapArray);
    stats.averageAbsPointGap = calculateAvgPointGap(stats.absPointGapArray);
}

function getPlayerStats(playerIndex) {
    const playerStats = match.matchData.players[playerIndex];

    return playerStats;
}

function calculateAvgPointGap(pointGapArray) {
    const sum = pointGapArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / pointGapArray.length;

    return average;
}

function updateAllPlayerRankings() {
    const players = match.matchData.players;
    
    // Create array of player stats with their indices
    const playerStats = players.map((player, index) => ({
        index,
        pointsWon: player.pointsWon,
        pointsLost: player.pointsLost
    }));
    
    // Sort by pointsWon (descending), then by pointsLost (ascending)
    playerStats.sort((a, b) => {
        if (b.pointsWon !== a.pointsWon) {
            return b.pointsWon - a.pointsWon;
        }
        return a.pointsLost - b.pointsLost;
    });
    
    // Group players by rank, handling ties
    const rankingByIndex = [];
    let i = 0;
    while (i < playerStats.length) {
        let group = [playerStats[i].index];
        let j = i + 1;
        
        // Add players with same pointsWon and pointsLost to the same group (tie)
        while (j < playerStats.length && 
               playerStats[j].pointsWon === playerStats[i].pointsWon &&
               playerStats[j].pointsLost === playerStats[i].pointsLost) {
            group.push(playerStats[j].index);
            j++;
        }
        
        rankingByIndex.push(group);
        i = j;
    }
    
    match.matchData.rankingByIndex = rankingByIndex;
}

export { updatePlayerStats, updateAllPlayerRankings };