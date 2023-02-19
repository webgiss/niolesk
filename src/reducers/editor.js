import { COPY_BUTTON_HOVERED, DIAGRAM_CHANGED, DIAGRAM_CHANGED_UPDATE, DIAGRAM_TYPE_CHANGED, RENDERURL_CHANGED, TEXT_COPIED, IMPORT_URL, CLOSE_IMPORT_URL, OPEN_IMPORT_URL, UPDATE_IMPORT_URL, DIAGRAM_HAS_ERROR, ZEN_MODE_CHANGED, KEY_PRESSED, WINDOW_RESIZED, PAN_ZOOM_CHANGE_TOOL, PAN_ZOOM_CHANGE_VALUE, PAN_ZOOM_USE, PAN_ZOOM_TOGGLE, SET_TEXT_HEIGHT } from "../constants/editor";
import { createReducer } from "./utils/createReducer";
import { encode, decode } from "../kroki/coder";
import diagramTypes from "../kroki/krokiInfo";
import { IMPORT_EXAMPLE } from "../constants/example";
import { createKrokiUrl } from "../kroki/utils";
import { LOCATION_CHANGE } from "connected-react-router";
import exampleData from '../examples/data';

const defaultDiagramType = 'plantuml';

export const initialState = {
    baseUrl: window.location.origin + window.location.pathname,
    hash: null,
    diagramType: defaultDiagramType,
    diagramText: decode(diagramTypes[defaultDiagramType].example),
    filetype: 'svg',
    defaultDiagram: true,
    diagramTypes,
    language: null,
    renderUrl: (window.config && window.config.krokiEngineUrl) || 'https://kroki.io/',
    scopes: {
        'image': {
            isHover: false,
            isCopied: false,
        },
        'edit': {
            isHover: false,
            isCopied: false,
        },
        'markdown': {
            isHover: false,
            isCopied: false,
        },
        'markdownsource': {
            isHover: false,
            isCopied: false,
        },
    },
    windowImportUrlOpened: false,
    windowImportUrl: '',
    diagramError: false,
    zenMode: false,
    pan_zoom_use: true,
    pan_zoom_tool: 'pan',
    pan_zoom_value: {},
    editorHeight: 700,
    textHeight: 0,
};

/**
 * 
 * @param {State} state 
 * @returns 
 */
export const updateDiagram = (state) => {
    let { diagramType, filetype, renderUrl, diagramText, baseUrl, diagramTypes } = state;
    if (!renderUrl || renderUrl === '') {
        renderUrl = initialState.renderUrl;
    }
    if (!filetype || filetype === '') {
        filetype = initialState.filetype;
    }
    if (!diagramType || diagramType === '') {
        diagramType = state.diagramType;
    }
    if (!diagramType || diagramType === '') {
        diagramType = initialState.diagramType;
    }
    const language = diagramTypes[diagramType]?.language;
    const codedDiagramTextText = encode(diagramText);
    const defaultDiagram = exampleData.filter(({ diagramType: type, example }) => (diagramType === type) && (example === codedDiagramTextText)).length > 0;
    const diagramUrl = createKrokiUrl(renderUrl, diagramType, filetype, codedDiagramTextText);
    if (state.diagramUrl !== diagramUrl) {
        state = { ...state, diagramUrl, diagramEditUrl: `${baseUrl}#${diagramUrl}`, diagramError: false, defaultDiagram, language }
    }
    return state;
}

/**
 * 
 * @param {State} state 
 * @param {string} hash 
 * @returns 
 * @template State
 */
export const updateHash = (state, hash) => {
    let url = hash;
    if (url.startsWith('#')) {
        url = url.substr(1);
    }
    let protocol = null;
    let renderSite = null;
    let coded = null;
    let filetype = null;
    let diagramType = null;
    let renderUrl = null;
    let diagramText = null;
    const protocolSeparator = '://';
    const protocolSeparatorPosition = url.indexOf(protocolSeparator);
    if (protocolSeparatorPosition >= 0) {
        protocol = url.substr(0, protocolSeparatorPosition);
        url = url.substr(protocolSeparatorPosition + protocolSeparator.length)
    }
    const urlParts = url.split('/');
    if (urlParts.length >= 4) {
        coded = urlParts[urlParts.length - 1];
        filetype = urlParts[urlParts.length - 2];
        diagramType = urlParts[urlParts.length - 3];
        if (urlParts.length > 3) {
            renderSite = urlParts.slice(0, urlParts.length - 3).join('/')
        }
    }
    if (renderSite && protocol) {
        renderUrl = protocol + protocolSeparator + renderSite;
    }
    if (coded) {
        diagramText = decode(coded);
    } else {
        diagramText = state.diagramText;
    }
    if (filetype === null) {
        filetype = state.filetype
    }
    if (diagramType === null) {
        diagramType = state.diagramType
    }
    if (renderUrl === null) {
        renderUrl = state.renderUrl
    }
    if (diagramText === null) {
        diagramText = state.diagramText
    }
    if (state.hash !== hash || state.filetype !== filetype || state.renderUrl !== renderUrl || state.diagramText !== diagramText) {
        state = { ...state, hash, filetype, diagramType, renderUrl, diagramText };
        state = updateDiagram(state);
    }
    return state;
}

const updateDiagramTypeAndTextIfDefault = (state, diagramType) => {
    if ((state.diagramText === '') || (state.defaultDiagram)) {
        state = { ...state, diagramType, diagramText: decode(state.diagramTypes[diagramType].example), defaultDiagram: true };
    } else {
        state = { ...state, diagramType };
    }
    state = updateDiagram(state);
    return state;
}

export default createReducer({
    [LOCATION_CHANGE]: (state, action) => {
        const { location, isFirstRendering } = action.payload;
        let hash = location.hash;
        if (hash === undefined) {
            hash = location.location.hash;
        }
        if (state.hash !== hash || isFirstRendering) {
            state = updateHash(state, hash);
        }
        return state;
    },
    [COPY_BUTTON_HOVERED]: (state, action) => {
        const { scope, isHover } = action;
        if (isHover !== state.scopes[scope].isHover) {
            state = { ...state, scopes: { ...state.scopes, [scope]: { ...state.scopes[scope], isHover } } }
        }
        return state;
    },
    [TEXT_COPIED]: (state, action) => {
        const { scope, isCopied } = action;
        if (isCopied !== state.scopes[scope].isCopied) {
            state = { ...state, scopes: { ...state.scopes, [scope]: { ...state.scopes[scope], isCopied } } }
        }
        return state;
    },
    [RENDERURL_CHANGED]: (state, action) => {
        const { renderUrl } = action;
        if (renderUrl !== state.renderUrl || !state.diagramUrl) {
            state = { ...state, renderUrl };
            state = updateDiagram(state);
        }
        return state;
    },
    [DIAGRAM_CHANGED]: (state, action) => {
        const { diagramText } = action;
        if (diagramText !== state.diagramText) {
            state = { ...state, diagramText };
            // state = updateDiagram(state);
        }
        return state;
    },
    [DIAGRAM_CHANGED_UPDATE]: (state) => {
        state = updateDiagram(state);
        return state;
    },
    [DIAGRAM_TYPE_CHANGED]: (state, action) => {
        const { diagramType } = action;
        if (diagramType !== state.diagramType) {
            state = updateDiagramTypeAndTextIfDefault(state, diagramType);
        }
        return state;
    },
    [IMPORT_EXAMPLE]: (state, action) => {
        const { diagramText, diagramType } = action;
        if ((diagramText !== state.diagramText) || (diagramType !== state.diagramType)) {
            state = updateDiagram({ ...state, diagramText, diagramType })
        }
        return state;
    },
    [IMPORT_URL]: (state, action) => {
        const { url } = action;
        if (url && url !== '') {
            state = { ...state, windowImportUrlOpened: false, windowImportUrl: '' };
            state = updateHash(state, url);
        }
        return state;
    },
    [CLOSE_IMPORT_URL]: (state) => {
        state = { ...state, windowImportUrlOpened: false, windowImportUrl: '' };
        return state;
    },
    [OPEN_IMPORT_URL]: (state) => {
        state = { ...state, windowImportUrlOpened: true, windowImportUrl: '' };
        return state;
    },
    [UPDATE_IMPORT_URL]: (state, action) => {
        const { url } = action;
        state = { ...state, windowImportUrl: url };
        return state;
    },
    [DIAGRAM_HAS_ERROR]: (state, action) => {
        const { url } = action;
        if (url === state.diagramUrl) {
            state = { ...state, diagramError: true }
        }
        return state;
    },
    [ZEN_MODE_CHANGED]: (state, action) => {
        const { zenMode } = action;
        if (zenMode !== state.zenMode) {
            const editorHeight = zenMode ? state.height : 700;
            state = { ...state, zenMode, editorHeight }
        }
        return state;
    },
    [KEY_PRESSED]: (state, action) => {
        const { key, ctrlKey, shiftKey, altKey, metaKey } = action
        if (key === 'Escape' && (!ctrlKey) && (!shiftKey) && (!altKey) && (!metaKey)) {
            if (state.zenMode) {
                state = { ...state, zenMode: false, editorHeight: 700 }
            }
        }
        if (key === 'z' && (!ctrlKey) && (!shiftKey) && (altKey) && (!metaKey)) {
            if (!state.zenMode) {
                state = { ...state, zenMode: true, editorHeight: state.height }
            }
        }
        if (key === 'i' && (!ctrlKey) && (!shiftKey) && (altKey) && (!metaKey)) {
            if (!state.windowImportUrlOpened) {
                state = { ...state, windowImportUrlOpened: true, windowImportUrl: '' };
            }
        }
        if (key === 'p' && (!ctrlKey) && (!shiftKey) && (altKey) && (!metaKey)) {
            state = { ...state, pan_zoom_use: !(state.pan_zoom_use) }
        }
        return state;
    },
    [WINDOW_RESIZED]: (state, action) => {
        const { width, height } = action
        const editorHeight = state.zenMode ? height : 700;
        if (width !== state.width || height !== state.height || editorHeight !== state.editorHeight) {
            state = { ...state, width, height, editorHeight }
        }
        // console.log({ width, height })
        return state;
    },

    [PAN_ZOOM_USE]: (state, action) => {
        const { use } = action
        if (use !== state.pan_zoom_use) {
            state = { ...state, pan_zoom_use: use }
        }
        return state;
    },
    [PAN_ZOOM_TOGGLE]: (state) => {
        state = { ...state, pan_zoom_use: !state.pan_zoom_use }
        return state;
    },
    [PAN_ZOOM_CHANGE_TOOL]: (state, action) => {
        const { tool } = action
        if (tool !== state.pan_zoom_tool) {
            state = { ...state, pan_zoom_tool: tool }
        }
        return state;
    },
    [PAN_ZOOM_CHANGE_VALUE]: (state, action) => {
        const { value } = action
        if (value !== state.value) {
            state = { ...state, pan_zoom_value: value }
        }
        return state;
    },
    [SET_TEXT_HEIGHT]: (state, action) => {
        const { height } = action
        if (height !== state.textHeight) {
            state = { ...state, textHeight: height }
        }
        return state;
    },
}, initialState);
