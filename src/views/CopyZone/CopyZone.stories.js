import CopyZone from './CopyZone';
import { getReduxMockDecorator } from '../storybook/store';
import { getComponenent } from '../storybook/stories'

const defaultState = {
    editor: {
        diagramEditUrl: 'poide',
        diagramUrl: 'praf',
        scopes: {
            image: { isHover: false, isCopied: false },
            edit: { isHover: false, isCopied: false },
            markdown: { isHover: false, isCopied: false },
        }
    }
}

const typeString = { type: { name: 'string' } };
const typeBoolean = { type: { name: 'boolean' } }
export default {
    title: 'Components/CopyZone',
    component: CopyZone,
    argTypes: {
        diagramUrl: typeString,
        diagramEditUrl: typeString,
        isHoverImage: typeBoolean,
        isCopiedImage: typeBoolean,
        isHoverEdit: typeBoolean,
        isCopiedEdit: typeBoolean,
        isHoverMarkdown: typeBoolean,
        isCopiedMarkdown: typeBoolean,
    },
};

const updateStateEditor = (state, args, name) => {
    if (args[name]) {
        state = {
            ...state,
            editor: {
                ...state.editor,
                [name]: args[name],
            },
        }
    }
    return state;
}
const updateStateEditorScope = (state, args, scope, name, argName) => {
    if (args[argName]) {
        state = {
            ...state,
            editor: {
                ...state.editor,
                scopes: {
                    ...state.editor.scopes,
                    [scope]: {
                        ...state.editor.scopes[scope],
                        [name]: args[argName],
                    },
                },
            },
        }
    }
    return state;
}

const Template = (args) => {
    let state = defaultState;
    state = updateStateEditor(state, args, 'diagramUrl')
    state = updateStateEditor(state, args, 'diagramEditUrl')
    state = updateStateEditorScope(state, args, 'image', 'isHover', 'isHoverImage')
    state = updateStateEditorScope(state, args, 'image', 'isCopied', 'isCopiedImage')
    state = updateStateEditorScope(state, args, 'edit', 'isHover', 'isHoverEdit')
    state = updateStateEditorScope(state, args, 'edit', 'isCopied', 'isCopiedEdit')
    state = updateStateEditorScope(state, args, 'markdown', 'isHover', 'isHoverMarkdown')
    state = updateStateEditorScope(state, args, 'markdown', 'isCopied', 'isCopiedMarkdown')

    const { setState, decorator } = getReduxMockDecorator()

    setState(state)
    return decorator(CopyZone)
};

const defaultArgs = {
    diagramUrl: 'https://kroki.example.com/dtype/data4879DATA0000==',
    diagramEditUrl: 'https://niolesk.example.com/#https://kroki.example.com/dtype/data4879DATA0000==',
    isHoverImage: false,
    isCopiedImage: false,
    isHoverEdit: false,
    isCopiedEdit: false,
    isHoverMarkdown: false,
    isCopiedMarkdown: false,
};

export const Default = getComponenent(Template, {...defaultArgs});
export const WithImageHover = getComponenent(Template, {...defaultArgs, isHoverImage: true});
export const WithImageCopied = getComponenent(Template, {...defaultArgs, isCopiedImage: true});
export const WithImageCopiedHover = getComponenent(Template, {...defaultArgs, isHoverImage: true, isCopiedImage: true});
export const WithEditHover = getComponenent(Template, {...defaultArgs, isHoverEdit: true});
