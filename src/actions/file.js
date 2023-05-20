import axios from "axios";
import { DIAGRAM_IMAGE_GET_END, DIAGRAM_IMAGE_GET_FAIL, DIAGRAM_IMAGE_GET_START, DIAGRAM_IMAGE_SAVE_END, DIAGRAM_IMAGE_SAVE_FAIL, DIAGRAM_IMAGE_SAVE_START, DIAGRAM_SOURCE_SAVE_END, DIAGRAM_SOURCE_SAVE_FAIL, DIAGRAM_SOURCE_SAVE_START } from "../constants/file";
import { getDirectoryHandle, writeFile } from "./utils/fileaccess";
import { getLastChange } from "./editor";

export const ensureRepoIsAccessible = async (currentChange, fullFilename) => {
    if (getLastChange() === currentChange && fullFilename && fullFilename.repo) {
        await getDirectoryHandle(fullFilename.repo)
    }
}

export const saveFile = async (dispatch, currentChange, fullFilename, diagramText) => {
    if (getLastChange() === currentChange) {
        dispatch({ type: DIAGRAM_SOURCE_SAVE_START });
        try {
            if (getLastChange() === currentChange) {
                await writeFile(fullFilename, diagramText)
                if (getLastChange() === currentChange) {
                    dispatch({ type: DIAGRAM_SOURCE_SAVE_END });
                }
            }
        } catch {
            if (getLastChange() === currentChange) {
                dispatch({ type: DIAGRAM_SOURCE_SAVE_FAIL });
            }
        }
    }
}

export const getDiagramImage = async (dispatch, currentChange, renderUrl, diagramText, diagramType, filetype) => {
    if (getLastChange() === currentChange) {
        dispatch({ type: DIAGRAM_IMAGE_GET_START });

        try {
            if (getLastChange() === currentChange) {
                const response = await axios({
                    method: 'post',
                    url: `${renderUrl}/${diagramType}/${filetype}`,
                    data: {
                        diagram_source: diagramText,
                        // diagram_type: diagramType,
                        // output_format: filetype
                    }
                })
                if (getLastChange() === currentChange) {
                    if (response && response.data) {
                        dispatch({ type: DIAGRAM_IMAGE_GET_END, diagramImage: response.data })
                        return response.data
                    } else {
                        dispatch({ type: DIAGRAM_IMAGE_GET_FAIL })
                    }
                }
            }
        } catch {
            if (getLastChange() === currentChange) {
                dispatch({ type: DIAGRAM_IMAGE_GET_FAIL })
            }
        }
    }
    return null
}

export const saveDiagramImage = async (dispatch, currentChange, fullFilename, diagramImage) => {
    const { repo, path_parts, filename } = fullFilename
    const imageFullFilename = { repo, path_parts, filename: filename + '.svg' }
    if (getLastChange() === currentChange) {
        dispatch({ type: DIAGRAM_IMAGE_SAVE_START });
        try {
            if (getLastChange() === currentChange) {
                await writeFile(imageFullFilename, diagramImage)
                if (getLastChange() === currentChange) {
                    dispatch({ type: DIAGRAM_IMAGE_SAVE_END });
                }
            }
        } catch {
            if (getLastChange() === currentChange) {
                dispatch({ type: DIAGRAM_IMAGE_SAVE_FAIL });
            }
        }
    }
}

// /**
//  * Called when the diagramText has changed in file mode
//  * 
//  * @param {string} diagramText 
//  * @returns 
//  */
// export const diagramOnFileChanged = (diagramText) => async (dispatch, getState) => {
//     dispatch({ type: DIAGRAM_CHANGED, diagramText });
//     const currentChange = (new Date()).getTime();
//     const editor = getState().editor
//     const { fullFilename, diagramType, filetype, renderUrl } = editor
//     setLastChange(currentChange)
//     await delay(750);
//     const promiseDiagramTextSaved = saveFile(dispatch, currentChange, fullFilename, diagramText)
//     const promiseDiagramImage = getDiagramImage(dispatch, currentChange, renderUrl, diagramText, diagramType, filetype)
//     const promiseDiagramImageSaved = promiseDiagramImage.then((diagramImage) => saveDiagramImage(dispatch, currentChange, fullFilename, diagramImage))
// 
//     await Promise.all(promiseDiagramTextSaved, promiseDiagramImageSaved)
// }
// 
// export const setFile = (repo, path_parts, filename) => repo ? { type: SET_FILE, fullFilename: FullFilename(repo, path_parts, filename) } : null
