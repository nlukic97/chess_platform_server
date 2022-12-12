import { emitSound } from "./soundboardModules/emitSound";

export default function initSoundBoard(socket, io) {
  socket.on("dame-dameyu", () => emitSound(socket, io, "dame-dameyu"));
  socket.on("uskliknimo", () => emitSound(socket, io, "uskliknimo"));
  socket.on("kanye", () => emitSound(socket, io, "kanye"));

  console.log("Soundboard initiated.");
}
