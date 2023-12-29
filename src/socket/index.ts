import { io } from "socket.io-client";

const url = "https://127.0.0.1:3000"

const socket = io(url,{
   transports: ['websocket']
});

socket.on("connect", () => {
  console.log("Connected: ", socket.connected);
  console.log("With id:", socket.id);
});
socket.on("connect_error", (err) => {
  console.log("Connect error:",err);
  socket.connect()
});
socket.on("disconnect", (reason) => {
  console.log("Disconnect from server");
  if (reason === "io server disconnect") {
    socket.connect();
  }
});

export default socket;
