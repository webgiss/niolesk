import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux';
import editor from './editor';
// import debug from './debug';

/**
 * @param {import("../init/redux").BrowserHistory} history
 * @return {import("../init/redux").Reducer<State>}
 * @template State
 */
const createReducer = (history) => combineReducers({
    router: connectRouter(history),
    editor,
//    debug,
});
export default createReducer;