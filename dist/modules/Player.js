"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowBackdoorForPlayer = exports.Player = void 0;
function Player(socketId) {
    return {
        socketId: socketId,
        pieces: undefined,
        playersTurn: undefined,
        backdoor: false, // false, to be later unlocked with a secret emit
    };
}
exports.Player = Player;
// Setting the player's backdoor property to "true" if they sent the correct password
function allowBackdoorForPlayer(roomId, playerSocketId) {
    rooms = rooms.map((room) => {
        if (room.id == roomId) {
            const players = room.players.map((player) => {
                if (player.socketId == playerSocketId) {
                    return Object.assign(Object.assign({}, player), { backdoor: true });
                }
                else {
                    return player;
                }
            });
            return Object.assign(Object.assign({}, room), { players });
        }
        else {
            return room;
        }
    });
}
exports.allowBackdoorForPlayer = allowBackdoorForPlayer;
