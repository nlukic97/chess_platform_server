import { Socket } from "socket.io";

// Authentication method to the socket server (def not a propper auth, that could be done with this: passportjs.org/docs/downloads/html/   maybe)
export function Auth(socket: Socket) {
  if (socket.handshake.auth.token != "abc") {
    socket.emit("redirect", "/login");
    socket.disconnect(); // just in case
  } else {
    console.log(socket.id + " has connected");
    socket.emit("202-connected", socket.handshake.auth.token);
  }
}
