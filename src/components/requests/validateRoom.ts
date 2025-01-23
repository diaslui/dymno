import axios from "axios";
import { Room } from "#/modules/core/types";


export async function validateRoomRequest(roomId: string): Promise<Room | undefined> {
  try {
    console.log(`Testing room -> ${roomId}`)
    const response = await axios.get(`http://127.0.0.1:8000/validate-room?roomId=${roomId}`, {      });

    if (response.status !== 200) {
      return undefined;
    }
    return response.data as Room;
  } catch (error) {
    console.error(error);
    return undefined; 
  }
}
