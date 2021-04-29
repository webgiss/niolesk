/**
 * @typedef {import('../../init/redux').Reducer<State>} Reducer
 * @template State
 */

/**
 * @typedef {import('../../init/redux').AnyAction} AnyAction
 * @template State
 */

/**
 * @typedef {{[type:string] : Reducer<State>}} ReducerByType
 * @template State
 */

/**
 * Create a Reducer using a ReducerByType
 * 
 * @param {ReducerByType<State>} reducersByType
 * @param {State} initialState
 * @returns Reducer<State>
 * @template State
 */
export const createReducer = (reducersByType, initialState = {}) => {
    /**
     * A Reducer based on a ReducerByType
     * 
     * @param {State} state 
     * @param {AnyAction<State>} action 
     * @returns State
     */
    const reducer = (state, action) => {
        if (!state) {
            state = initialState;
        }

        if (action) {
            const { type } = action;
            if (type) {
                const specificReducer = reducersByType[type];
                if (specificReducer) {
                    state = specificReducer(state, action);
                }
            }
        }

        return state;
    };
    return reducer;
}
