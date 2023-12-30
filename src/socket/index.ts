import io from "socket.io-client"

const url = "http://47.109.52.116:4001";

const options = {
  // transports: ['websocket'],
};

const socket = io(url, options);

socket.on("connect", () => {
  console.log("Connected: ", socket.connected);
  console.log("With id:", socket.id);
});

socket.on("connect_error", (err:any) => {
  console.log("Connect error:", err);
  // socket.connect();
});

socket.on("disconnect", (reason:any) => {
  console.log("Disconnect from server");
  if (reason === "io server disconnect") {
    socket.connect();
  }
});

socket.connect()

export default socket;

