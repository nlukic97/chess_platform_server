import { findRoom } from "../../modules/findRoom";

export function emitSound(socket, io, emitMsg) {
  let room = findRoom(socket.id);
  if (room) {
    io.in(room.id).emit(emitMsg);
  }
}
