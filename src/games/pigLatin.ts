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
        const encodedSentence = translateSentence(userInput);
        console.log(encodedSentence);
        process.exit();
    });
}

const vowels = ['a', 'e', 'i', 'o', 'u'];

function mutateWord(word: string) {
    const firstChar = word[0].toLowerCase();
    const secondChar = word[1].toLowerCase();

    if (vowels.includes(firstChar)) {
        return word + 'way';
    }

    if (!vowels.includes(firstChar) && vowels.includes(secondChar)) {
        return word.slice(1) + firstChar + 'ay';
    }

    return word.slice(2) + firstChar + secondChar + 'ay';
}

function translateSentence(sentence: string) {
    const sentenceArray = sentence.split(' ');
    const translation = sentenceArray.map((word) => mutateWord(word));
    return translation.join(' ');
}
