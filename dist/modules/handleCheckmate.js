"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCheckmate = void 0;
const GameOutcome_1 = require("./GameOutcome");
function handleCheckmate(roomIndex) {
    let winner = rooms[roomIndex].players.find((player) => player.playersTurn === false).pieces;
    let loser = rooms[roomIndex].players.find((player) => player.playersTurn === true).pieces;
    return (0, GameOutcome_1.GameOutcome)("checkmate", winner, loser);
}
exports.handleCheckmate = handleCheckmate;
