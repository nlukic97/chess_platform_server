export function Player(socketId) {
  return {
    socketId: socketId,
    pieces: undefined, //assigned upon game start
    playersTurn: undefined, //assigned upon game start
    backdoor: false, // false, to be later unlocked with a secret emit
  };
}
