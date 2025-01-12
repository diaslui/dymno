export interface Photo{
    id: string;
    url: string;
}

export interface Member {
  id: string;
  nickname: string;
  photoId: string;
}

export interface Mode {
  modeId: string;
  displayName: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
}

export interface Room {
  id: string;
  members: Member[];
  owner: Member;
  size: number;
  mode?: Mode;
  startedAt: Date;
  status: "waiting" | "playing" | "finished";
}
