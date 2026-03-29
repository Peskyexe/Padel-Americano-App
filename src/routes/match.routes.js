const express = require('express');
const router = express.Router();

const matchController = require("../api/match/match.controller")

router.post("/save/:userId/:matchId", matchController.saveMatch)
router.get("/get/:userId/:matchId", matchController.getMatch)

module.exports = router;