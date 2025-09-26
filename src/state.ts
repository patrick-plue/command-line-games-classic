import { createInterface, type Interface } from 'readline';
import {
    playCaesarCipher,
    playPigLatin,
    playRockPaperScissors,
} from './games/index.js';
import { showMenu, exitGame } from './menu.js';

export type CLIGame = {
    name: string;
    callback: (state: State) => void;
};

export type Command = {
    name: string;
    callback: (state: State) => void;
};

export type State = {
    games: Record<string, CLIGame>;
    rl: Interface;
    commands: Record<string, Command>;
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

    function getCommands() {
        return {
            exit: {
                name: 'exit',
                callback: exitGame,
            },
            menu: {
                name: 'menu',
                callback: showMenu,
            },
        };
    }

    return { games: getGames(), commands: getCommands(), rl };
}
