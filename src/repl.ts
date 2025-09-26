import { showMenu } from './menu.js';
import { type State } from './state.js';

export function startREPL(state: State) {
    console.log('Welcome to CLI Games\n');
    const { games, commands } = state;

    showMenu(state);
}
