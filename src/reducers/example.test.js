import { CHANGE_EXAMPLE_INDEX, CHANGE_SEARCH, CLOSE_EXAMPLE, IMPORT_EXAMPLE, NEXT_EXAMPLE, OPEN_EXAMPLES, PREV_EXAMPLE, VIEW_EXAMPLE } from "../constants/example";
import { KEY_PRESSED } from '../constants/editor'
import exampleReducer, { initialState } from "./example"

describe('initialState', () => {
    it('should be returned when an unknown action is encountered', () => {
        let state = undefined;
        state = exampleReducer(state, { type: 'unknown' });
        expect(state).toBe(initialState);
    })
})

describe('OPEN_EXAMPLES', () => {
    it('should open the ExampleCards window', () => {
        let state = initialState;

        expect(state.windowExampleCardsOpened).toBe(false);

        state = exampleReducer(state, { type: OPEN_EXAMPLES });

        expect(state.windowExampleCardsOpened).toBe(true);
    })

    it('should not change state if the ExampleCards window is already opened', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);

        state = exampleReducer(state, { type: OPEN_EXAMPLES });

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state).toBe(startState);
    })
    it('should reset search value, and reset the filteredExamples', () => {
        const startState = { ...initialState, search: 'grut', filteredExamples: initialState.examples.slice(5, 8) }
        let state = startState;

        expect(state.search).not.toBe('');
        expect(state.filteredExamples).not.toStrictEqual(state.examples);

        state = exampleReducer(state, { type: OPEN_EXAMPLES });

        expect(state.search).toBe('');
        expect(state.filteredExamples).toStrictEqual(state.examples);
    })
})

describe('VIEW_EXAMPLE', () => {
    it('should open a certain example in the ExampleDetails window', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true, windowExampleDetailsOpened: false }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state.windowExampleDetailsOpened).toBe(false);
        expect(state.exampleIndex).toBe(0);

        state = exampleReducer(state, { type: VIEW_EXAMPLE, exampleIndex: 12 });

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(12);
        expect(state).not.toBe(startState);
    })
})

describe('CHANGE_EXAMPLE_INDEX', () => {
    it('should change the current example in the ExampleDetails window', () => {
        const startState = { ...initialState, windowExampleDetailsOpened: true, exampleIndex: 11 }
        let state = startState;

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(11);

        state = exampleReducer(state, { type: CHANGE_EXAMPLE_INDEX, exampleIndex: 12 });

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(12);
        expect(state).not.toBe(startState);
    })

    it('should not change state if the current example is the same as the one in the state', () => {
        const startState = { ...initialState, windowExampleDetailsOpened: true, exampleIndex: 12 }
        let state = startState;

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(12);

        state = exampleReducer(state, { type: CHANGE_EXAMPLE_INDEX, exampleIndex: 12 });

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(12);
        expect(state).toBe(startState);
    })
})

describe('CLOSE_EXAMPLE', () => {
    it('should close the ExampleCards window if it\'s opened', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);

        state = exampleReducer(state, { type: CLOSE_EXAMPLE });

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state).not.toBe(startState);
    })
    it('should close the ExampleDetails window if it\'s opened', () => {
        const startState = { ...initialState, windowExampleDetailsOpened: true }
        let state = startState;

        expect(state.windowExampleDetailsOpened).toBe(true);

        state = exampleReducer(state, { type: CLOSE_EXAMPLE });

        expect(state.windowExampleDetailsOpened).toBe(false);
        expect(state).not.toBe(startState);
    })
    it('should close both the ExampleCards window and the ExampleDetails window if they\'re both opened', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true, windowExampleDetailsOpened: true }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state.windowExampleDetailsOpened).toBe(true);

        state = exampleReducer(state, { type: CLOSE_EXAMPLE });

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state.windowExampleDetailsOpened).toBe(false);
        expect(state).not.toBe(startState);
    })
    it('should not change state if the ExampleCards window nor the ExampleDetails window are already opened', () => {
        const startState = initialState
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state.windowExampleDetailsOpened).toBe(false);

        state = exampleReducer(state, { type: CLOSE_EXAMPLE });

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state.windowExampleDetailsOpened).toBe(false);
        expect(state).toBe(startState);
    })

    it('should reset search value, and reset the filteredExamples', () => {
        const startState = { ...initialState, search: 'grut', windowExampleCardsOpened: true, filteredExamples: initialState.examples.slice(5, 8) }
        let state = startState;

        expect(state.search).not.toBe('');
        expect(state.filteredExamples).not.toStrictEqual(state.examples);

        state = exampleReducer(state, { type: CLOSE_EXAMPLE });

        expect(state.search).toBe('');
        expect(state.filteredExamples).toStrictEqual(state.examples);
    })
})

describe('IMPORT_EXAMPLE', () => {
    it('should close the ExampleCards window if it\'s opened', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);

        state = exampleReducer(state, { type: IMPORT_EXAMPLE });

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state).not.toBe(startState);
    })
    it('should close the ExampleDetails window if it\'s opened', () => {
        const startState = { ...initialState, windowExampleDetailsOpened: true }
        let state = startState;

        expect(state.windowExampleDetailsOpened).toBe(true);

        state = exampleReducer(state, { type: IMPORT_EXAMPLE });

        expect(state.windowExampleDetailsOpened).toBe(false);
        expect(state).not.toBe(startState);
    })
    it('should close both the ExampleCards window and the ExampleDetails window if they\'re both opened', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true, windowExampleDetailsOpened: true }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state.windowExampleDetailsOpened).toBe(true);

        state = exampleReducer(state, { type: IMPORT_EXAMPLE });

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state.windowExampleDetailsOpened).toBe(false);
        expect(state).not.toBe(startState);
    })
    it('should not change state if the ExampleCards window nor the ExampleDetails window are already opened', () => {
        const startState = initialState
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state.windowExampleDetailsOpened).toBe(false);

        state = exampleReducer(state, { type: IMPORT_EXAMPLE });

        expect(state.windowExampleCardsOpened).toBe(false);
        expect(state.windowExampleDetailsOpened).toBe(false);
        expect(state).toBe(startState);
    })
    it('should reset search value, and reset the filteredExamples', () => {
        const startState = { ...initialState, search: 'grut', windowExampleCardsOpened: true, filteredExamples: initialState.examples.slice(5, 8) }
        let state = startState;

        expect(state.search).not.toBe('');
        expect(state.filteredExamples).not.toStrictEqual(state.examples);

        state = exampleReducer(state, { type: IMPORT_EXAMPLE });

        expect(state.search).toBe('');
        expect(state.filteredExamples).toStrictEqual(state.examples);
    })
})

describe('PREV_EXAMPLE', () => {
    it('should select the previous example', () => {
        const startState = { ...initialState, windowExampleDetailsOpened: true, exampleIndex: 12 }
        let state = startState;

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(12);

        state = exampleReducer(state, { type: PREV_EXAMPLE });

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(11);
        expect(state).not.toBe(startState);
    })
    it('should select the last example if the current one is the first', () => {
        const startState = { ...initialState, windowExampleDetailsOpened: true, exampleIndex: 0 }
        let state = startState;

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(0);

        state = exampleReducer(state, { type: PREV_EXAMPLE });

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(initialState.examples.length - 1);
        expect(state).not.toBe(startState);
    })
})

describe('NEXT_EXAMPLE', () => {
    it('should select the previous example', () => {
        const startState = { ...initialState, windowExampleDetailsOpened: true, exampleIndex: 12 }
        let state = startState;

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(12);

        state = exampleReducer(state, { type: NEXT_EXAMPLE });

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(13);
        expect(state).not.toBe(startState);
    })
    it('should select the first example if the current one is the last', () => {
        const startState = { ...initialState, windowExampleDetailsOpened: true, exampleIndex: initialState.examples.length - 1 }
        let state = startState;

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(initialState.examples.length - 1);

        state = exampleReducer(state, { type: NEXT_EXAMPLE });

        expect(state.windowExampleDetailsOpened).toBe(true);
        expect(state.exampleIndex).toBe(0);
        expect(state).not.toBe(startState);
    })
})

describe('CHANGE_SEARCH', () => {
    it('should update the search value', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state.search).toBe('');

        state = exampleReducer(state, { type: CHANGE_SEARCH, search: 'vega pyr' });

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state.search).toBe('vega pyr');
        expect(state).not.toBe(startState);
    })

    it('should not change the state if the search value is the same as the one in the state', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true, search: 'vega pyr' }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state.search).toBe('vega pyr');

        state = exampleReducer(state, { type: CHANGE_SEARCH, search: 'vega pyr' });

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state.search).toBe('vega pyr');
        expect(state).toBe(startState);
    })

    it('should filter examples based on search "vega pyr"', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state.search).toBe('');

        state = exampleReducer(state, { type: CHANGE_SEARCH, search: 'vega pyr' });

        expect(state.filteredExamples).toStrictEqual([state.examples[71], state.examples[85]]);
        expect(state.search).toBe('vega pyr');
        expect(state).not.toBe(startState);
    })
})

describe('KEY_PRESSED', () => {
    it('should ignore most keys', () => {
        let state = initialState;

        state = exampleReducer(state, { type: KEY_PRESSED, code: 'KeyQ', key: 'a', ctrlKey: false, shiftKey: false, altKey: false, metaKey: false })

        expect(state).toBe(initialState)

        state = exampleReducer(state, { type: KEY_PRESSED, code: 'KeyQ', key: 'a', ctrlKey: false, shiftKey: true, altKey: false, metaKey: false })

        expect(state).toBe(initialState)
    })

    it('should open the ExampleCards window on Alt+x key', () => {
        let state = initialState;

        expect(state.windowExampleCardsOpened).toBe(false);

        state = exampleReducer(state, { type: KEY_PRESSED, code: 'KeyG'/* Funny non QWERTY keyboard*/, key: 'x', ctrlKey: false, shiftKey: false, altKey: true, metaKey: false })

        expect(state).not.toBe(initialState)
        expect(state.windowExampleCardsOpened).toBe(true);
    })

    it('should not change the state if the ExampleCards window is already opened on Alt+x key', () => {
        const startState = { ...initialState, windowExampleCardsOpened: true }
        let state = startState;

        expect(state.windowExampleCardsOpened).toBe(true);

        state = exampleReducer(state, { type: KEY_PRESSED, code: 'KeyG'/* Funny non QWERTY keyboard*/, key: 'x', ctrlKey: false, shiftKey: false, altKey: true, metaKey: false })

        expect(state.windowExampleCardsOpened).toBe(true);
        expect(state).toBe(startState)
    })
})
