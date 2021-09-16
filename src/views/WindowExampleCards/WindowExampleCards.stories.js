import React from 'react';
import WindowExampleCards from './index';
import { getReduxMockDecorator } from '../storybook/store';
import { getComponenent } from '../storybook/stories';
import exampleData from "../../examples/data";

export default {
    title: 'Components/WindowExampleCards',
    component: WindowExampleCards,
};

const defaultState = {
    editor: { 
        renderUrl : 'https://kroki.io/'
    },
    example: { 
        windowExampleCardsOpened: true,
        windowExampleDetailsOpened: false,
        exampleIndex: 2,
        examples: exampleData,
    }
};

const Template = (args) => {
    const { setState, decorator } = getReduxMockDecorator()
    let state = defaultState

    setState(state)
    return decorator(() => <WindowExampleCards {...args} />)
};

const defaultArgs = {
    open: true,
};

export const Default = getComponenent(Template, { ...defaultArgs });
