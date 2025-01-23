const express = require('express');

const port = process.env.PORT || 8000;
const app = express();


const rooms = []

const getRooms = () => {
    return rooms;
}

const addRoom = (room) => {
    rooms.push(room);
}

const verifyIfRoomExistsById = (roomId) => {
    return rooms.find(r => r.id === roomId);
}

const removeRoom = (room) => {
    rooms = rooms.filter(r => r !== room);
}

app.get('/validate-room', (req, res) => {
    const { roomId } = req.query;

    if (!verifyIfRoomExistsById(roomId)) {
        return res.status(404).json({ message: 'Room not found' });
    }

    return res.status(200).json({ message: 'Room found' });
});

app.post('/create-room', (req, res) => {
    const { room } = req.body;

    if (verifyIfRoomExistsById(room.id)) {
        return res.status(400).json({ message: 'Room already exists' });
    }

    addRoom(room);
    return res.status(200).json({ message: 'Room created' });
});

app.listen(port, () => {
    console.log(`running in * ${port}`);
});