import { NextApiRequest, NextApiResponse } from "next";
import { rooms } from "#/app/storage"; // Importando o armazenamento das salas

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { roomId } = req.query;

    if (!roomId || typeof roomId !== "string") {
      return res.status(400).json({ error: "Room ID is required." });
    }

    const roomExists = rooms.some((room) => room.id === roomId);

    if (roomExists) {
      return res.status(200).json({ valid: true, message: "Room is valid." });
    } else {
      return res.status(404).json({ valid: false, message: "Room not found." });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
