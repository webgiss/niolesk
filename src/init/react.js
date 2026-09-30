import React from 'react';
import { Router } from 'react-router';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/**
 * @typedef {import('history').BrowserHistory} BrowserHistory
 */

/**
 * Init react layer of the application
 * 
 * @param {import('./redux').Store<State>} store
 * @param {BrowserHistory} history
 * @param {()=>JSX.Element} ReactNode 
 * @param {HTMLElement} domNode 
 * @template State
 */
export const initReact = (store, history, domNode, ReactNode) => {
    const root = ReactDOM.createRoot(domNode);
    root.render(
        <React.StrictMode>
            <Router history={history}>
                <Provider store={store}>
                    <ReactNode location={{}} />
                </Provider>
            </Router>
        </React.StrictMode>
    );
}

