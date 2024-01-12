import io from "socket.io-client";
import KEYS from "../types/SocketAPI";
import deviceStore from "../store/devices";

const dev = false;

const url = dev ? "http://127.0.0.1:3000" : "http://47.109.52.116:4001";

const options = {
  withCredentials: true,
  // transports: ['websocket'],
};

const socket = io(url, options);

socket.on("connect", () => {
  console.log("Connected: ", socket.connected);
  console.log("With id:", socket.id);
});

socket.on("connect_error", (err: any) => {
  console.log("Connect error:", err);
  // socket.connect();
});

socket.on("disconnect", (reason: any) => {
  console.log("Disconnect from server");
  if (reason === "io server disconnect") {
    socket.connect();
  }
});

socket.on(KEYS.EVENT_UPDATE_CONTROLLER_DATA, (args: any) => {
  // console.log(args);
  deviceStore.handleEVENT_UPDATE_CONTROLLER_DATA(args);
});

socket.connect();

export default socket;
