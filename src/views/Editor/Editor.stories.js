import React from 'react';
import Editor from './Editor';
import { getComponenent } from '../storybook/stories'

export default {
    title: 'Components/Editor',
    component: Editor,
};

const Template = (args) => <Editor {...args} />;

const defaultArgs = {
    text: 'this is\na\ntext\n   with\n  indentation\n.',
}

export const Default = getComponenent(Template, { ...defaultArgs })
export const WithOtherText = getComponenent(Template, { ...defaultArgs, text: 'def f(x):\n  return x+5\n\n' })
