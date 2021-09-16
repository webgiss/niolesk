import React from 'react';
import WindowExampleDetail from './WindowExampleDetail';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/WindowExampleDetail',
    component: WindowExampleDetail,
};

const Template = (args) => <WindowExampleDetail {...args} />;

const defaultArgs = {
};

export const Default = getComponenent(Template, { ...defaultArgs });
