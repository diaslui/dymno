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

const io = new SocketIOServer(server);

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

const getRoomById = (roomId: string) => {
  return rooms.find((room) => (room.id = roomId));
};

app.get("/validate-room", (req: Request, res: Response) => {
  const { roomId } = req.query;

  console.log("Validating room ->", roomId)

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
  console.log(`A new room created. -> %Id : ${room.id}`)
  return res.status(200).json(room);
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("rooms", getRooms());

  socket.on("create-room", (room: Room) => {
    if (verifyIfRoomExistsById(room.id)) {
      socket.emit("error", "Room already exists");
      return;
    }
    addRoom(room);
    io.emit("rooms", getRooms());
    socket.emit("room-created", "Room created");
  });

  socket.on("validate-room", (roomId: string) => {
    const room = verifyIfRoomExistsById(roomId);
    if (room) {
      socket.emit("room-valid", "Room found");
    } else {
      socket.emit("error", "Room not found");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
