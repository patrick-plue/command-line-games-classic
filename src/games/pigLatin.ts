import { type State } from 'src/state.js';
export function playPigLatin(state: State) {
    const { rl } = state;
    rl.setPrompt('Enter your sentence \n');
    rl.prompt();
    rl.on('line', (input: string) => {
        const userInput = input;
        if (!userInput) {
            rl.prompt();
        }
    });
}
