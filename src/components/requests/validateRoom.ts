import axios from "axios";


export async function validateRoomRequest(roomId: string) {
  try {
    const response = await axios.get("/api/rooms/validate", {
      params: { roomId },
    });

    if (response.status !== 200) {
      return undefined;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined; 
  }
}
