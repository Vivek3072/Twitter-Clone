import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://twitter-clone-zwb6.onrender.com/"
    : "http://localhost:5001/";

export const socket = io(URL);
