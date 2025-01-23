import { Mode } from "#/modules/core/types";
import { Pencil, Film, Dice6, Dices } from "lucide-react";

export const defaultModeId = "0dt";

export const modes: Array<Mode> = [
  {
    modeId: "0d",
    label: "Dominó Clássico",
    description: "Jogo de dominó tradicional.",
    icon: Dice6,
    minPlayers: 2,
    maxPlayers: 4,
  },
  {
    modeId: "0dt",
    label: "Dominó Trigonométrico",
    description:
      "Jogo de dominó com peças contendo expressões trigonométricas e suas respectivas respostas.",
    icon: Dices,
    minPlayers: 2,
    maxPlayers: 4,
  },
];
