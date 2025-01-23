import * as react from "react";
import { LucideProps } from "lucide-react";

export interface Avatar{
    id: string;
    url: string;
}

export interface Member {
  id: string;
  nickname: string;
  avatarId: string;
  socketId?: string;
}

export interface Mode {
  modeId: string;
  label: string;
  description: string;
  icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
  minPlayers: number;
  maxPlayers: number;
}

export interface Room {
  id: string;
  members: Member[];
  owner: Member | undefined;
  createdBy: Member;
  size: number;
  mode?: Mode;
  startedAt: Date;
  status: "waiting" | "playing" | "finished";
}
