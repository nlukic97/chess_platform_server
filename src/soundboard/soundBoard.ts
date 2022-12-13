import { Socket } from "socket.io";
import { emitSound } from "./soundboardModules/emitSound";

// Nikola - not sure what "io" is
export default function initSoundBoard(socket: Socket, io) {
  socket.on("dame-dameyu", () => emitSound(socket, io, "dame-dameyu"));
  socket.on("uskliknimo", () => emitSound(socket, io, "uskliknimo"));
  socket.on("kanye", () => emitSound(socket, io, "kanye"));

  console.log("Soundboard initiated.");
}
