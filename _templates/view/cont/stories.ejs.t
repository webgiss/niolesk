---
to: src/views/<%= name %>/<%= name %>.stories.js
---
import React from 'react';
import <%= name %> from './<%= name %>';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/<%= name %>',
    component: <%= name %>,
};

const Template = (args) => <<%= name %> {...args} />;

const defaultArgs = {
};

export const Default = getComponenent(Template, { ...defaultArgs });
