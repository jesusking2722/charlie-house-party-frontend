import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../constant";

const socket = io(SOCKET_BASE_URL, {
  autoConnect: true,
  transports: ["websocket"],
});

export default socket;
