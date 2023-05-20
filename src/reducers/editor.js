import { COPY_BUTTON_HOVERED, DIAGRAM_CHANGED, DIAGRAM_CHANGED_UPDATE, DIAGRAM_TYPE_CHANGED, RENDERURL_CHANGED, TEXT_COPIED, IMPORT_URL, CLOSE_IMPORT_URL, OPEN_IMPORT_URL, UPDATE_IMPORT_URL, DIAGRAM_HAS_ERROR, ZEN_MODE_CHANGED, KEY_PRESSED, WINDOW_RESIZED, RENDER_EDIT_SIZE_CHANGED } from "../constants/editor";
import { createReducer } from "./utils/createReducer";
import { encode, decode } from "../kroki/coder";
import diagramTypes from "../kroki/krokiInfo";
import { IMPORT_EXAMPLE } from "../constants/example";
import { createKrokiUrl } from "../kroki/utils";
import { LOCATION_CHANGE } from "connected-react-router";
import exampleData from '../examples/data';
import { CHANGED, DIAGRAM_IMAGE_GET_END, DIAGRAM_IMAGE_GET_FAIL, DIAGRAM_IMAGE_GET_START, DIAGRAM_IMAGE_SAVE_END, DIAGRAM_IMAGE_SAVE_FAIL, DIAGRAM_IMAGE_SAVE_START, DIAGRAM_SOURCE_READ, DIAGRAM_SOURCE_SAVE_END, DIAGRAM_SOURCE_SAVE_FAIL, DIAGRAM_SOURCE_SAVE_START, SAVED, SAVING, SET_FILE } from "../constants/file";

/** @typedef {import('../actions/utils/fileaccess').FullFilename} FullFilename */

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
    height: null,
    width: null,
    renderHeight: 700,
    editorHeight: 700,
    renderWidth: 800,
    renderEditHeight: 0,
    redrawIndex: 0,
    diagramSourceStatus: SAVED,
    diagramImageStatus: SAVED,
    diagramDiskStatus: SAVED,
    fullFilename: null,
    fullFilenamePath: null,
    fileLoading: false,
};

const setWindowWidthHeight = (state, width, height) => {
    const { zenMode } = state
    const editorHeight = zenMode ? (width < 768 ? height / 2 - 14 : height) : 700
    const renderHeight = editorHeight - state.renderEditHeight
    let redrawIndex = state.redrawIndex
    if (renderHeight !== state.renderHeight) {
        redrawIndex += 1
    }
    if (width !== state.width || height !== state.height || renderHeight !== state.renderHeight || editorHeight !== state.editorHeight || redrawIndex !== state.redrawIndex) {
        return { ...state, width, height, renderHeight, editorHeight, redrawIndex }
    }
    return state
}

const setRenderWidth = (state, renderEditWidth, renderEditHeight) => {
    const renderWidth = renderEditWidth
    const renderHeight = state.editorHeight - renderEditHeight
    let redrawIndex = state.redrawIndex
    if (renderWidth !== state.renderWidth || renderHeight !== state.renderHeight) {
        redrawIndex += 1
    }
    if (renderWidth !== state.renderWidth || renderHeight !== state.renderHeight || renderEditHeight !== state.renderEditHeight || redrawIndex !== state.redrawIndex) {
        return { ...state, renderWidth, renderHeight, renderEditHeight, redrawIndex }
    }
    return state
}

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

const updateDiagramTypeAndTextIfDefault = (state, diagramType, fullFilename) => {
    if ((state.diagramText === '') || (state.defaultDiagram)) {
        state = { ...state, fullFilename, diagramType, diagramText: decode(state.diagramTypes[diagramType].example), defaultDiagram: true, redrawIndex: state.redrawIndex + 1 };
    } else {
        state = { ...state, fullFilename, diagramType, redrawIndex: state.redrawIndex + 1 };
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
        const { fullFilename } = state
        let diagramSourceStatus = fullFilename ? CHANGED : ''
        let diagramImageStatus = fullFilename ? CHANGED : ''
        let diagramDiskStatus = fullFilename ? CHANGED : ''
        if ( diagramText === state.diagramText && state.fileLoading) {
            return state
        }
        if (diagramText !== state.diagramText || diagramSourceStatus !== state.diagramSourceStatus || diagramImageStatus !== state.diagramImageStatus || diagramDiskStatus !== state.diagramDiskStatus) {
            state = { ...state, diagramText, diagramSourceStatus, diagramImageStatus, diagramDiskStatus };
        }
        return state;
    },
    [DIAGRAM_SOURCE_READ]: (state, action) => {
        const { diagramText } = action;
        let diagramSourceStatus = SAVED
        let diagramImageStatus = CHANGED
        let diagramDiskStatus = CHANGED
        if (diagramText !== state.diagramText || diagramSourceStatus !== state.diagramSourceStatus || diagramImageStatus !== state.diagramImageStatus || diagramDiskStatus !== state.diagramDiskStatus) {
            state = { ...state, diagramText, diagramSourceStatus, diagramImageStatus, diagramDiskStatus };
        }
        return state;
    },
    [DIAGRAM_CHANGED_UPDATE]: (state) => {
        state = updateDiagram(state);
        return state;
    },
    [DIAGRAM_TYPE_CHANGED]: (state, action) => {
        const { diagramType } = action;
        let fullFilename = state.fullFilename
        if (fullFilename) {
            const { repo, path_parts, filename } = fullFilename
            if (filename && filename.endsWith('.' + state.diagramType)) {
                fullFilename = { repo, path_parts, filename: filename.slice(0, filename.length - state.diagramType.length + 1) + diagramType }
            }
        }
        if (diagramType !== state.diagramType || fullFilename !== state.fullFilename) {
            state = updateDiagramTypeAndTextIfDefault(state, diagramType, fullFilename);
        }
        return state;
    },
    [IMPORT_EXAMPLE]: (state, action) => {
        const { diagramText, diagramType } = action;
        if ((diagramText !== state.diagramText) || (diagramType !== state.diagramType)) {
            state = updateDiagram({ ...state, diagramText, diagramType })
            state = { ...state, redrawIndex: state.redrawIndex + 1 }
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
            state = { ...state, zenMode }
        }
        return state;
    },
    [KEY_PRESSED]: (state, action) => {
        const { key, ctrlKey, shiftKey, altKey, metaKey } = action
        if (key === 'Escape' && (!ctrlKey) && (!shiftKey) && (!altKey) && (!metaKey)) {
            if (state.zenMode) {
                state = { ...state, zenMode: false }
            }
        }
        if (key === 'z' && (!ctrlKey) && (!shiftKey) && (altKey) && (!metaKey)) {
            if (!state.zenMode) {
                state = { ...state, zenMode: true }
            }
        }
        if (key === 'i' && (!ctrlKey) && (!shiftKey) && (altKey) && (!metaKey)) {
            if (!state.windowImportUrlOpened) {
                state = { ...state, windowImportUrlOpened: true, windowImportUrl: '' };
            }
        }
        return state;
    },
    [WINDOW_RESIZED]: (state, action) => {
        const { width, height } = action
        return setWindowWidthHeight(state, width, height)
    },
    [RENDER_EDIT_SIZE_CHANGED]: (state, action) => {
        const { renderEditWidth, renderEditHeight } = action
        return setRenderWidth(state, renderEditWidth, renderEditHeight)
    },
    [SET_FILE]: (state, action) => {
        /** @type {FullFilename} */
        const fullFilename = action.fullFilename && action.fullFilename.repo ? action.fullFilename : null
        const fullFilenamePath = fullFilename ? `/${fullFilename.repo}/${fullFilename.path_parts.map((path_part) => path_part + '/').join('')}${fullFilename.filename}` : null;
        const diagramImage = fullFilename ? state.diagramImage : null
        const fileLoading = fullFilename ? true : false
        let diagramType = state.diagramType
        if (fullFilename) {
            const parts = fullFilename?.filename?.split('.')
            if (parts && parts.length > 0) {
                diagramType = parts[parts.length-1]
            }
        }
        if (fullFilename !== state.fullFilename || fullFilenamePath !== state.fullFilenamePath || diagramImage !== state.diagramImage || diagramType !== state.diagramType || fileLoading !== state.fileLoading) {
            state = { ...state, fullFilename, fullFilenamePath, diagramImage, diagramType, fileLoading }
        }
        return state
    },
    [DIAGRAM_SOURCE_SAVE_START]: (state, action) => {
        const diagramSourceStatus = SAVING
        if (diagramSourceStatus !== state.diagramSourceStatus) {
            state = { ...state, diagramSourceStatus }
        }
        return state
    },
    [DIAGRAM_SOURCE_SAVE_END]: (state, action) => {
        const diagramSourceStatus = SAVED
        if (diagramSourceStatus !== state.diagramSourceStatus) {
            state = { ...state, diagramSourceStatus }
        }
        return state
    },
    [DIAGRAM_SOURCE_SAVE_FAIL]: (state, action) => {
        const diagramSourceStatus = ''
        if (diagramSourceStatus !== state.diagramSourceStatus) {
            state = { ...state, diagramSourceStatus }
        }
        return state
    },
    [DIAGRAM_IMAGE_GET_START]: (state, action) => {
        const diagramImageStatus = SAVING
        if (diagramImageStatus !== state.diagramImageStatus) {
            state = { ...state, diagramImageStatus }
        }
        return state
    },
    [DIAGRAM_IMAGE_GET_END]: (state, action) => {
        const diagramImageStatus = SAVED
        const { diagramImage } = action
        if (diagramImageStatus !== state.diagramImageStatus || diagramImage !== state.diagramImage) {
            state = { ...state, diagramImageStatus, diagramImage, diagramError: false }
        }
        // if (diagramImageStatus !== state.diagramImageStatus) {
        //     state = { ...state, diagramImageStatus }
        // }
        return state
    },
    [DIAGRAM_IMAGE_GET_FAIL]: (state, action) => {
        const diagramImageStatus = ''
        if (diagramImageStatus !== state.diagramImageStatus) {
            state = { ...state, diagramImageStatus, diagramError: true }
        }
        return state
    },
    [DIAGRAM_IMAGE_SAVE_START]: (state, action) => {
        const diagramDiskStatus = SAVING
        if (diagramDiskStatus !== state.diagramDiskStatus) {
            state = { ...state, diagramDiskStatus }
        }
        return state
    },
    [DIAGRAM_IMAGE_SAVE_END]: (state, action) => {
        const diagramDiskStatus = SAVED
        if (diagramDiskStatus !== state.diagramDiskStatus) {
            state = { ...state, diagramDiskStatus }
        }
        return state
    },
    [DIAGRAM_IMAGE_SAVE_FAIL]: (state, action) => {
        const diagramDiskStatus = ''
        if (diagramDiskStatus !== state.diagramDiskStatus) {
            state = { ...state, diagramDiskStatus }
        }
        return state
    },
}, initialState);
