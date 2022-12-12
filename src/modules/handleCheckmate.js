const {GameOutcome} = require('./GameOutcome')

module.exports = {
    handleCheckmate:function(roomIndex){
        let winner = rooms[roomIndex].players.find(player=> player.playersTurn === false).pieces
        let loser = rooms[roomIndex].players.find(player=> player.playersTurn === true).pieces
        return GameOutcome('checkmate',winner,loser)
      }
}