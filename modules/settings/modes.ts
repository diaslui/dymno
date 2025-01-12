import { Mode } from "#/app/types";

export const modes: Array<Mode> = [
    {
        modeId: "0d",
        displayName: "Dominó Clássico",
        description: "Jogo de dominó tradicional.",
        minPlayers: 2,
        maxPlayers: 4
    },
    {
        modeId: "0dt",
        displayName: "Dominó Trigonométrico",
        description: "Jogo de dominó com peças contendo expressões trigonométricas e suas respectivas respostas.",
        minPlayers: 2,
        maxPlayers: 4
    }
]