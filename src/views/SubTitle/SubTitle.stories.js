import React from 'react';
import SubTitle from './SubTitle';
import { getComponenent } from '../storybook/stories'

export default {
    title: 'Components/SubTitle',
    component: SubTitle,
};

const Template = (args) => <SubTitle {...args} />;

const defaultArgs = {
}

export const Default = getComponenent(Template, { ...defaultArgs })
