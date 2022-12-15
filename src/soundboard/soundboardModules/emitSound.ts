import { Socket } from "socket.io";
import { findRoom } from "../../modules/findRoom";

// Nikola - no sure what "io" is
export function emitSound(socket: Socket, io, emitMsg: String) {
  let room = findRoom(socket.id);
  if (room) {
    io.in(room.id).emit(emitMsg);
  }
}
