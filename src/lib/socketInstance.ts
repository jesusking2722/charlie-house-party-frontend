import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../constant";
import { jwtDecode } from "jwt-decode";

let socket: any = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_BASE_URL, {
      autoConnect: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      const token = window.localStorage.getItem("Authorization");
      if (token) {
        const decoded = jwtDecode(token) as any;
        socket.emit("login", decoded.id);
      }
    });
  }
  return socket;
};

export default getSocket();
