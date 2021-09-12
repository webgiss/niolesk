import React from 'react';
import { Provider } from 'react-redux';

export const getReduxMockDecorator = () => {
    let state = {};
    const listeners = [];
    const subscribe = (listener) => {
        const unsubscribe = () => {
            const position = listeners.indexOf(listener);
            if (position > -1) {
                listeners.splice(position, 1);
            }
        };
        if (listeners.indexOf(listener) === -1) {
            listeners.push(listener);
        }
        return unsubscribe;
    }
    const store = {
        dispatch: () => { },
        getState: () => state,
        subscribe,
    }

    const setState = (newState) => {
        state = newState;
        listeners.forEach((listener) => listener());
    };

    return {
        setState,
        decorator: (getStory) => (
            <Provider store={store}>
                {getStory()}
            </Provider>
        )
    };
};
