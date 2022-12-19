"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOutcome = void 0;
function GameOutcome(reason = undefined, winner = undefined, loser = undefined) {
    return {
        reason,
        winner,
        loser,
    };
}
exports.GameOutcome = GameOutcome;
