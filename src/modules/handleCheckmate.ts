import { GameOutcome } from "./GameOutcome";

export function handleCheckmate(roomIndex: Number) {
  let winner = rooms[roomIndex].players.find(
    (player) => player.playersTurn === false
  ).pieces;
  let loser = rooms[roomIndex].players.find(
    (player) => player.playersTurn === true
  ).pieces;
  return GameOutcome("checkmate", winner, loser);
}
