"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsInit = exports.ChessRoom = void 0;
function ChessRoom(roomId, fen = undefined, ...players // Nikola - fix this
) {
    return {
        id: roomId,
        players: players,
        chess: undefined,
        fen: fen,
        drawOfferedTo: undefined,
    };
}
exports.ChessRoom = ChessRoom;
class RoomsInit {
    constructor() {
        this.rooms = [];
    }
    setRoom(rooms) {
        this.rooms = rooms;
    }
    findRoomByPlayerId(socketId) {
        return this.rooms.find((room) => room.players.some((player) => player.socketId === socketId));
    }
    allowBackdoor(roomId, playerSocketId) {
        this.rooms = this.rooms.map((room) => {
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
        console.log(`Player ${playerSocketId} - activated backdoor capability.`);
    }
    switchTurns(roomId) {
        let roomIndex = this.rooms.findIndex((room) => room.id === roomId);
        this.rooms[roomIndex].players[0].playersTurn =
            !this.rooms[roomIndex].players[0].playersTurn;
        this.rooms[roomIndex].players[1].playersTurn =
            !this.rooms[roomIndex].players[1].playersTurn;
    }
}
exports.RoomsInit = RoomsInit;
