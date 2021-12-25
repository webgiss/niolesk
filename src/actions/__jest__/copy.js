// ----------------------------------------
// Mock for copy
let copy_mock = null;

export const mockCopy = (copy_content) => copy_mock = copy_content;
export const resetCopy = () => { copy_mock = null; }
export const hasCopy = () => copy_mock !== null;
export const getCopy = () => copy_mock;
// ----------------------------------------
