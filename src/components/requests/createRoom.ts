import axios from 'axios';
import { Member } from '#/modules/core/types';


export async function createRoomRequest(owner: Member) {
    try{
        const response = await axios.post("/api/rooms/create", { owner });
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
    }