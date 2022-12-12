module.exports = {
    findRoom:function(socketId){
        return rooms.find(room=> room.players.some(player=> player.socketId === socketId))
    }
}