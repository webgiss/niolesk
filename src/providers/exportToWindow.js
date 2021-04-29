/** 
 * @type {import('../init/reactRedux').Provider<State>} 
 * @template State
 */
const provider = {
    onNewState: (state) => {
        window.state = state;
    }
};

export default provider;
