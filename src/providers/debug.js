let debug = false;
if (localStorage.debug) {
    debug = true;
}

/** 
 * @type {import('../init/reactRedux').Provider<State>} 
 * @template State
 */
const provider = {
    onNewState: (state) => {
        if (debug) {
            console.log('state', state);
        }
        
    }
};

export default provider;
