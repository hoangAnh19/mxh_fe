import Socket from "socket.io-client";
const URL = "http://127.0.0.1:80:6001";
const socket = Socket(URL, { autoConnect: false });
export default socket;
