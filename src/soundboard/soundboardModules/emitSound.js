const { findRoom } = require('../../server_modules/findRoom')

module.exports = {
    emitSound: function(socket, io, emitMsg){
        let room = findRoom(socket.id)
        if(room) {
            io.in(room.id).emit(emitMsg)
        }
    },
    
}