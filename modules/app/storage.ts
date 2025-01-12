import { Room } from './types';

export const rooms: Array<Room> = [];

export const findRoomById = (roomId: string) => rooms.find((room) => room.id === roomId);

export const getRooms = () => rooms;