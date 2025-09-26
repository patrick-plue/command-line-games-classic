import { type State } from 'src/state.js';
import { compileFunction } from 'vm';

type Options = Record<string, string>;

const options: Options = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock',
};

export function playRockPaperScissors(state: State) {
    let userInput: string;
    const { rl } = state;
    rl.question('Choose rock, paper, or scissors:\n', (answer) => {
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
        console.log(`${winner}`);

        rl.question(
            'Do you want to play again? \nn - no\ny - yes\n',
            (answer) => {
                if (answer == 'n') {
                    process.exit();
                } else {
                    playRockPaperScissors(state);
                }
            }
        );
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
