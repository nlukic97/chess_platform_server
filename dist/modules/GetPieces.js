"use strict";
/**
 * Returns an array of objects.
 * Each object contains data to be assigned to players who are about to start a game.
 * The data is: which piece the player is, and if it's their turn. ('white' pieces go first, so the turn will be 'true')
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPieces = void 0;
// Nikola - not sure what "turn" is
function GetPieces(turn) {
    let randNum = Math.floor(Math.random() * (2 - 0) + 0); // 0 or 1
    if (randNum === 0) {
        return [
            { assignedPiece: "black", assignedTurn: "b" === turn },
            { assignedPiece: "white", assignedTurn: "w" === turn },
        ];
    }
    else {
        return [
            { assignedPiece: "white", assignedTurn: "w" === turn },
            { assignedPiece: "black", assignedTurn: "b" === turn },
        ];
    }
}
exports.GetPieces = GetPieces;
