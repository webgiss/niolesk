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
    height: 700,
    language: undefined,
}

const jsonText = '{"number":7,"text":"text","array":[7,8,9],"subobj":{"item":12,"data":"poide"},"nothing":null}'

export const Default = getComponenent(Template, { ...defaultArgs })
export const WithOtherText = getComponenent(Template, { ...defaultArgs, text: 'def f(x):\n  return x+5\n\n' })
export const WithJson = getComponenent(Template, { ...defaultArgs, text: jsonText, language: 'json' })
