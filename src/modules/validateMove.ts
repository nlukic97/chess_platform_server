/**checks if the submitted move is amongs the possible moves.
 * Takes a chess (object from within a room) and a move(string)
 * in order to confirm if the submitted move is possible
 */

export function validateMove(chess, move) {
  const moveOutcome = chess.move(move);
  return moveOutcome === null ? false : true;
}
