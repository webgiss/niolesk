import React from 'react';
import CopyField from './CopyField';
import { Form } from 'semantic-ui-react';
import { getComponenent } from '../storybook/stories'

export default {
    title: 'Components/CopyField',
    component: CopyField,
};

const Template = (args) => <Form><CopyField {...args} /></Form>;

const defaultArgs = {
    text: 'https://kroki.example.com/grut/x4ettght46th==',
    isCopyHover: false,
    isCopied: false,
    scope: 'image',
    isMultiline: false,
}

export const Default = getComponenent(Template, { ...defaultArgs })
export const WithHover = getComponenent(Template, { ...defaultArgs, isCopyHover: true })
export const WithCopied = getComponenent(Template, { ...defaultArgs, isCopied: true })
export const WithHoverCopied = getComponenent(Template, { ...defaultArgs, isCopyHover: true, isCopied: true })
export const WithMultiline = getComponenent(Template, { ...defaultArgs, text: `line : "${defaultArgs.text}"\n\nOther line : '${defaultArgs.text}'`, isMultiline: true })
export const WithMultilineHover = getComponenent(Template, { ...defaultArgs, text: `line : "${defaultArgs.text}"\n\nOther line : '${defaultArgs.text}'`, isMultiline: true, isCopyHover: true })
export const WithMultilineHoverCopied = getComponenent(Template, { ...defaultArgs, text: `line : "${defaultArgs.text}"\n\nOther line : '${defaultArgs.text}'`, isMultiline: true, isCopyHover: true, isCopied: true })
export const WithLotOfLinesHoverCopied = getComponenent(Template, { ...defaultArgs, text: `line : "${defaultArgs.text}"\n\nOther line : '${defaultArgs.text}\n\ntext\n\n\nstill text\n.'`, isMultiline: true, isCopyHover: true, isCopied: true })
