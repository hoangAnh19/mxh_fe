import Socket from "socket.io-client";
// const URL = "http://127.0.0.1:80:6003";
const URL = "https://www.google.com/";
const socket = Socket(URL, { autoConnect: true });
export default socket;
