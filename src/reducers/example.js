import { createReducer } from "./utils/createReducer";
import { CHANGE_EXAMPLE_INDEX, CLOSE_EXAMPLE, IMPORT_EXAMPLE, OPEN_EXAMPLES, VIEW_EXAMPLE } from '../constants/example'
import exampleData from '../examples/data';

const initialState = {
    windowExampleCardsOpened: false,
    windowExampleDetailsOpened: false,
    exampleIndex: 0,
    examples: exampleData,
};

export default createReducer({
    [OPEN_EXAMPLES]: (state, action) => {
        state = { ...state, windowExampleCardsOpened: true }
        return state;
    },
    [VIEW_EXAMPLE]: (state, action) => {
        const { exampleIndex } = action
        state = { ...state, exampleIndex, windowExampleCardsOpened: false, windowExampleDetailsOpened: true }
        return state;
    },
    [CHANGE_EXAMPLE_INDEX]: (state, action) => {
        const { exampleIndex } = action
        state = { ...state, exampleIndex }
        return state;
    },
    [IMPORT_EXAMPLE]: (state, action) => {
        state = { ...state, windowExampleCardsOpened: false, windowExampleDetailsOpened: false }
        return state;
    },
    [CLOSE_EXAMPLE]: (state, action) => {
        state = { ...state, windowExampleCardsOpened: false, windowExampleDetailsOpened: false }
        return state;
    },
}, initialState);
