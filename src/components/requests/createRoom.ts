import axios from 'axios';
import { Member } from '#/modules/core/types';


export async function createRoomRequest(owner: Member) {
    try{
        const response = await axios.post("http://127.0.0.1:8000/create-room", { owner });
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
    }