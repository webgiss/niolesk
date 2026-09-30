import { combineReducers } from 'redux';
import editor from './editor';
import example from './example';
import debug from './debug';
import niolesk from './niolesk';

/**
 * @return {import("../init/redux").Reducer<State>}
 * @template State
 */
const createReducer = () => combineReducers({
    editor,
    example,
    niolesk,
    debug,
});
export default createReducer;
