import React from 'react';
import ShrinkableButton from './ShrinkableButton';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/ShrinkableButton',
    component: ShrinkableButton,
};

const Template = (args) => <ShrinkableButton {...args} />;

const defaultArgs = {
    floated: 'right',
    icon: 'fire extinguisher',
    text: 'Fire extinguisher',
    textAlt: 'Fire',
};

export const Default = getComponenent(Template, { ...defaultArgs });
