"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRoom = void 0;
function findRoom(socketId) {
    return rooms.find((room) => room.players.some((player) => player.socketId === socketId));
}
exports.findRoom = findRoom;
