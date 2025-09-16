import { type State } from './state.js';

export function startREPL(state: State) {
    const { rl, games } = state;

    rl.prompt();
    rl.on('line', (input: string) => {
        const userInput = input;
        if (!userInput) {
            rl.prompt();
        }
        const game = games[userInput];
        if (game) {
            try {
                game.callback(state);
            } catch (error) {
                console.log(error.message);
            }
        }
    });
}
