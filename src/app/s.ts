import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";


let io: SocketServer | undefined;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.io) {
    console.log("Inicializando Socket.IO...");
    const httpServer: HttpServer = res.socket.server as any;
    io = new SocketServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Usuário conectado:", socket.id);

      socket.on("message", (msg) => {
        console.log("Mensagem recebida:", msg);
        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Usuário desconectado:", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
