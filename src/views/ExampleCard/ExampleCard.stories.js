import React from 'react';
import ExampleCard from './ExampleCard';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/ExampleCard',
    component: ExampleCard,
};

const Template = (args) => <ExampleCard {...args} />;

const defaultArgs = {
};

export const Default = getComponenent(Template, { ...defaultArgs });
