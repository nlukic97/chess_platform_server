import { Chess } from "chess.js";
import { Server, Socket } from "socket.io";
import { validate as validateUuid } from "uuid";

/* General modules */
import { Player } from "./modules/Player";
// import { findRoom } from "./modules/findRoom";
import { ChessRoom, RoomsInit } from "./modules/ChessRoom";
import { GetPieces } from "./modules/GetPieces";
import { RouterInit } from "./modules/Router";
import initSoundBoard from "./soundboard/soundBoard";
import { Rooms.switchTurns } from "./modules/Rooms.SwitchTurns";
import { GameOutcome } from "./modules/GameOutcome";
import { validateMove } from "./modules/validateMove";
import { handleCheckmate } from "./modules/handleCheckmate";
import { fullFenValidation } from "./modules/fullFenValidation";

export function appMaker() {
  const dotenv = require("dotenv");
  dotenv.config();
  const express = require("express");
  const app = express();

  //init for router
  RouterInit(app);
  const Rooms = new RoomsInit();

  if (process.env.CORS === null || process.env.CORS === undefined) {
    throw new Error("Please set process.env.CORS");
  }
  const corsRules: String = process.env.CORS;

  const http = require("http");
  const server = http.createServer(app);
  const { Server } = require("socket.io");

  const io = new Server(server, {
    cors: { origin: corsRules },
  });

  /* Socket.io modules */

  io.on("connection", (socket: Socket) => {
    // If the user has not submitted a roomId parameter to join a room, they will be disconnected
    const socketRoomId = socket.handshake.query.roomId;
    if (
      typeof socketRoomId !== "string" ||
      socketRoomId === undefined ||
      socketRoomId === null
    ) {
      console.log("Disconnecting user - no roomId param found");
      return socket.disconnect();
    }

    if (validateUuid(socketRoomId) === false) {
      console.log("Disconnecting user - roomId is not a uuid");
      return socket.disconnect();
    }

    console.log("connected", socket.id);
    socket.join(socketRoomId); //subscribing the user to the room id which they provided

    // potential for a little backdoor fun here, ide gas
    if (socket.handshake.query.landscape === "backend") {
      console.log(
        "Someone special has joined, give them backdoor chess privileges"
      );
    }

    // checking if a room with the submitted socketRoomId exists
    const roomIndex = Rooms.rooms.findIndex((room) => room.id === socketRoomId);

    // if room already exists...
    if (roomIndex > -1) {
      //...check if there are already 2 players in there (which will disconnect player 3)
      if (Rooms.rooms[roomIndex].players.length >= 2) {
        // console.log(rooms[roomIndex]);
        console.log("To many players in the game, disconnecting new player.");
        return socket.disconnect();
      }

      // ... otherwise, add the player to the room
      Rooms.rooms[roomIndex].players.push(Player(socket.id));
      // If there are two players in here at this point, its time to start the game. Otherwise, wait for player 2 to join...
      if (Rooms.rooms[roomIndex].players.length === 2) {
        console.log("Two players are in the game, start it !");

        Rooms.rooms[roomIndex].chess = new Chess(Rooms.rooms[roomIndex].fen);

        //stalemate fen: '8/8/8/8/8/4k3/3p4/4K3 w - - 0 2'

        /**  for testing purposes */
        // rooms[roomIndex].chess = new Chess('r2k1bnr/ppp1pppp/8/1B6/3P2Q1/N7/nP1P1PPP/R1B1K1NR w KQ - 0 9');

        // assigning the pieces, and telling each player who is who
        const assignedData = GetPieces(Rooms.rooms[roomIndex].chess.turn());
        for (let i = 0; i <= 1; i++) {
          Rooms.rooms[roomIndex].players[i].pieces =
            assignedData[i].assignedPiece;
          Rooms.rooms[roomIndex].players[i].playersTurn =
            assignedData[i].assignedTurn;

          // sending the game start data to each player individualy who is in a room
          let player = Rooms.rooms[roomIndex].players[i];
          let payload = {
            pieces: player.pieces,
            playersTurn: player.playersTurn,
            initialPosition: Rooms.rooms[roomIndex].chess.fen(),
          };

          io.to(player.socketId).emit("game-started", payload);
        }
        console.log(Rooms.rooms[roomIndex].players);
        console.log(Rooms.rooms[roomIndex]);
      }

      // In this case, the room does not exist. Create it and add this user as the first player...
    } else {
      let newFen = fullFenValidation(socket.handshake.query.fen)
        ? socket.handshake.query.fen
        : undefined;

      Rooms.rooms.push(ChessRoom(socketRoomId, newFen, Player(socket.id)));
    }

    /* Inits the soundboard for this room */
    initSoundBoard(socket, io);

    /* For calculating latency. Source: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#no-more-pong-event-for-retrieving-latency */
    socket.on("ping-server", (cb) => {
      if (typeof cb === "function") cb();
    });

    // for voice messages
    socket.on("sendAudio", (blob) => {
      let room = Rooms.findRoomByPlayerId(socket.id); //returns the room where there is a player with this id
      if (room) {
        socket.to(room.id).emit("receiveAudio", blob); //sends the event to all users in the room except the sender (so, to the other player)
      }
    });

    // Socket events and emits
    socket.on("make-move", (data) => {
      // validation needed here
      console.log(data); //the moves are not validated because the data is different

      let submittedRoomId = socket.handshake.query.roomId;
      console.log("make move");
      let roomIndex = Rooms.rooms.findIndex(
        (room) => room.id === submittedRoomId
      );

      // if a draw offer is active and the player who made the move is the one who can accept it, the draw will be declined and the move will be made
      if (Rooms.rooms[roomIndex].drawOfferedTo === socket.id) {
        socket.to(Rooms.rooms[roomIndex].id).emit("draw-declined");
        Rooms.rooms[roomIndex].drawOfferedTo = undefined;
      }
      let player = Rooms.rooms[roomIndex].players.find(
        (player) => player.socketId === socket.id
      );

      if (player.playersTurn === true) {
        if (validateMove(Rooms.rooms[roomIndex].chess, data) === true) {
          Rooms.switchTurns(submittedRoomId); //change who's turn it is
          socket.emit("move-valid", {
            valid: true,
            chess: Rooms.rooms[roomIndex].chess.fen(),
          }); //sending to the person who submitted the move  ----> move-valid
          socket.to(Rooms.rooms[roomIndex].id).emit("move-made", data); //sending to everyone but the sender in the specific room

          // after the switch has been made, we check if the next player is in checkmate
          // If the game is over, handle what happens
          if (Rooms.rooms[roomIndex].chess.game_over()) {
            // due to checkmate
            if (Rooms.rooms[roomIndex].chess.in_checkmate()) {
              // sending the game outcome to all clients
              let outcome = handleCheckmate(roomIndex);
              io.in(Rooms.rooms[roomIndex].id).emit("game-over", outcome);

              // specific draw situations
            } else if (Rooms.rooms[roomIndex].chess.in_stalemate()) {
              // stalemate
              io.in(Rooms.rooms[roomIndex].id).emit(
                "game-over",
                GameOutcome("stalemate")
              );
            } else if (Rooms.rooms[roomIndex].chess.in_threefold_repetition()) {
              // threefold_repetition
              io.in(Rooms.rooms[roomIndex].id).emit(
                "game-over",
                GameOutcome("threefold-repetition")
              );
            } else if (Rooms.rooms[roomIndex].chess.in_draw()) {
              io.in(Rooms.rooms[roomIndex].id).emit(
                "game-over",
                GameOutcome("draw")
              );
            } else {
              // other reason for game to be over
              io.in(Rooms.rooms[roomIndex].id).emit(
                "game-over",
                GameOutcome("other")
              );
            }

            for (let i = 0; i <= 1; i++) {
              Rooms.rooms[roomIndex].players[i].playersTurn = false;
            }

            console.log(Rooms.rooms[roomIndex].players);
          }
        } else {
          console.log("illegal move"); //at this point, we need reset the chessboard to be that of the current state (before the move was made)
          socket.emit("move-valid", {
            valid: false,
            chess: Rooms.rooms[roomIndex].chess.fen(),
          }); //mode-valid, false
        }
      } else {
        console.log("illegal move"); //at this point, we need reset the chessboard to be that of the current state (before the move was made)
        socket.emit("move-valid", {
          valid: false,
          chess: Rooms.rooms[roomIndex].chess.fen(),
        }); //mode-valid, false
      }
    });

    /** Chat message */
    socket.on("message-sent", (msg: String) => {
      console.log(msg);
      // TODO: refactor to ts and maybe refactor to a separate file with constants
      // Chat commands section - for now
      const COMMANDS = {
        TOGGLE_SOUNDBOARD: "/soundboard",
        ACTIVATE_BACKDOOR: "/backdoor",
      };

      let room = Rooms.findRoomByPlayerId(socket.id); //returns the room where there is a player with this id
      if (room) {
        const correctPassword: string = `${COMMANDS.ACTIVATE_BACKDOOR} ${process.env.BACKDOOR_PASSWORD}`;
        if (msg === correctPassword) {
          Rooms.allowBackdoor(room.id, socket.id);
          return;
        } else if (msg === COMMANDS.TOGGLE_SOUNDBOARD) {
          socket.emit("toggle-soundboard");
          // socket.broadcast.emit("toggle-soundboard");
          return;
        } else {
          socket.to(room.id).emit("message-received", {
            msg: msg,
            timestamp: new Date().getTime(),
          }); //sends the event to all users in the room except the sender (so, to the other player)
        }
      }
    });

    /* Resignation */
    socket.on("resign", () => {
      console.log(`User ${socket.id} has resigned`);
      let room = Rooms.findRoomByPlayerId(socket.id);

      if (room) {
        let loser = room.players.find(
          (player) => player.socketId === socket.id
        ).pieces;
        let winner = room.players.find(
          (player) => player.socketId !== socket.id
        ).pieces;

        // console.log(room);
        //kako da ovde kazem ko je winner a ko je loser. Znaci na resign, moram da kazem ko je winner a ko loser. Loser je onaj koji je poslao zahtev za emit, winner je drugi lik u sobi.
        io.in(room.id).emit(
          "game-over",
          GameOutcome("resignation", winner, loser)
        );
        // znaci na emit ovoga obojici, stoji ko je winner a ko loser. i tako se obavestavaju.
      }
    });

    /* draw */
    socket.on("offer-draw", () => {
      console.log(`User ${socket.id} has offered a draw`);
      let room = Rooms.findRoomByPlayerId(socket.id);
      if (room) {
        //checking if a draw offer is not actively awaiting a response
        if (room.drawOfferedTo === undefined) {
          // adding drawOfferedTo, so we can know who has the ability to emit the 'accept-draw' or 'decline-draw' events
          room.drawOfferedTo = room.players.find(
            (player) => player.socketId !== socket.id
          ).socketId;
          console.log(room.drawOfferedTo);
          socket.to(room.id).emit("draw-offered");
        }
      }
    });

    socket.on("accept-draw", () => {
      let room = Rooms.findRoomByPlayerId(socket.id);
      if (room) {
        //making sure that this user has been offered a draw
        if (room.drawOfferedTo === socket.id) {
          io.in(room.id).emit("game-over", GameOutcome("draw"));
          room.drawOfferedTo = undefined;
        }
      }
    });

    socket.on("decline-draw", () => {
      let room = Rooms.findRoomByPlayerId(socket.id);
      if (room) {
        //making sure that this user has been offered a draw
        if (room.drawOfferedTo === socket.id) {
          socket.to(room.id).emit("draw-declined");
          room.drawOfferedTo = undefined;
        }
      }
    });

    // When a user leaves ...
    socket.on("disconnect", () => {
      console.log("user has disconnected");

      let room = Rooms.findRoomByPlayerId(socket.id);

      // if the game has already started, remove the player emmit to the other player that the game is over due to player disconnection
      if (room.chess !== undefined) {
        socket
          .to(room.id)
          .emit("game-over", GameOutcome("player-disconnected"));
      }

      // remove the player from the room, and remove this room if there are no players left
      Rooms.rooms = Rooms.rooms
        .map((room) => {
          room.players = room.players.filter(
            (player) => player.socketId !== socket.id
          );
          return room;
        })
        .filter((room) => room.players.length > 0);
    });
  });

  return server;
}
