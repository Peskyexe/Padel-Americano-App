const path = require('path');
const { readFile, writeFile, mkdir } = require("fs").promises;


exports.saveMatch = async (match, userId, matchId) => {
    await saveMatch(match, userId, matchId);xzw2112q
    wkjfdsa
}

exports.getMatch = async (userId, matchId) => {
    const matches = await getMatches(userId);
    const match = matches[matchId];
    return match;
}


async function getMatches(userId) {
    const filePath = await getUserMatchDataPath(userId);

    try {
        const fileContents = await readFile(filePath, "utf8");

        if (!fileContents.trim()) {
            await writeFile(filePath, "{}")
            return {};
        }

        return JSON.parse(fileContents);
    } catch (error) {
        // If file doesn't exist or is invalid
        if (error.code === "ENOENT") {
            await writeFile(filePath, "{}")
            return {};
        }
        throw error;
    }
}

async function saveMatch(match, userId, matchId) {
    try {
        const filePath = await getUserMatchDataPath(userId);
        const userMatches = await getMatches(userId);

        userMatches[matchId] = match;
        await writeFile(filePath, JSON.stringify(userMatches, null, 4), "utf8")

    } catch (error) {
        console.error(error.message);
        throw error
    }
}

async function getUserMatchDataPath(userId) {
    try {
        const dirPath = path.join(process.cwd(), "data", userId);
        await mkdir(dirPath, { recursive: true });
        const dataPath = path.join(dirPath, "matchData.json");
        return dataPath
        
    } catch (mkdirError) {
        console.error(mkdirError)
        throw mkdirError;
    }
}