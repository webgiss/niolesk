import delay from '../utils/delay';

// ----------------------------------------
// Mock for dispatch
const dispatchActions = [];

export const resetDispatchActions = () => { dispatchActions.splice(0); }
const mockDispatch = (action) => {
    dispatchActions.push(action);
}
export const getDispatchActions = () => dispatchActions;
// ----------------------------------------

// ----------------------------------------
// Mock for get_state
let mockState = {};
export const resetMockState = () => mockState = {};
export const setMockState = (state) => mockState = state;
const mockGetState = () => mockState;
// ----------------------------------------

// ----------------------------------------
// Mock for execution of an action that use thunk
export const executeThunkAction = async (action) => {
    const result = action();
    expect(typeof result).toBe('function')
    const resultPromise = result(mockDispatch, mockGetState);
    await delay(0);
    return resultPromise;
}
// ----------------------------------------
