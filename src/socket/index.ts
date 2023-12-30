import { io } from "socket.io-client";
import { cert, key } from "./key";

const url = "https://47.109.52.116:4001";

const options = {
  rejectUnauthorized: false, // This is required if your server uses a self-signed certificate
  secure: true,
  key: key,
  cert: cert,
  transports: ['websocket'],
};

const socket = io(url, options);

socket.on("connect", () => {
  console.log("Connected: ", socket.connected);
  console.log("With id:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("Connect error:", err);
  socket.connect();
});

socket.on("disconnect", (reason) => {
  console.log("Disconnect from server");
  if (reason === "io server disconnect") {
    socket.connect();
  }
});

socket.connect()

export default socket;
