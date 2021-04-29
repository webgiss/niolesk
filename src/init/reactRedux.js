// import exportValues from '../utils/exportValues';
import { initReact } from './react'
import initRedux from './redux'

/**
 * @typedef {import('./redux').Reducer<State>} Reducer
 * @template State
 */
/**
 * @typedef {import('./redux').Store<State>} Store
 * @template State
 */
/**
 * @typedef {import('./redux').AnyAction} AnyAction
 */
/**
 * @typedef {import('./redux').BrowserHistory} BrowserHistory
 */
/**
 * @typedef {import('redux').Dispatch} Dispatch
 */
/**
 * @typedef {import('redux').Unsubscribe} StoreUnsubscribe
 */

/**
 * @typedef {Object} SubscribeParams
 * @property {Dispatch} dispatch
 * @property {Store<State>} store
 * @property {BrowserHistory} history
 * @template State
*/

/**
 * @typedef StateRegistration
 * @type {Object}
 * @property {string} name
 * @property {(state: State) => T} getStateValue
 * @property {(currentValue: T, previousValue: T, currentState: State, subscribeParams: SubscribeParams<State>) => void} onNewValue
 * @property {T} currentValue
 * @template State
 * @template T
 */

/**
 * @typedef StateChange
 * @type {Object}
 * @property {string} name
 * @property {(state: State) => T} getStateValue
 * @property {(currentValue: T, previousValue: T, currentState: State, subscribeParams: SubscribeParams<State>) => void} onNewValue
 * @template State
 * @template T
 */

/**
 * @typedef {StateRegistration<State,T>[]} StateRegistrations
 * @template State
 * @template T
 */

/**
 * @typedef {Object} Provider
 * @property {(state:State)=>State} onInitialState
 * @property {(subscribeParams:SubscribeParams<State>)=>void} onStartApplication
 * @property {()=>void} onInit
 * @property {(state:State)=>void} onNewState
 * @property {StateChange<State,any>[]} stateChangeManager
 * @template State
 */

/**
 * @typedef {Provider<State>[]} Providers
 * @template State
 */

/** 
 * @type {StateRegistrations<State, any>} 
 * @template State
 */
const stateRegistrations = [];

/**
 * Register a new State change
 * 
 * @param {string} name 
 * @param {(state: State) => T} getStateValue 
 * @param {(currentValue: T, previousValue: T, currentState: State, subscribeParams: SubscribeParams<State>) => void} onNewValue 
 * @template State
 * @template T
 */
export const registerStateChange = (name, getStateValue, onNewValue) => {
    let stateRegistration = {
        name,
        getStateValue,
        onNewValue,
        currentValue: undefined,
    };
    stateRegistrations.push(stateRegistration);
}

/**
 * Initialize the whole react/redux stack
 * 
 * @param {Providers<State>} providers
 * @param {string} baseUrl
 * @param {HTMLElement} domNode
 * @param {()=>JSX.Element} ReactNode
 * @param {(history: BrowserHistory) => Reducer<State>} reducerCreator
 * @return {()=>void}
 * @template State
 */
export const initReactRedux = (providers, baseUrl, domNode, ReactNode, reducerCreator) => {
    /** @type {State} */
    let initialState = undefined;

    for (let provider of providers) {
        if (provider.onInitialState !== undefined) {
            initialState = provider.onInitialState(initialState);
        }
    }

    const { history, store } = initRedux(baseUrl, initialState, reducerCreator);

    let dispatch = store.dispatch;

    /** @type {SubscribeParams<State>} */
    let subscribeParams = { dispatch, store, history };

    for (let provider of providers) {
        if (provider.onStartApplication !== undefined) {
            provider.onStartApplication(subscribeParams);
        }
    }

    for (let provider of providers) {
        if (provider.stateChangeManager !== undefined) {
            const stateChanges = provider.stateChangeManager;
            for (let stateChange of stateChanges) {
                registerStateChange(stateChange.name, stateChange.getStateValue, stateChange.onNewValue);
            }
        }
    }

    let currentState = undefined;

    const unsubscribe = store.subscribe(() => {
        currentState = store.getState();

        for (let provider of providers) {
            if (provider.onNewState !== undefined) {
                provider.onNewState(currentState);
            }
        }
        for (let stateRegistration of stateRegistrations) {
            let previousValue = stateRegistration.currentValue;
            stateRegistration.currentValue = stateRegistration.getStateValue(currentState);
            if (stateRegistration.currentValue !== previousValue) {
                stateRegistration.onNewValue(stateRegistration.currentValue, previousValue, currentState, subscribeParams);
            }
        }
    });

    initReact(store, history, domNode, ReactNode);

    for (let provider of providers) {
        if (provider.onInit !== undefined) {
            provider.onInit();
        }
    }

    return () => {
        unsubscribe();
    };
}



