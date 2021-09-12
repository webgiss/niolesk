import React from 'react';
import Columns from './Columns';
import { getComponenent } from '../storybook/stories'

export default {
    title: 'Components/Columns',
    component: Columns,
};

const Template = (args) => <Columns {...args} />;

const defaultArgs = {
    children: [<div><p>First panel</p></div>, <div><p>Other panel</p></div>]
}

export const Default = getComponenent(Template, { ...defaultArgs })
