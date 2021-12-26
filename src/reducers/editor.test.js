import { CLOSE_IMPORT_URL, COPY_BUTTON_HOVERED, DIAGRAM_CHANGED, DIAGRAM_CHANGED_UPDATE, DIAGRAM_HAS_ERROR, DIAGRAM_TYPE_CHANGED, IMPORT_URL, OPEN_IMPORT_URL, RENDERURL_CHANGED, TEXT_COPIED, UPDATE_IMPORT_URL } from '../constants/editor';
import editorReducer, { initialState, updateDiagram } from './editor'

const standardState = updateDiagram(initialState);
import exampleData from '../examples/data';
import { decode } from '../kroki/coder';
import { IMPORT_EXAMPLE } from '../constants/example';

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
})

describe('IMPORT_EXAMPLE', () => {
    it('should update both diagramText and diagramType for defaultDiagrams', () => {
        let state = standardState;

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.diagramText).toBe(standardState.diagramText)
        expect(state.diagramType).toBe(standardState.diagramType)

        state = editorReducer(state, { type: IMPORT_EXAMPLE, diagramText: 'a -> b', diagramType: 'plantumlC4' })

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('plantumlC4')
    })

    it('should update both diagramText and diagramType for non defaultDiagrams', () => {
        let state = updateDiagram({ ...standardState, diagramText: 'b -> c', diagramType: 'plantuml' });

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.diagramText).not.toBe(standardState.diagramText)
        expect(state.diagramType).toBe(standardState.diagramType)

        state = editorReducer(state, { type: IMPORT_EXAMPLE, diagramText: 'a -> b', diagramType: 'plantumlC4' })

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('plantumlC4')
    })

    it('should update both diagramText and diagramType for non defaultDiagrams if provided a with default digram', () => {
        const { example, diagramType } = exampleData.filter((exampleItem) => !exampleItem.default)[0]
        const diagramText = decode(example)
        let state = updateDiagram({ ...standardState, diagramText, diagramType });

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.diagramText).not.toBe(standardState.diagramText)
        expect(state.diagramType).not.toBe(standardState.diagramType)

        state = editorReducer(state, { type: IMPORT_EXAMPLE, diagramText: 'a -> b', diagramType: 'plantumlC4' })

        expect(state.defaultDiagram).toBe(false)
        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('plantumlC4')
    })
})

describe('IMPORT_URL', () => {
    it('should import correctly a diagramText, a diagramType and a renderUrl given an URL', () => {
        let state = standardState;

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)

        state = editorReducer(state, { type: IMPORT_URL, url: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('plantumlC4')
        expect(state.renderUrl).toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
    })

    it('should close windowImportUrl if opened', () => {
        let state = { ...standardState, windowImportUrlOpened: true };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)

        state = editorReducer(state, { type: IMPORT_URL, url: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('plantumlC4')
        expect(state.renderUrl).toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
    })

    it('should reset windowImportUrl field', () => {
        let state = { ...standardState, windowImportUrlOpened: true, windowImportUrl: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: IMPORT_URL, url: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('plantumlC4')
        expect(state.renderUrl).toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).toBe('')
    })

    it('should update hash', () => {
        let state = standardState;

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.hash).not.toBe('https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=')

        state = editorReducer(state, { type: IMPORT_URL, url: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.diagramText).toBe('a -> b')
        expect(state.diagramType).toBe('plantumlC4')
        expect(state.renderUrl).toBe('https://kroki.example.com')
        expect(state.hash).toBe('https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=')
    })
})

describe('CLOSE_IMPORT_URL', () => {
    it('should close the import url window and reset the windowImportUrl', () => {
        let state = { ...standardState, windowImportUrlOpened: true, windowImportUrl: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: CLOSE_IMPORT_URL })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).toBe('')
    })
    it('should cstill work - and reset the windowImportUrl - if the window is already closed', () => {
        let state = { ...standardState, windowImportUrlOpened: false, windowImportUrl: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: CLOSE_IMPORT_URL })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).toBe('')
    })
})

describe('OPEN_IMPORT_URL', () => {
    it('should open the import url window and reset the windowImportUrl', () => {
        let state = { ...standardState, windowImportUrlOpened: false, windowImportUrl: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(false)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: OPEN_IMPORT_URL })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).toBe('')
    })
    it('should cstill work - and reset the windowImportUrl - if the window is already opened', () => {
        let state = { ...standardState, windowImportUrlOpened: true, windowImportUrl: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' };

        expect(state.defaultDiagram).toBe(true)
        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).not.toBe('')

        state = editorReducer(state, { type: OPEN_IMPORT_URL })

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')
        expect(state.windowImportUrlOpened).toBe(true)
        expect(state.windowImportUrl).toBe('')
    })
})

describe('UPDATE_IMPORT_URL', () => {
    it('should open the import url window and reset the windowImportUrl', () => {
        let state = { ...standardState, windowImportUrlOpened: false, windowImportUrl: 'https://kroki.example.com/plantumlC4/sv' };

        expect(state.windowImportUrl).toBe('https://kroki.example.com/plantumlC4/sv')

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
        expect(state.renderUrl).not.toBe('https://kroki.example.com')

        state = editorReducer(state, { type: UPDATE_IMPORT_URL, url: 'https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=' })

        expect(state.windowImportUrl).not.toBe('https://kroki.example.com/plantumlC4/sv')
        expect(state.windowImportUrl).toBe('https://kroki.example.com/plantumlC4/svg/eNpLVNC1U0gCAAT8AW8=')

        expect(state.diagramText).not.toBe('a -> b')
        expect(state.diagramType).not.toBe('plantumlC4')
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