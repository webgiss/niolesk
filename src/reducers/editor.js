import { COPY_BUTTON_HOVERED, DIAGRAM_CHANGED, DIAGRAM_CHANGED_UPDATE, DIAGRAM_TYPE_CHANGED, RENDERURL_CHANGED, TEXT_COPIED } from "../constants/editor";
import { createReducer } from "./utils/createReducer";
import { encode, decode } from "./utils/coder";

const initialState = {
    baseUrl: window.location.origin + window.location.pathname,
    hash: null,
    diagramType: 'plantuml',
    filetype: 'svg',
    diagramTypes: {
        blockdiag: { name: 'BlockDiag', },
        bpmn: { name: 'BPMN', },
        bytefield: { name: 'Bytefield', },
        seqdiag: { name: 'SeqDiag', },
        actdiag: { name: 'ActDiag', },
        nwdiag: { name: 'NwDiag', },
        packetdiag: { name: 'PacketDiag', },
        rackdiag: { name: 'RackDiag', },
        c4plantuml: { name: 'C4 with PlantUML', },
        ditaa: { name: 'Ditaa', },
        erd: { name: 'Erd', },
        excalidraw: { name: 'Excalidraw', },
        graphviz: { name: 'GraphViz', },
        mermaid: { name: 'Mermaid', },
        nomnoml: { name: 'Nomnoml', },
        pikchr: { name: 'Pikchr', },
        plantuml: { name: 'PlantUML', },
        svgbob: { name: 'Svgbob', },
        vega: { name: 'Vega', },
        vegalite: { name: 'Vega-Lite', },
        wavedrom: { name: 'WaveDrom', },
    },
    renderUrl: 'https://kroki.io/',
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
    }
};

/**
 * 
 * @param {State} state 
 * @returns 
 */
const updateDiagram = (state) => {
    let { diagramType, filetype, renderUrl, diagramText, baseUrl } = state;
    if (!renderUrl || renderUrl === '') {
        renderUrl = 'https://kroki.io';
    }
    if (!filetype || filetype === '') {
        filetype = 'svg';
    }
    const codedDiagramTextText = encode(diagramText);
    const diagramUrl = [renderUrl.replace(/\/*$/, ''), diagramType, filetype, codedDiagramTextText].join('/')
    if (state.diagramUrl !== diagramUrl) {
        state = { ...state, diagramUrl, diagramEditUrl: `${baseUrl}#${diagramUrl}` }
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
const updateHash = (state, hash) => {
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
    if (urlParts.length >= 3) {
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
    state = { ...state, hash, filetype, diagramType, renderUrl, diagramText };
    state = updateDiagram(state);
    return state;
}

export default createReducer({
    "@@router/LOCATION_CHANGE": (state, action) => {
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
        return { ...state, scopes: { ...state.scopes, [scope]: { ...state.scopes[scope], isHover } } }
    },
    [TEXT_COPIED]: (state, action) => {
        const { scope, isCopied } = action;
        return { ...state, scopes: { ...state.scopes, [scope]: { ...state.scopes[scope], isCopied } } }
    },
    [RENDERURL_CHANGED]: (state, action) => {
        const { renderUrl } = action;
        state = { ...state, renderUrl };
        state = updateDiagram(state);
        return state;
    },
    [DIAGRAM_CHANGED]: (state, action) => {
        const { diagramText } = action;
        state = { ...state, diagramText };
        // state = updateDiagram(state);
        return state;
    },
    [DIAGRAM_CHANGED_UPDATE]: (state) => {
        state = updateDiagram(state);
        return state;
    },
    [DIAGRAM_TYPE_CHANGED]: (state, action) => {
        const { diagramType } = action;
        state = { ...state, diagramType };
        state = updateDiagram(state);
        return state;
    },
}, initialState);
