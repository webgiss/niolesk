import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

/**
 * @typedef {import('history').BrowserHistory} BrowserHistory
 */
/**
 * @typedef {import('redux').Reducer<State>} Reducer
 * @template State
 */
/**
 * @typedef {import('redux').Store<State>} Store
 * @template State
 */
/**
 * @typedef {import('redux').AnyAction} AnyAction
 */

/**
 * init a redux application
 * 
 * @param {string} baseUrl
 * @param {State} initialState
 * @param {(history: BrowserHistory) => Reducer<State>} reducerCreator
 * @return {{history: BrowserHistory, store: Store<State>}}
 * @template State
 */
const initRedux = (baseUrl, initialState, reducerCreator) => {
    // Create browser history to use in the Redux store
    const history = createBrowserHistory({ basename: baseUrl });
    const reducer = reducerCreator(history);

    const middleware = [
        thunk,
        routerMiddleware(history),
    ]

    const enhancers = []

    //const isDevelopment = process.env.NODE_ENV === 'development';

    //if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {

    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    return { history, store };
};
export default initRedux;