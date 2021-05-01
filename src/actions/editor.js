import { COPY_TEXT, TEXT_COPIED, COPY_BUTTON_HOVERED, RENDERURL_CHANGED, DIAGRAM_CHANGED, DIAGRAM_TYPE_CHANGED, DIAGRAM_CHANGED_UPDATE } from "../constants/editor";
import delay from "./utils/delay";
import copy from 'copy-to-clipboard';


/**
 * Copy the text associated to the scope
 * 
 * @param {string} scope 
 * @param {string} text
 */
export const copyText = (scope, text) => async (dispatch, getState) => {
    dispatch({ type: COPY_TEXT, scope, text });
    copy(text);
    dispatch({ type: TEXT_COPIED, scope, isCopied: true });
    await delay(1000);
    dispatch({ type: TEXT_COPIED, scope, isCopied: false });
};

/**
 * Indicate that the Copy button from the scope is hovered or not.
 * 
 * @param {string} scope 
 * @param {boolean} isHover 
 */
export const copyButtonHovered = (scope, isHover) => ({ type: COPY_BUTTON_HOVERED, scope, isHover });

/**
 * Called when the renderUrl has changed.
 * 
 * @param {string} renderUrl
 * @returns 
 */
export const renderUrlChanged = (renderUrl) => ({ type: RENDERURL_CHANGED, renderUrl })

let lastChange = null;

/**
 * Called when the diagramText has changed.
 * 
 * @param {string} diagramText 
 * @returns 
 */
export const diagramChanged = (diagramText) => async (dispatch, getState) => {
    dispatch({ type: DIAGRAM_CHANGED, diagramText });
    const currentChange = (new Date()).getTime();
    lastChange = currentChange;
    await delay(750);
    if (lastChange === currentChange) {
        dispatch({ type: DIAGRAM_CHANGED_UPDATE });
    }
}

/**
 * Called when diagramType changed
 * 
 * @param {string} diagramType 
 * @returns 
 */
export const diagramTypeChanged = (diagramType) => ({ type: DIAGRAM_TYPE_CHANGED, diagramType });
