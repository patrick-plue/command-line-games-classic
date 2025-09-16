import { createInterface, type Interface } from 'readline';
import {
    playCaesarCipher,
    playPigLatin,
    playRockPaperScissors,
} from './games/index.js';

export type CLIGame = {
    name: string;
    callback: (state: State) => void;
};

export type State = {
    games: Record<string, CLIGame>;
    rl: Interface;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `Choose a game: ${Object.entries(getGames())
            .map(([key, value]) => `\n ${key} - ${value.name}`)
            .join(' ')}\n > `,
    });

    function getGames() {
        return {
            rps: {
                name: 'Rock, Paper, Scisssors',
                callback: playRockPaperScissors,
            },
            caesar: {
                name: 'Caesar Cipher',
                callback: playCaesarCipher,
            },

            piglatin: {
                name: 'Pig Latin',
                callback: playPigLatin,
            },
        };
    }

    return { games: getGames(), rl };
}
