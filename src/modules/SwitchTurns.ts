//Nikola - i think roomId a string.
// Nikola - this should probably be part of the "room" class
export function switchTurns(roomId: String) {
  let roomIndex = rooms.findIndex((room) => room.id === roomId);
  rooms[roomIndex].players[0].playersTurn =
    !rooms[roomIndex].players[0].playersTurn;

  rooms[roomIndex].players[1].playersTurn =
    !rooms[roomIndex].players[1].playersTurn;
}
