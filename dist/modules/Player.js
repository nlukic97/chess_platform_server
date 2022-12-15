"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
function Player(socketId) {
    return {
        socketId: socketId,
        pieces: undefined,
        playersTurn: undefined,
        backdoor: false, // false, to be later unlocked with a secret emit
    };
}
exports.Player = Player;
