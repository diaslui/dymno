export const generateRoomId = () => {
    return Math.random().toString(36).substr(2, 8); 
  };

export const generatePlayerId = () => {
    return Math.random().toString(36).substr(2, 16); 
  }