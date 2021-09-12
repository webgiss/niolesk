import React from 'react';
import Title from './Title';
import { getComponenent } from '../storybook/stories'

export default {
    title: 'Components/Title',
    component: Title,
};

const Template = (args) => <Title {...args} />;

const defaultArgs = {
}

export const Default = getComponenent(Template, { ...defaultArgs })
