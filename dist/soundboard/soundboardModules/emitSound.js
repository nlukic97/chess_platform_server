"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSound = void 0;
const findRoom_1 = require("../../modules/findRoom");
// Nikola - no sure what "io" is
function emitSound(socket, io, emitMsg) {
    let room = (0, findRoom_1.findRoom)(socket.id);
    if (room) {
        io.in(room.id).emit(emitMsg);
    }
}
exports.emitSound = emitSound;
