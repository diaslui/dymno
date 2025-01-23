import express, { Request, Response } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { Mode, Room } from '../modules/core/types';

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

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

app.get('/validate-room', (req: Request, res: Response) => {
  const { roomId } = req.query;

  if (typeof roomId !== 'string') {
    return res.status(400).json({ message: 'Invalid roomId' });
  }

  if (!verifyIfRoomExistsById(roomId)) {
    return res.status(404).json({ message: 'Room not found' });
  }

  return res.status(200).json({ message: 'Room found' });
});

app.post('/create-room', (req: Request, res: Response) => {
  const { room } = req.body;

  if (!room || typeof room !== 'object' || !room.id) {
    return res.status(400).json({ message: 'Invalid room data' });
  }

  if (verifyIfRoomExistsById(room.id)) {
    return res.status(400).json({ message: 'Room already exists' });
  }

  addRoom(room as Room);
  return res.status(200).json({ message: 'Room created' });
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.emit('rooms', getRooms());

  socket.on('create-room', (room: Room) => {
    if (verifyIfRoomExistsById(room.id)) {
      socket.emit('error', 'Room already exists');
      return;
    }
    addRoom(room);
    io.emit('rooms', getRooms()); 
    socket.emit('room-created', 'Room created');
  });

  socket.on('validate-room', (roomId: string) => {
    const room = verifyIfRoomExistsById(roomId);
    if (room) {
      socket.emit('room-valid', 'Room found');
    } else {
      socket.emit('error', 'Room not found');
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});
