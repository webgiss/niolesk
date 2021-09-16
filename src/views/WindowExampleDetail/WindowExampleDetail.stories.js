import React from 'react';
import WindowExampleDetail from './index';
import { getComponenent } from '../storybook/stories';
import { getReduxMockDecorator } from '../storybook/store';
import exampleData from "../../examples/data";

export default {
    title: 'Components/WindowExampleDetail',
    component: WindowExampleDetail,
};

const defaultState = {
    editor: { 
        renderUrl : 'https://kroki.io/'
    },
    example: { 
        windowExampleCardsOpened: false,
        windowExampleDetailsOpened: true,
        exampleIndex: 2,
        examples: exampleData,
    }
};

const Template = (args) => {
    const { setState, decorator } = getReduxMockDecorator()
    let state = defaultState

    setState(state)
    return decorator(() => <WindowExampleDetail {...args} />)
};

const defaultArgs = {
};

export const Default = getComponenent(Template, { ...defaultArgs });
