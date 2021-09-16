import React from 'react';
import WindowExampleCards from './WindowExampleCards';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/WindowExampleCards',
    component: WindowExampleCards,
};

const Template = (args) => <WindowExampleCards {...args} />;

const defaultArgs = {
};

export const Default = getComponenent(Template, { ...defaultArgs });
