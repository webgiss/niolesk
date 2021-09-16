import { CHANGE_EXAMPLE_INDEX, OPEN_EXAMPLES, IMPORT_EXAMPLE, VIEW_EXAMPLE, CLOSE_EXAMPLE } from "../constants/example";

export const openExamples = () => ({ type: OPEN_EXAMPLES });
export const changeExampleIndex = (exampleIndex) => ({ type: CHANGE_EXAMPLE_INDEX, exampleIndex })
export const importExample = (diagramText, diagramType) => ({ type: IMPORT_EXAMPLE, diagramText, diagramType })
export const viewExample = (exampleIndex) => ({ type: VIEW_EXAMPLE, exampleIndex })
export const closeExample = () => ({ type: CLOSE_EXAMPLE })