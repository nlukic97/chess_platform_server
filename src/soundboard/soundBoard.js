const { emitSound } = require('./soundboardModules/emitSound')

module.exports = function(socket, io){
    socket.on('dame-dameyu',()=> emitSound(socket,io, "dame-dameyu"))
    socket.on("uskliknimo", () => emitSound(socket, io, "uskliknimo"))
    socket.on("kanye", ()=> emitSound(socket, io, "kanye"))
    
    console.log("Soundboard initiated.")
}