import { sleep } from './games/utils.js';
import { type State } from './state.js';
import { type CLIGame } from './state.js';

export async function playAgain(state: State, game: CLIGame['callback']) {
    const { rl } = state;
    await sleep(2000);
    rl.question(
        '\nDo you want to play again? \nn - no\ny - yes\n',
        (answer) => {
            if (answer == 'n') {
                showMenu(state);
            } else {
                game(state);
            }
        }
    );
}

export function showMenu(state: State) {
    const { rl, games } = state;
    Object.entries(games).forEach(([cmd, value]) => {
        console.log(`${cmd} --- ${value.name}`);
    });
    rl.question('\nWhat game do you want to play?\n', (input: string) => {
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

export function exitGame(state: State) {
    process.exit();
}
