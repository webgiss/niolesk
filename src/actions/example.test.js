import { CHANGE_EXAMPLE_INDEX, CHANGE_SEARCH, CLOSE_EXAMPLE, IMPORT_EXAMPLE, NEXT_EXAMPLE, OPEN_EXAMPLES, PREV_EXAMPLE, VIEW_EXAMPLE } from "../constants/example";
import { changeExampleIndex, closeExample, importExample, nextExample, openExamples, prevExample, updateSearch, viewExample } from "./example";

describe('openExamples', () => {
    it(`should dispatch the correct action`, () => {
        const result = openExamples();
        expect(result).toStrictEqual({ type: OPEN_EXAMPLES })
    })
})

describe('changeExampleIndex', () => {
    it(`should dispatch the correct action`, () => {
        const result = changeExampleIndex(17);
        expect(result).toStrictEqual({ type: CHANGE_EXAMPLE_INDEX, exampleIndex: 17 })
    })
})

describe('importExample', () => {
    it(`should dispatch the correct action`, () => {
        const result = importExample('A -> B; B -> C;', 'grutDiagram');
        expect(result).toStrictEqual({ type: IMPORT_EXAMPLE, diagramText: 'A -> B; B -> C;', diagramType: 'grutDiagram' })
    })
})

describe('viewExample', () => {
    it(`should dispatch the correct action`, () => {
        const result = viewExample(17);
        expect(result).toStrictEqual({ type: VIEW_EXAMPLE, exampleIndex: 17 })
    })
})

describe('closeExample', () => {
    it(`should dispatch the correct action`, () => {
        const result = closeExample();
        expect(result).toStrictEqual({ type: CLOSE_EXAMPLE })
    })
})

describe('prevExample', () => {
    it(`should dispatch the correct action`, () => {
        const result = prevExample();
        expect(result).toStrictEqual({ type: PREV_EXAMPLE })
    })
})

describe('nextExample', () => {
    it(`should dispatch the correct action`, () => {
        const result = nextExample();
        expect(result).toStrictEqual({ type: NEXT_EXAMPLE })
    })
})

describe('updateSearch', () => {
    it(`should dispatch the correct action`, () => {
        const result = updateSearch('vega pyr');
        expect(result).toStrictEqual({ type: CHANGE_SEARCH, search: 'vega pyr' });
    })
})
