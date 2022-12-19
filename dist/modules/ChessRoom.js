"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessRoom = void 0;
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
