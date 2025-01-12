import { NextApiRequest, NextApiResponse } from "next";
import { generateRoomId } from "../../../modules/utils/id";
import { rooms } from "#/app/storage";
import { Room, Member } from "#/app/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { owner }: { owner: Member } = req.body;

    if (!owner) {
      return res.status(400).json({ error: "Verify the fields." });
    }

    const id = generateRoomId();
    if (rooms.find((room) => room.id === id)) {
      return res.status(500).json({ error: "Try again." });
    }
    const room: Room = {
      id,
      members: [],
      owner,
      size: 4,
      startedAt: new Date(),
      status: "waiting",
    };
    return res.status(201).json(room);
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ error: `Method not allowed.` });
}
