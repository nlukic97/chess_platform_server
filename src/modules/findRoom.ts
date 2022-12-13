export function findRoom(socketId: string) {
  return rooms.find((room) =>
    room.players.some((player) => player.socketId === socketId)
  );
}
