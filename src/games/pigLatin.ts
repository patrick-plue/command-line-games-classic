import { version } from 'os';
import { type State } from 'src/state.js';
export function playPigLatin(state: State) {
    const { rl } = state;
    rl.question('Enter your sentence \n', (answer) => {
        const translatedSentence = translateSentence(answer);
        console.log(translatedSentence);
        rl.question(
            'Do you want to play again? \nn - no\ny - yes\n',
            (answer) => {
                if (answer == 'n') {
                    process.exit();
                } else {
                    playPigLatin(state);
                }
            }
        );
    });
}

const vowels = ['a', 'e', 'i', 'o', 'u'];

function mutateWord(word: string) {
    const firstChar = word[0].toLowerCase();
    const secondChar = word[1];

    if (!secondChar) {
        return firstChar + 'way';
    }

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
