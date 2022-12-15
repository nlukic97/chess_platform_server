"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emitSound_1 = require("./soundboardModules/emitSound");
// Nikola - not sure what "io" is
function initSoundBoard(socket, io) {
    socket.on("dame-dameyu", () => (0, emitSound_1.emitSound)(socket, io, "dame-dameyu"));
    socket.on("uskliknimo", () => (0, emitSound_1.emitSound)(socket, io, "uskliknimo"));
    socket.on("kanye", () => (0, emitSound_1.emitSound)(socket, io, "kanye"));
    console.log("Soundboard initiated.");
}
exports.default = initSoundBoard;
