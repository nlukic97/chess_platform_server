export function Player(socketId: String) {
  return {
    socketId: socketId,
    pieces: undefined, //assigned upon game start
    playersTurn: undefined, //assigned upon game start
    backdoor: false, // false, to be later unlocked with a secret emit
  };
}

// Setting the player's backdoor property to "true" if they sent the correct password
export function allowBackdoor(roomId, playerSocketId) {
  rooms = rooms.map((room) => {
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
}
