import { playAgain } from '../menu.js';
import { sleep } from './utils.js';
import { type State } from '../state.js';

type Options = Record<string, string>;

const options: Options = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock',
};

export function playRockPaperScissors(state: State) {
    let userInput: string;
    const { rl } = state;
    rl.question('Choose rock, paper, or scissors:\n', async (answer) => {
        try {
            userInput = validateInput(answer);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                playRockPaperScissors(state);
                return;
            }
        }
        const computerChoice = generateComputerChoice(options);
        const winner = determineWinner(userInput, computerChoice);
        console.log('And ....');
        await sleep(2000);
        console.log(`${winner}`);

        playAgain(state, playRockPaperScissors);
    });
}

function validateInput(userInput: string) {
    userInput = userInput.toLowerCase().trim();
    if (!userInput) throw new Error('You have to choose something');

    if (!Object.keys(options).includes(userInput)) {
        throw new Error('Not a valid option');
    }

    return userInput;
}

function generateComputerChoice(options: Options) {
    const optionArray = Object.keys(options);
    const randomIndex = Math.floor(Math.random() * optionArray.length);
    return optionArray[randomIndex];
}

function determineWinner(player: string, computer: string) {
    if (player == computer) {
        return `It's a tie`;
    }

    if (options[player] == computer) {
        return 'Player wins';
    }

    return 'Computer wins';
}
