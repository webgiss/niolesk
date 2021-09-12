import React from 'react';
import RenderUrl from './RenderUrl';
import { getComponenent } from '../storybook/stories'

export default {
    title: 'Components/RenderUrl',
    component: RenderUrl,
};

const Template = (args) => <RenderUrl {...args} />;

const defaultArgs = {
    renderUrl: 'https://kroki.example.com/diagType/data=='
}

export const Default = getComponenent(Template, { ...defaultArgs })
