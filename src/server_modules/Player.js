module.exports = {
    Player:function(socketId){
        return {
            socketId: socketId,
            pieces:undefined, //assigned upon game start
            playersTurn:undefined //assigned upon game start
        }
    }
}