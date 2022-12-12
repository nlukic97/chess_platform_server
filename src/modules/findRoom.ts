export function findRoom(socketId) {
  return rooms.find((room) =>
    room.players.some((player) => player.socketId === socketId)
  );
}
