/**
 * @typedef {import('../init/reactRedux').StateChange<State, T>} StateChange
 * @template State
 * @template T
 */

/** 
 * @type {StateChange<State,string>} 
 * @template State 
 */
const onNewDiagram = {
    name: 'onNewDiagram',
    getStateValue: (state) => {
        if (state.editor) {
            return state.editor.diagramUrl;
        }
        return null;
    },
    onNewValue: (currentValue, previousValue, currentState, subscribeParams) => {
        const {history} = subscribeParams;
        if (currentValue) {
            history.push(`#${currentValue}`);
        }
    },
}

/** 
 * @type {import('../init/reactRedux').Provider<State>} 
 * @template State
 */
const provider = {
    stateChangeManager: [onNewDiagram],
    onNewState: (state) => {
        window.state = state;
    }
};

export default provider;
