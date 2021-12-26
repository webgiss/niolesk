import { createReducer } from "./utils/createReducer";
import { CHANGE_EXAMPLE_INDEX, CLOSE_EXAMPLE, IMPORT_EXAMPLE, NEXT_EXAMPLE, OPEN_EXAMPLES, PREV_EXAMPLE, VIEW_EXAMPLE } from '../constants/example'
import exampleData from '../examples/data';

const mathMod = (v, m) => ((v % m) + m) % m;

export const initialState = {
    windowExampleCardsOpened: false,
    windowExampleDetailsOpened: false,
    exampleIndex: 0,
    examples: exampleData,
};

export default createReducer({
    [OPEN_EXAMPLES]: (state, action) => {
        if (!state.windowExampleCardsOpened) {
            state = { ...state, windowExampleCardsOpened: true }
        }
        return state;
    },
    [VIEW_EXAMPLE]: (state, action) => {
        const { exampleIndex } = action
        state = { ...state, exampleIndex, windowExampleCardsOpened: false, windowExampleDetailsOpened: true }
        return state;
    },
    [CHANGE_EXAMPLE_INDEX]: (state, action) => {
        const { exampleIndex } = action
        if (state.exampleIndex !== exampleIndex) {
            state = { ...state, exampleIndex }
        }
        return state;
    },
    [IMPORT_EXAMPLE]: (state, action) => {
        if (state.windowExampleCardsOpened || state.windowExampleDetailsOpened) {
            state = { ...state, windowExampleCardsOpened: false, windowExampleDetailsOpened: false }
        }
        return state;
    },
    [CLOSE_EXAMPLE]: (state, action) => {
        if (state.windowExampleCardsOpened || state.windowExampleDetailsOpened) {
            state = { ...state, windowExampleCardsOpened: false, windowExampleDetailsOpened: false }
        }
        return state;
    },
    [PREV_EXAMPLE]: (state, action) => {
        const { exampleIndex, examples } = state;
        state = { ...state, exampleIndex: mathMod(exampleIndex - 1, examples.length) }
        return state;
    },
    [NEXT_EXAMPLE]: (state, action) => {
        const { exampleIndex, examples } = state;
        state = { ...state, exampleIndex: mathMod(exampleIndex + 1, examples.length) }
        return state;
    },
}, initialState);
