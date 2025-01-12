import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

let io: Server;

export default function handler(req, res) {
  if (req.method === "GET") {
    if (!io) {
      io = new Server(res.socket.server);
      io.on("connection", (socket) => {
        console.log("A new client connected");

        socket.on("message", (message) => {
          console.log("msg recv:", message);
        });
      });
    }
    res.end();
  }
}
