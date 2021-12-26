import { CHANGE_EXAMPLE_INDEX, OPEN_EXAMPLES, IMPORT_EXAMPLE, VIEW_EXAMPLE, CLOSE_EXAMPLE, PREV_EXAMPLE, NEXT_EXAMPLE, CHANGE_SEARCH } from "../constants/example";

export const openExamples = () => ({ type: OPEN_EXAMPLES });
export const changeExampleIndex = (exampleIndex) => ({ type: CHANGE_EXAMPLE_INDEX, exampleIndex })
export const importExample = (diagramText, diagramType) => ({ type: IMPORT_EXAMPLE, diagramText, diagramType })
export const viewExample = (exampleIndex) => ({ type: VIEW_EXAMPLE, exampleIndex })
export const closeExample = () => ({ type: CLOSE_EXAMPLE })
export const prevExample = () => ({ type: PREV_EXAMPLE })
export const nextExample = () => ({ type: NEXT_EXAMPLE })
export const updateSearch = (search) => ({ type: CHANGE_SEARCH, search })