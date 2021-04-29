/** 
 * @type {import('../init/reactRedux').Provider<State>} 
 * @template State
 */
const provider = {
    onNewState: (state) => {
        console.log('state', state);
    }
};

export default provider;
