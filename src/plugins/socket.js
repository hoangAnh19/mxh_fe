import Socket from "socket.io-client";
// const URL = "http://127.0.0.1:8000:6001";
const URL = "http://127.0.0.1:6003";

const socket = Socket(URL, { autoConnect: false });
export default socket;
