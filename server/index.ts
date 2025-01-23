import express, { Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import { Member, Mode, Room } from "../modules/core/types";
import { modes, defaultModeId } from "../modules/settings/modes";
import { generateRoomId, generatePlayerId } from "../modules/utils/id";
import cors from "cors";

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    methods: ["GET", "POST"],
  })
);

const server = app.listen(port, () => {
  console.log(`Running on * ${port}`);
});

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    allowedHeaders: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
let rooms: Room[] = [];

const getRooms = (): Room[] => {
  return rooms;
};

const addRoom = (room: Room): void => {
  rooms.push(room);
};

const verifyIfRoomExistsById = (roomId: string): Room | undefined => {
  return rooms.find((r) => r.id === roomId);
};

const removeRoom = (room: Room): void => {
  rooms = rooms.filter((r) => r.id !== room.id);
};

const socketIsRoomMember = (socketId: string): boolean => {
  return rooms.some((r) => r.members.some((m) => m.id === socketId));
};

const getRoomById = (roomId: string) => {
  return rooms.find((room) => (room.id = roomId));
};

app.get("/validate-room", (req: Request, res: Response) => {
  const { roomId } = req.query;

  console.log("Validating room ->", roomId);

  if (typeof roomId !== "string") {
    return res.status(400).json({ message: "Invalid roomId" });
  }

  if (!verifyIfRoomExistsById(roomId)) {
    return res.status(404).json({ message: "Room not found" });
  }

  const room: Room | undefined = getRoomById(roomId);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  return res.status(200).json(room);
});

app.post("/create-room", (req: Request, res: Response) => {
  const { owner }: { owner: Member } = req.body;


  if (!owner || typeof owner !== "object") {
    return res.status(400).json({ message: "Invalid room data" });
  }

  if (owner.socketId && socketIsRoomMember(owner.socketId)) {
    return res.status(400).json({ message: "You are already in a room" });
  }

  const room: Room = {
    id: generateRoomId(),
    members: [],
    owner: undefined,
    createdBy: owner,
    size: 4,
    startedAt: new Date(),
    status: "waiting",
    mode: modes.find((mode) => mode.modeId == defaultModeId),
  };

  addRoom(room as Room);
  console.log(`A new room created. -> %Id : ${room.id}`);
  return res.status(200).json(room);
});

io.on("connection", (socket) => {

  const emitToRoomMembers = (roomId: string, event: string, data: object) => {

    const room = verifyIfRoomExistsById(roomId);
    if (!room) {
      return;
    }

    room.members.forEach((member) => {
      console.log("Emitting to member ->", member.socketId);

      if (member.socketId) {
        io.to(member.socketId).emit(event, data);
      }
    });
  };


  console.log("A user connected:", socket.id);

  socket.on("join-room", (data) => {
    const { member, roomId }: {member:Member, roomId: string} = data;
    console.log("Joining room:", roomId);
    const room = verifyIfRoomExistsById(roomId);
    if (!room) {
      socket.emit("error", "Room not found");
      return;
    }

    if (room.members.length >= room.size) {
      socket.emit("error", "Room is full");
      return;
    }

    if (room.members.some((m) => m.id === member.id)) {
      socket.emit("error", "You are already in this room");
      return;
    }

    if (!member.socketId) {
      member.socketId = socket.id;
    }

    room.members.push(member);
    if (!room.owner) {
      room.owner = member;
    }

    console.log("accepted member ->", member);
    
    emitToRoomMembers(roomId, "room-update", room);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    if (socketIsRoomMember(socket.id)) {
      console.log("socket is room member")
      const room = rooms.find((r) => r.members.some((m) => m.socketId === socket.id));
      if (!room) {
        return;
      }

      room.members = room.members.filter((m) => m.socketId !== socket.id);

      console.log("room members updated.")

      if (room.members.length === 0) {
        removeRoom(room);
      } else {
        if (room.owner?.socketId === socket.id) {
          room.owner = room.members[0];
        }
        emitToRoomMembers(room.id, "room-update", room);
      }
    }


  });
});
