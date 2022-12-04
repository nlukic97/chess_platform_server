function switchTurns(roomId){
    let roomIndex = rooms.findIndex(room=> room.id === roomId)
    rooms[roomIndex].players[0].playersTurn = !rooms[roomIndex].players[0].playersTurn
    rooms[roomIndex].players[1].playersTurn = !rooms[roomIndex].players[1].playersTurn
  }

  module.exports = { switchTurns }