import { createReducer } from "./utils/createReducer";
import { CHANGE_EXAMPLE_INDEX, CHANGE_SEARCH, CLOSE_EXAMPLE, IMPORT_EXAMPLE, NEXT_EXAMPLE, OPEN_EXAMPLES, PREV_EXAMPLE, VIEW_EXAMPLE } from '../constants/example'
import exampleData from '../examples/data';
import { getExampleUrl } from '../examples/usecache'

const mathMod = (v, m) => ((v % m) + m) % m;

const examples = exampleData.map((exampleItem, id) => ({ 
    id,
    ...exampleItem,
    searchField: `${exampleItem.title} ${exampleItem.description} ${exampleItem.keywords ? exampleItem.keywords.join(' ') : ''}`.toLowerCase(),
    url: getExampleUrl(exampleItem),
}));

export const initialState = {
    windowExampleCardsOpened: false,
    windowExampleDetailsOpened: false,
    exampleIndex: 0,
    examples,
    filteredExamples: examples,
    search: '',
};

const filterExamples = (examples, search) => {
    const parts = search.split(' ').filter((part) => part.length > 0).map((part) => part.toLowerCase())
    return examples.filter((example) => parts.map((part) => example.searchField.indexOf(part) >= 0).reduce((x, y) => x && y, true))
}

export default createReducer({
    [OPEN_EXAMPLES]: (state, action) => {
        if (!state.windowExampleCardsOpened) {
            state = { ...state, windowExampleCardsOpened: true, search: '', filteredExamples: state.examples }
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
            state = { ...state, windowExampleCardsOpened: false, windowExampleDetailsOpened: false, search: '', filteredExamples: state.examples }
        }
        return state;
    },
    [CLOSE_EXAMPLE]: (state, action) => {
        if (state.windowExampleCardsOpened || state.windowExampleDetailsOpened) {
            state = { ...state, windowExampleCardsOpened: false, windowExampleDetailsOpened: false, search: '', filteredExamples: state.examples }
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
    [CHANGE_SEARCH]: (state, action) => {
        const { search } = action;
        if (search !== state.search) {
            state = { ...state, search, filteredExamples: filterExamples(state.examples, search) }
        }
        return state;
    },
}, initialState);
