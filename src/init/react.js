import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

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
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ReactNode location={{}}/>
        </ConnectedRouter>
      </Provider>,
    </React.StrictMode>,
    domNode
  );
}

