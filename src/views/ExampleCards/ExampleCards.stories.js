import React from 'react';
import ExampleCards from './ExampleCards';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/ExampleCards',
    component: ExampleCards,
};

const Template = (args) => <ExampleCards {...args} />;

const defaultArgs = {
};

export const Default = getComponenent(Template, { ...defaultArgs });
