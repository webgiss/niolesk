import { COPY_BUTTON_HOVERED, COPY_TEXT, DIAGRAM_CHANGED, DIAGRAM_CHANGED_UPDATE, DIAGRAM_HAS_ERROR, DIAGRAM_TYPE_CHANGED, IMPORT_URL, OPEN_IMPORT_URL, RENDERURL_CHANGED, TEXT_COPIED, UPDATE_IMPORT_URL } from '../constants/editor';
import { copyButtonHovered, copyText, diagramChanged, diagramHasError, diagramTypeChanged, importUrl, openImportUrl, renderUrlChanged, updateUrl } from './editor'
import delay from './utils/delay';

// ----------------------------------------
// Mock for copy
let copy_mock = null;
jest.mock('copy-to-clipboard', () => (element) => { copy_mock = element; });

const reset_copy = () => { copy_mock = null; }
const has_copy = () => copy_mock !== null;
const get_copy = () => copy_mock;
// ----------------------------------------

// ----------------------------------------
// Mock for dispatch
const dispatch_state = [];

const reset_dispatch_state = () => { dispatch_state.splice(0); }
const dispatch_mock = (x) => {
    dispatch_state.push(x);
}
const get_dispatch_state = () => dispatch_state;
// ----------------------------------------

// ----------------------------------------
// Mock for get_state
let mock_state = {};
const get_state_mock = () => mock_state;
// ----------------------------------------

// ----------------------------------------
// Mock for execution of an action that use thunk
const executeThunk = async (action) => {
    const result = action();
    expect(typeof result).toBe('function')
    const resultPromise = result(dispatch_mock, get_state_mock);
    await delay(0);
    return resultPromise;
}
// ----------------------------------------

const getCurrentTime = () => (new Date()).getTime();

describe('copyText', () => {
    it('should dispatch COPY_TEXT', async () => {
        reset_copy();
        reset_dispatch_state();
        expect(has_copy()).toBe(false);
        expect(get_dispatch_state().length).toBe(0)

        const copyTextPromise = executeThunk(() => copyText('scope', 'text'))

        expect(has_copy()).toBe(true);
        expect(get_copy()).toBe('text')
        let dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(2)
        expect(dispatch_state[0]).toStrictEqual({ type: COPY_TEXT, scope: 'scope', text: 'text' })
        expect(dispatch_state[1]).toStrictEqual({ type: TEXT_COPIED, scope: 'scope', isCopied: true })

        await copyTextPromise;

        dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(3)
        expect(dispatch_state[0]).toStrictEqual({ type: COPY_TEXT, scope: 'scope', text: 'text' })
        expect(dispatch_state[1]).toStrictEqual({ type: TEXT_COPIED, scope: 'scope', isCopied: true })
        expect(dispatch_state[2]).toStrictEqual({ type: TEXT_COPIED, scope: 'scope', isCopied: false })
    })
})

describe('copyButtonHovered', () => {
    const testForHover = (isHover) => {
        it(`should dispatch the correct action for isHover at ${isHover}`, () => {
            const result = copyButtonHovered('scope', isHover);
            expect(result).toStrictEqual({ type: COPY_BUTTON_HOVERED, scope: 'scope', isHover })
        })
    }
    testForHover(true)
    testForHover(false)
})

describe('renderUrlChanged', () => {
    it(`should dispatch the correct action`, () => {
        const result = renderUrlChanged('https://example.com/test');
        expect(result).toStrictEqual({ type: RENDERURL_CHANGED, renderUrl: 'https://example.com/test' })
    })
})

describe('diagramChanged', () => {
    it('should dispatch the correct actions with just one change', async () => {
        reset_dispatch_state();
        let dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(0)
        const startTest = getCurrentTime();

        const diagramChangedPromise = executeThunk(() => diagramChanged('text 01'))

        dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(1)
        expect(dispatch_state[0]).toStrictEqual({ type: DIAGRAM_CHANGED, diagramText: 'text 01' })

        await diagramChangedPromise;

        const endTest = getCurrentTime();

        dispatch_state = get_dispatch_state();
        expect(dispatch_state).toStrictEqual([
            { type: DIAGRAM_CHANGED, diagramText: 'text 01' },
            { type: DIAGRAM_CHANGED_UPDATE },
        ])
        expect(endTest-startTest).toBeGreaterThanOrEqual(750)
    })

    it('should dispatch the correct actions with several changes including some with less than 750ms interval', async () => {
        reset_dispatch_state();
        let dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(0)

        const startTest01 = getCurrentTime();
        const diagramChangedPromise01 = executeThunk(() => diagramChanged('text 01'))

        dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(1)
        expect(dispatch_state[0]).toStrictEqual({ type: DIAGRAM_CHANGED, diagramText: 'text 01' })

        await delay(100);

        const startTest02 = getCurrentTime();
        const diagramChangedPromise02 = executeThunk(() => diagramChanged('text 02'))

        dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(2)
        expect(dispatch_state[1]).toStrictEqual({ type: DIAGRAM_CHANGED, diagramText: 'text 02' })

        await delay(300);

        const startTest03 = getCurrentTime();
        const diagramChangedPromise03 = executeThunk(() => diagramChanged('text 03'))

        dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(3)
        expect(dispatch_state[2]).toStrictEqual({ type: DIAGRAM_CHANGED, diagramText: 'text 03' })

        await delay(800);

        const startTest04 = getCurrentTime();
        const diagramChangedPromise04 = executeThunk(() => diagramChanged('text 04'))

        dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(5)
        expect(dispatch_state[3]).toStrictEqual({ type: DIAGRAM_CHANGED_UPDATE })
        expect(dispatch_state[4]).toStrictEqual({ type: DIAGRAM_CHANGED, diagramText: 'text 04' })

        await delay(100);

        const startTest05 = getCurrentTime();
        const diagramChangedPromise05 = executeThunk(() => diagramChanged('text 05'))

        dispatch_state = get_dispatch_state();
        expect(dispatch_state.length).toBe(6)
        expect(dispatch_state[5]).toStrictEqual({ type: DIAGRAM_CHANGED, diagramText: 'text 05' })

        await Promise.all([
            diagramChangedPromise01,
            diagramChangedPromise02,
            diagramChangedPromise03,
            diagramChangedPromise04,
            diagramChangedPromise05
        ]);

        const endTest = getCurrentTime();

        dispatch_state = get_dispatch_state();
        expect(dispatch_state).toStrictEqual([
            { type: DIAGRAM_CHANGED, diagramText: 'text 01' },
            { type: DIAGRAM_CHANGED, diagramText: 'text 02' },
            { type: DIAGRAM_CHANGED, diagramText: 'text 03' },
            { type: DIAGRAM_CHANGED_UPDATE },
            { type: DIAGRAM_CHANGED, diagramText: 'text 04' },
            { type: DIAGRAM_CHANGED, diagramText: 'text 05' },
            { type: DIAGRAM_CHANGED_UPDATE },
        ])
        expect(startTest02-startTest01).toBeLessThan(750)
        expect(startTest03-startTest02).toBeLessThan(750)
        expect(startTest04-startTest03).toBeGreaterThanOrEqual(750)
        expect(startTest05-startTest04).toBeLessThan(750)
        expect(endTest-startTest05).toBeGreaterThanOrEqual(750)
    })
})

describe('diagramTypeChanged', () => {
    it(`should dispatch the correct action`, () => {
        const result = diagramTypeChanged('grutUML');
        expect(result).toStrictEqual({ type: DIAGRAM_TYPE_CHANGED, diagramType: 'grutUML' })
    })
})

describe('importUrl', () => {
    it(`should dispatch the correct action`, () => {
        const result = importUrl('https://example.com/diagramType/data==');
        expect(result).toStrictEqual({ type: IMPORT_URL, url: 'https://example.com/diagramType/data==' })
    })
})

describe('closeImportUrl', () => {
    it(`should dispatch the correct action`, () => {
        const result = importUrl('https://example.com/diagramType/data==');
        expect(result).toStrictEqual({ type: IMPORT_URL, url: 'https://example.com/diagramType/data==' })
    })
})

describe('openImportUrl', () => {
    it(`should dispatch the correct action`, () => {
        const result = openImportUrl();
        expect(result).toStrictEqual({ type: OPEN_IMPORT_URL })
    })
})

describe('updateUrl', () => {
    it(`should dispatch the correct action`, () => {
        const result = updateUrl('https://example.com/diagramType/data==');
        expect(result).toStrictEqual({ type: UPDATE_IMPORT_URL, url: 'https://example.com/diagramType/data==' })
    })
})

describe('diagramHasError', () => {
    it(`should dispatch the correct action`, () => {
        const result = diagramHasError('https://example.com/diagramType/data==');
        expect(result).toStrictEqual({ type: DIAGRAM_HAS_ERROR, url: 'https://example.com/diagramType/data==' })
    })
})

