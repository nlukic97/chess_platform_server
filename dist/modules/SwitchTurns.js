"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTurns = void 0;
//Nikola - i think roomId a string.
// Nikola - this should probably be part of the "room" class
function switchTurns(roomId) {
    let roomIndex = rooms.findIndex((room) => room.id === roomId);
    rooms[roomIndex].players[0].playersTurn =
        !rooms[roomIndex].players[0].playersTurn;
    rooms[roomIndex].players[1].playersTurn =
        !rooms[roomIndex].players[1].playersTurn;
}
exports.switchTurns = switchTurns;
