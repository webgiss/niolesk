import { CLOSE_IMPORT_URL, COPY_BUTTON_HOVERED, DIAGRAM_CHANGED, DIAGRAM_CHANGED_UPDATE, DIAGRAM_HAS_ERROR, DIAGRAM_TYPE_CHANGED, IMPORT_URL, KEY_PRESSED, OPEN_IMPORT_URL, RENDERURL_CHANGED, RENDER_EDIT_SIZE_CHANGED, TEXT_COPIED, UPDATE_IMPORT_URL, WINDOW_RESIZED, ZEN_MODE_CHANGED } from '../constants/editor';
import editorReducer, { initialState, updateDiagram } from './editor'
import exampleData from '../examples/data';
import { decode } from '../kroki/coder';
import { IMPORT_EXAMPLE } from '../constants/example';

const standardState = updateDiagram(initialState);

describe('initialState', () => {
    it('should be returned when an unknown action is encountered', () => {
        let state = null;
        state = editorReducer(state, { type: 'unknown' });
        expect(state).toBe(initialState);
    })
})

describe('LOCATION_CHANGE', () => {
    const locationChangeDefaultAction = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
            location: {
                pathname: '/',
                search: '',
                hash: ''
            },
            action: 'POP',
            isFirstRendering: true
        }
    }

    const locationChangeAction = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
            location: {
                pathname: '/',
                search: '',
                hash: '#https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=',
                key: 'vse63t'
            },
            action: 'PUSH',
            isFirstRendering: false
        }
    }

    it('should not lose current diagram if no diagram on location', () => {
        expect(initialState.diagramType).toBe('plantuml')
        expect(initialState.diagramText.slice(0, 24)).toBe('skinparam monochrome tru')

        const newState = editorReducer(initialState, locationChangeDefaultAction);

        expect(newState).not.toStrictEqual(initialState)
        expect(newState.diagramType).toBe('plantuml')
        expect(newState.diagramText.slice(0, 24)).toBe('skinparam monochrome tru')

        const newState2 = editorReducer(newState, locationChangeDefaultAction);

        expect(newState2).toBe(newState)
    })

    it('should take into account a new diagram', () => {
        expect(initialState.diagramType).not.toBe('c4plantuml')
        expect(initialState.diagramText).not.toBe('a -> b')

        const newState = editorReducer(initialState, locationChangeAction);

        expect(newState).not.toBe(initialState)
        expect(newState.diagramType).toBe('c4plantuml')
        expect(newState.diagramText).toBe('a -> b')

        const newState2 = editorReducer(newState, locationChangeAction);

        expect(newState2).toBe(newState)
    })

    it('should not take into account the diagramType if only diagram type is provided into the URL', () => {
        const action = { 
            ...locationChangeAction, 
            payload: { 
                ...locationChangeAction.payload, 
                location: { 
                    ...locationChangeAction.payload.location, 
                    hash: '#https://kroki.example.com/c4plantuml/',
                }
            }
        }
        const startState = standardState;
        let state = startState;

        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('kroki.example.com')

        state = editorReducer(state, action);

        expect(state.diagramType).toBe(startState.diagramType)
        expect(state.renderUrl).not.toBe('kroki.example.com')
        expect(state.renderUrl).toBe(startState.renderUrl)
    })
})

describe('COPY_BUTTON_HOVERED', () => {
    it('should update isHover in corresponding state', () => {
        let state = initialState;

        expect(state.scopes.edit.isHover).toBe(false)
        expect(state.scopes.markdown.isHover).toBe(false)

        state = editorReducer(state, { type: COPY_BUTTON_HOVERED, scope: 'edit', isHover: true })

        expect(state).not.toBe(initialState);

        expect(state.scopes.edit.isHover).toBe(true)
        expect(state.scopes.markdown.isHover).toBe(false)
    })

    it('should not change state if isHover has the same value of the state', () => {
        let state = initialState;

        expect(state.scopes.edit.isHover).toBe(false)
        expect(state.scopes.markdown.isHover).toBe(false)

        state = editorReducer(state, { type: COPY_BUTTON_HOVERED, scope: 'edit', isHover: false })

        expect(state).toBe(initialState);
    })
})

describe('TEXT_COPIED', () => {
    it('should update isCopied in corresponding state', () => {
        let state = initialState;

        expect(state.scopes.edit.isCopied).toBe(false)
        expect(state.scopes.markdown.isCopied).toBe(false)

        state = editorReducer(state, { type: TEXT_COPIED, scope: 'edit', isCopied: true })

        expect(state).not.toBe(initialState);

        expect(state.scopes.edit.isCopied).toBe(true)
        expect(state.scopes.markdown.isCopied).toBe(false)
    })

    it('should not change state if isCopied has the same value of the state', () => {
        let state = initialState;

        expect(state.scopes.edit.isCopied).toBe(false)
        expect(state.scopes.markdown.isCopied).toBe(false)

        state = editorReducer(state, { type: TEXT_COPIED, scope: 'edit', isCopied: false })

        expect(state).toBe(initialState);
    })
})

describe('RENDERURL_CHANGED', () => {
    it('should update renderUrl in corresponding state', () => {
        let state = standardState;

        expect(state.renderUrl).toBe('https://kroki.io/')

        state = editorReducer(state, { type: RENDERURL_CHANGED, renderUrl: 'https://kroki.example.com/' })

        expect(state).not.toBe(standardState);

        expect(state.renderUrl).toBe('https://kroki.example.com/')
    })

    it('should not change state if renderUrl has the same value of the state', () => {
        let state = standardState;

        expect(state.renderUrl).toBe('https://kroki.io/')

        state = editorReducer(state, { type: RENDERURL_CHANGED, renderUrl: 'https://kroki.io/' })

        expect(state).toStrictEqual(standardState);
        expect(state).toBe(standardState);
    })

    it('should update diagram if there is no diagram at all even if the renderUrl hasn\'t changed', () => {
        let state = initialState;

        expect(state.renderUrl).toBe('https://kroki.io/')

        state = editorReducer(state, { type: RENDERURL_CHANGED, renderUrl: 'https://kroki.io/' })

        expect(state).toStrictEqual(standardState);
        expect(state).not.toBe(initialState);
    })
})

describe('DIAGRAM_CHANGED', () => {
    it('should update diagram text', () => {
        let state = standardState;

        expect(state.diagramText).not.toBe('a -> b')

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: 'a -> b' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramText).not.toBe(standardState.diagramText)
        expect(state).not.toBe(initialState);
    })

    it('should not update diagram URL', () => {
        let state = standardState;

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramUrl).not.toBe('https://kroki.io/plantuml/svg/eNpLVNC1U0gCAAT8AW8=')

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: 'a -> b' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramUrl).not.toBe('https://kroki.io/plantuml/svg/eNpLVNC1U0gCAAT8AW8=')
    })

    it('should not change state if the state values are the same', () => {
        let state = standardState;

        expect(state.diagramText).toBe(standardState.diagramText)

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: standardState.diagramText })

        expect(state.diagramText).toBe(standardState.diagramText)
        expect(state).toStrictEqual(standardState);
        expect(state).toBe(standardState);
    })

})


describe('DIAGRAM_CHANGED_UPDATE', () => {
    it('should update diagram URL after a diagram text update', () => {
        let state = standardState;

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramUrl).not.toBe('https://kroki.io/plantuml/svg/eNpLVNC1U0gCAAT8AW8=')

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: 'a -> b' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramUrl).not.toBe('https://kroki.io/plantuml/svg/eNpLVNC1U0gCAAT8AW8=')

        state = editorReducer(state, { type: DIAGRAM_CHANGED_UPDATE })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramUrl).toBe('https://kroki.io/plantuml/svg/eNpLVNC1U0gCAAT8AW8=')
    })

    it('should update defaultDiagram correctly after a diagram text update', () => {
        let state = standardState;

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: 'a -> b' })

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).toBe('a -> b')

        state = editorReducer(state, { type: DIAGRAM_CHANGED_UPDATE })

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).toBe('a -> b')

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: decode(exampleData[0].example) })
        state = editorReducer(state, { type: DIAGRAM_CHANGED_UPDATE })

        expect(state.defaultDiagram).toBe(false)
    })
})

describe('DIAGRAM_TYPE_CHANGED', () => {
    it('should update diagram diagramType and diagramText for a default diagram', () => {
        let state = standardState;

        expect(state.diagramText.slice(0, 24)).toBe('skinparam monochrome tru')
        expect(state.diagramType).toBe('plantuml')
        expect(state.defaultDiagram).toBe(true)

        state = editorReducer(state, { type: DIAGRAM_TYPE_CHANGED, diagramType: 'mermaid' })

        expect(state.diagramText.slice(0, 24)).not.toBe('skinparam monochrome tru')
        expect(state.diagramType).toBe('mermaid')
        expect(state.defaultDiagram).toBe(true)
    })

    it('should update diagram diagramType and not diagramText for a custom diagram', () => {
        let state = updateDiagram({ ...standardState, diagramText: 'a -> b' });

        expect(state.diagramText.slice(0, 24)).toBe('a -> b')
        expect(state.diagramType).toBe('plantuml')
        expect(state.defaultDiagram).toBe(false)

        state = editorReducer(state, { type: DIAGRAM_TYPE_CHANGED, diagramType: 'mermaid' })

        expect(state.diagramText.slice(0, 24)).toBe('a -> b')
        expect(state.diagramType).toBe('mermaid')
        expect(state.defaultDiagram).toBe(false)
    })

    it('should update defaultDiagram to true correctly after a diagram type update', () => {
        let state = standardState;

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: 'a -> b' })

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).toBe('a -> b')

        state = editorReducer(state, { type: DIAGRAM_CHANGED_UPDATE })

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).toBe('a -> b')

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: decode(exampleData[0].example) })
        state = editorReducer(state, { type: DIAGRAM_CHANGED_UPDATE })

        expect(state.defaultDiagram).toBe(false)

        state = editorReducer(state, { type: DIAGRAM_TYPE_CHANGED, diagramType: exampleData[0].diagramType })

        expect(state.defaultDiagram).toBe(true)
    })

    it('should update both diagramText and diagramType when a non default example is displayed', () => {
        const { example, diagramType } = exampleData.filter((exampleItem) => !exampleItem.default)[0]
        const diagramText = decode(example)
        const { diagramType: newdiagramType } = exampleData.filter((exampleItem) => exampleItem.diagramType !== diagramType)[0]

        let state = updateDiagram({ ...standardState, diagramText, diagramType });

        expect(state.defaultDiagram).toBe(true)

        expect(state.diagramText).not.toBe(standardState.diagramText)
        expect(state.diagramText).toBe(diagramText)

        state = editorReducer(state, { type: DIAGRAM_TYPE_CHANGED, diagramType: newdiagramType })

        expect(state.diagramText).not.toBe(diagramText)
        expect(state.defaultDiagram).toBe(true)
    })

    it('should set the language correctly', () => {
        const example = exampleData.filter(example => example.description === 'Pie Chart' && example.title === 'Vega-Lite')[0]
        const diagramText = decode(example.example)

        let state = updateDiagram({ ...standardState, diagramText });

        expect(state.diagramType).not.toBe('vegalite')
        expect(state.diagramText).toBe(diagramText)
        expect(state.language).not.toBe('json')

        state = editorReducer(state, { type: DIAGRAM_TYPE_CHANGED, diagramType: 'vegalite' })

        expect(state.diagramType).toBe('vegalite')
        expect(state.diagramText).toBe(diagramText)
        expect(state.language).toBe('json')
    })
})

describe('IMPORT_EXAMPLE', () => {
    it('should update both diagramText and diagramType for defaultDiagrams', () => {
        let state = standardState;

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.diagramText).toBe(standardState.diagramText)
        expect(state.diagramType).toBe(standardState.diagramType)
        expect(state.redrawIndex).toBe(0)

        state = editorReducer(state, { type: IMPORT_EXAMPLE, diagramText: 'a -> b', diagramType: 'c4plantuml' })

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('c4plantuml')
        expect(state.redrawIndex).toBe(1)
    })

    it('should update both diagramText and diagramType for non defaultDiagrams', () => {
        let state = updateDiagram({ ...standardState, diagramText: 'b -> c', diagramType: 'plantuml' });

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.diagramText).not.toBe(standardState.diagramText)
        expect(state.diagramType).toBe(standardState.diagramType)
        expect(state.redrawIndex).toBe(0)

        state = editorReducer(state, { type: IMPORT_EXAMPLE, diagramText: 'a -> b', diagramType: 'c4plantuml' })

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('c4plantuml')
        expect(state.redrawIndex).toBe(1)
    })

    it('should update both diagramText and diagramType for non defaultDiagrams if provided a with default digram', () => {
        const { example, diagramType } = exampleData.filter((exampleItem) => !exampleItem.default)[1]
        const diagramText = decode(example)
        let state = updateDiagram({ ...standardState, diagramText, diagramType });

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.diagramText).not.toBe(standardState.diagramText)
        expect(state.diagramType).not.toBe(standardState.diagramType)
        expect(state.redrawIndex).toBe(0)

        state = editorReducer(state, { type: IMPORT_EXAMPLE, diagramText: 'a -> b', diagramType: 'c4plantuml' })

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('c4plantuml')
        expect(state.redrawIndex).toBe(1)
    })

    it('should set the language correctly', () => {
        const example = exampleData.filter(example => example.description == 'Pie Chart' && example.title == 'Vega-Lite')[0]
        const diagramText = decode(example.example)

        let state = standardState;

        expect(state.diagramType).not.toBe('vegalite')
        expect(state.diagramText).not.toBe(diagramText)
        expect(state.language).not.toBe('json')
        expect(state.redrawIndex).toBe(0)

        state = editorReducer(state, { type: IMPORT_EXAMPLE, diagramText, diagramType: 'vegalite' })

        expect(state.diagramType).toBe('vegalite')
        expect(state.diagramText).toBe(diagramText)
        expect(state.language).toBe('json')
        expect(state.redrawIndex).toBe(1)
    })

})

describe('IMPORT_URL', () => {
    it('should import correctly a diagramText, a diagramType and a renderUrl given an URL', () => {
        let state = standardState;

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)

        state = editorReducer(state, { type: IMPORT_URL, url: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('c4plantuml')
        expect(state.renderUrl).toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
    })

    it('should close windowImportUrl if opened', () => {
        let state = { ...standardState, windowImportUrlOpened: true };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)

        state = editorReducer(state, { type: IMPORT_URL, url: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('c4plantuml')
        expect(state.renderUrl).toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
    })

    it('should reset windowImportUrl field', () => {
        let state = { ...standardState, windowImportUrlOpened: true, windowImportUrl: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: IMPORT_URL, url: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('c4plantuml')
        expect(state.renderUrl).toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).toBe('')
    })

    it('should update hash', () => {
        let state = standardState;

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.hash).not.toBe('https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=')

        state = editorReducer(state, { type: IMPORT_URL, url: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('c4plantuml')
        expect(state.renderUrl).toBe('https://kroki.example.com')
        expect(state.hash).toBe('https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=')
    })

    it('should set the language correctly', () => {
        const example = exampleData.filter(example => example.description == 'Pie Chart' && example.title == 'Vega-Lite')[0]
        const diagramText = decode(example.example)

        let state = standardState;

        expect(state.diagramType).not.toBe('vegalite')
        expect(state.diagramText).not.toBe(diagramText)
        expect(state.language).not.toBe('json')

        state = editorReducer(state, { type: IMPORT_URL, url: `https://kroki.example.com/vegalite/svg/${example.example}` })

        expect(state.diagramType).toBe('vegalite')
        expect(state.diagramText).toBe(diagramText)
        expect(state.language).toBe('json')
    })
})

describe('CLOSE_IMPORT_URL', () => {
    it('should close the import url window and reset the windowImportUrl', () => {
        let state = { ...standardState, windowImportUrlOpened: true, windowImportUrl: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: CLOSE_IMPORT_URL })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).toBe('')
    })
    it('should cstill work - and reset the windowImportUrl - if the window is already closed', () => {
        let state = { ...standardState, windowImportUrlOpened: false, windowImportUrl: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: CLOSE_IMPORT_URL })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).toBe('')
    })
})

describe('OPEN_IMPORT_URL', () => {
    it('should open the import url window and reset the windowImportUrl', () => {
        let state = { ...standardState, windowImportUrlOpened: false, windowImportUrl: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: OPEN_IMPORT_URL })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).toBe('')
    })
    it('should cstill work - and reset the windowImportUrl - if the window is already opened', () => {
        let state = { ...standardState, windowImportUrlOpened: true, windowImportUrl: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: OPEN_IMPORT_URL })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).toBe('')
    })
})

describe('UPDATE_IMPORT_URL', () => {
    it('should open the import url window and reset the windowImportUrl', () => {
        let state = { ...standardState, windowImportUrlOpened: false, windowImportUrl: 'https://kroki.example.com/c4plantuml/sv' };

        expect(state.windowImportUrl).toBe('https://kroki.example.com/c4plantuml/sv')

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')

        state = editorReducer(state, { type: UPDATE_IMPORT_URL, url: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.windowImportUrl).not.toBe('https://kroki.example.com/c4plantuml/sv')
        expect(state.windowImportUrl).toBe('https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=')

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
    })
})

describe('DIAGRAM_HAS_ERROR', () => {
    it('should set diagramError correctly', () => {
        let state = standardState;

        expect(state.diagramError).toBe(false)

        state = editorReducer(state, { type: DIAGRAM_HAS_ERROR, url: state.diagramUrl })

        expect(state.diagramError).toBe(true)
    })
    it('should not set diagramError for an old url', () => {
        let state = standardState;

        expect(state.diagramError).toBe(false)

        state = editorReducer(state, { type: DIAGRAM_HAS_ERROR, url: 'https://oldurl' })

        expect(state.diagramError).toBe(false)
    })
    it('should set diagramError correctly and diagramError should be reset after DIAGRAM_CHANGED_UPDATE', () => {
        let state = standardState;

        expect(state.diagramError).toBe(false)

        state = editorReducer(state, { type: DIAGRAM_HAS_ERROR, url: state.diagramUrl })

        expect(state.diagramError).toBe(true)

        state = editorReducer(state, { type: DIAGRAM_CHANGED, diagramText: 'a -> b' })
        state = editorReducer(state, { type: DIAGRAM_CHANGED_UPDATE })

        expect(state.diagramError).toBe(false)
    })
})

describe('ZEN_MODE_CHANGED', () => {
    it('should update zenMode correctly to true', () => {
        let state = standardState;

        expect(state.zenMode).toBe(false)

        state = editorReducer(state, { type: ZEN_MODE_CHANGED, zenMode: true })

        expect(state).not.toBe(standardState)
        expect(state.zenMode).toBe(true)
    })
    it('should update zenMode correctly to false', () => {
        let state = { ...standardState, zenMode: true };

        expect(state.zenMode).toBe(true)

        state = editorReducer(state, { type: ZEN_MODE_CHANGED, zenMode: false })

        expect(state.zenMode).toBe(false)
        expect(state).toStrictEqual(standardState)
        expect(state).not.toBe(standardState)
    })
    it('should not change state if zenMode is the same', () => {
        let state = standardState;

        expect(state.zenMode).toBe(false)

        state = editorReducer(state, { type: ZEN_MODE_CHANGED, zenMode: false })

        expect(state.zenMode).toBe(false)
        expect(state).toBe(standardState)
    })
})

describe('KEY_PRESSED', () => {
    it('should ignore most keys', () => {
        let state = standardState;

        state = editorReducer(state, { type: KEY_PRESSED, code: 'KeyQ', key: 'a', ctrlKey: false, shiftKey: false, altKey: false, metaKey: false })

        expect(state).toBe(standardState)

        state = editorReducer(state, { type: KEY_PRESSED, code: 'KeyQ', key: 'a', ctrlKey: false, shiftKey: true, altKey: false, metaKey: false })

        expect(state).toBe(standardState)
    })

    it('should exit zenMode on Esc', () => {
        let state = { ...standardState, zenMode: true };

        expect(state.zenMode).toBe(true)

        state = editorReducer(state, { type: KEY_PRESSED, code: 'Escape', key: 'Escape', ctrlKey: false, shiftKey: false, altKey: false, metaKey: false })

        expect(state.zenMode).toBe(false)
    })

    it('should not change state on Escape if zenMode is already false', () => {
        let state = standardState;

        expect(state.zenMode).toBe(false)

        state = editorReducer(state, { type: KEY_PRESSED, code: 'Escape', key: 'Escape', ctrlKey: false, shiftKey: false, altKey: false, metaKey: false })

        expect(state.zenMode).toBe(false)
        expect(state).toBe(standardState)
    })

    it('should enter zenMode on Alt+z on QWERTY keyboard', () => {
        let state = standardState;

        expect(state.zenMode).toBe(false)

        state = editorReducer(state, { type: KEY_PRESSED, code: 'KeyZ', key: 'z', ctrlKey: false, shiftKey: false, altKey: true, metaKey: false })

        expect(state.zenMode).toBe(true)
    })

    it('should enter zenMode on Alt+z on AZERTY keyboard', () => {
        let state = standardState;

        expect(state.zenMode).toBe(false)

        state = editorReducer(state, { type: KEY_PRESSED, code: 'KeyW', key: 'z', ctrlKey: false, shiftKey: false, altKey: true, metaKey: false })

        expect(state.zenMode).toBe(true)
    })

    it('should not change state when Alt+z is pressed and zenMode already true', () => {
        let state = { ...standardState, zenMode: true };
        const referenceState = state;

        expect(state.zenMode).toBe(true)

        state = editorReducer(state, { type: KEY_PRESSED, code: 'KeyZ', key: 'z', ctrlKey: false, shiftKey: false, altKey: true, metaKey: false })

        expect(state.zenMode).toBe(true)
        expect(state).toBe(referenceState)
    })

    it('should not change state when z is pressed without Alt', () => {
        let state = standardState;

        expect(state.zenMode).toBe(false)

        state = editorReducer(state, { type: KEY_PRESSED, code: 'KeyZ', key: 'z', ctrlKey: false, shiftKey: false, altKey: false, metaKey: false })

        expect(state.zenMode).toBe(false)
        expect(state).toBe(standardState)
    })

    it('should open the import url window and reset the windowImportUrl on Alt+i', () => {
        let state = { ...standardState, windowImportUrlOpened: false, windowImportUrl: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: KEY_PRESSED, code: 'KeyG'/*Funny non QWERTY keyboard*/, key: 'i', ctrlKey: false, shiftKey: false, altKey: true, metaKey: false })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).toBe('')
    })

    it('should not change state when Alt+i is sent with the import url window already opened', () => {
        let state = { ...standardState, windowImportUrlOpened: true, windowImportUrl: 'https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=' };
        let referenceState = state;

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: KEY_PRESSED, code: 'KeyG'/*Funny non QWERTY keyboard*/, key: 'i', ctrlKey: false, shiftKey: false, altKey: true, metaKey: false })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('c4plantuml')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).toBe('https://kroki.example.com/c4plantuml/svg/eNpLVNC1U0gCAAT8AW8=')
        expect(state).toBe(referenceState)
    })
})

describe('WINDOW_RESIZED', () => {
    it('should take into account new window size', () => {
        let state = standardState;

        expect(state.width).not.toBe(1920)
        expect(state.height).not.toBe(1080)
        expect(state.renderHeight).toBe(700)
        expect(state.redrawIndex).toBe(0)

        state = editorReducer(state, { type: WINDOW_RESIZED, width: 1920, height: 1080 })

        expect(state.width).toBe(1920)
        expect(state.height).toBe(1080)
        expect(state.renderHeight).toBe(700)
        expect(state.redrawIndex).toBe(0)
    })
    it('should take into account new window size and update redrawIndex when in zen mode', () => {
        let state = { ...standardState, zenMode: true };

        expect(state.width).not.toBe(1920)
        expect(state.height).not.toBe(1080)
        expect(state.renderHeight).toBe(700)
        expect(state.redrawIndex).toBe(0)

        state = editorReducer(state, { type: WINDOW_RESIZED, width: 1920, height: 1080 })

        expect(state.width).toBe(1920)
        expect(state.height).toBe(1080)
        expect(state.renderHeight).toBe(1080)
        expect(state.redrawIndex).toBe(1)
    })
    it('should not change state if window size hasn\'t changed', () => {
        let state = { ...standardState, width: 1920, height: 1080 };
        const referenceState = state;

        expect(state.width).toBe(1920)
        expect(state.height).toBe(1080)
        expect(state.redrawIndex).toBe(0)

        state = editorReducer(state, { type: WINDOW_RESIZED, width: 1920, height: 1080 })

        expect(state.width).toBe(1920)
        expect(state.height).toBe(1080)
        expect(state.redrawIndex).toBe(0)
        expect(state).toBe(referenceState)
    })
})

describe('RENDER_EDIT_SIZE_CHANGED', () => {
    it('should redraw when render edit size change', () => {
        let state = standardState

        expect(state.redrawIndex).toBe(0)
        expect(state.renderEditHeight).toBe(0)
        expect(state.renderHeight).toBe(700)
        expect(state.renderWidth).toBe(800)

        state = editorReducer(state, { type: RENDER_EDIT_SIZE_CHANGED, renderEditWidth: 800, renderEditHeight: 21 })

        expect(state.redrawIndex).toBe(1)
        expect(state.renderEditHeight).toBe(21)
        expect(state.renderHeight).toBe(679)
        expect(state.renderWidth).toBe(800)
    })
    it('should not change state when edit size has same values than state', () => {
        let initState = {...standardState, renderEditHeight: 21, renderHeight: 679, renderWidth: 800, redrawIndex: 17}

        expect(initState.redrawIndex).toBe(17)
        expect(initState.renderEditHeight).toBe(21)
        expect(initState.renderHeight).toBe(679)
        expect(initState.renderWidth).toBe(800)

        let state = editorReducer(initState, { type: RENDER_EDIT_SIZE_CHANGED, renderEditWidth: 800, renderEditHeight: 21 })

        expect(state).toBe(initState)
    })
    it('should change state when edit size has same values than state', () => {
        let initState = {...standardState, renderEditHeight: 21, renderHeight: 679, renderWidth: 800, redrawIndex: 17}

        expect(initState.redrawIndex).toBe(17)
        expect(initState.renderEditHeight).toBe(21)
        expect(initState.renderHeight).toBe(679)
        expect(initState.renderWidth).toBe(800)

        let state = editorReducer(initState, { type: RENDER_EDIT_SIZE_CHANGED, renderEditWidth: 801, renderEditHeight: 22 })

        expect(state).not.toBe(initState)
        expect(state.redrawIndex).toBe(18)
        expect(state.renderEditHeight).toBe(22)
        expect(state.renderHeight).toBe(678)
        expect(state.renderWidth).toBe(801)
    })
})