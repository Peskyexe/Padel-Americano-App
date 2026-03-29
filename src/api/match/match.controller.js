const matchService = require("../../services/match.service")

exports.saveMatch = async (request, response) => {
    try {
        await matchService.saveMatch(request.body, request.params.userId, request.params.matchId)
        response.status(200).json({ success: true })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}

exports.getMatch = async (request, response) => {
    try {
        const match = await matchService.getMatch(request.params.userId, request.params.matchId)
        response.json(match)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
