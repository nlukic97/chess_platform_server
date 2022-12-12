export function ChessRoom(roomId, fen = undefined, ...players) {
  return {
    id: roomId,
    players: players,
    chess: undefined,
    fen: fen,
    drawOfferedTo: undefined,
  };
}
