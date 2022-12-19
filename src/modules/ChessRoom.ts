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

export class RoomsInit {
  public rooms = [];

  setRoom(rooms) {
    this.rooms = rooms;
  }

  findRoomByPlayerId(socketId: string) {
    return this.rooms.find((room) =>
      room.players.some((player) => player.socketId === socketId)
    );
  }

  allowBackdoor(roomId: string, playerSocketId: string) {
    this.rooms = this.rooms.map((room) => {
      if (room.id == roomId) {
        const players = room.players.map((player) => {
          if (player.socketId == playerSocketId) {
            return { ...player, backdoor: true };
          } else {
            return player;
          }
        });
        return { ...room, players };
      } else {
        return room;
      }
    });

    console.log(`Player ${playerSocketId} - activated backdoor capability.`);
  }

  switchTurns(roomId: String) {
    let roomIndex = this.rooms.findIndex((room) => room.id === roomId);
    this.rooms[roomIndex].players[0].playersTurn =
      !this.rooms[roomIndex].players[0].playersTurn;

    this.rooms[roomIndex].players[1].playersTurn =
      !this.rooms[roomIndex].players[1].playersTurn;
  }
}
