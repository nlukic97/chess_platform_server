export function ChessRoom(
  roomId: String,
  fen: String | undefined = undefined,
  ...players // Nikola - fix this
) {
  return {
    id: roomId,
    players: players,
    chess: undefined,
    fen: fen,
    drawOfferedTo: undefined,
  };
}
