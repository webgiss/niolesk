import React from 'react';
import RepoAdd from './RepoAdd';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/RepoAdd',
    component: RepoAdd,
};

const Template = (args) => <RepoAdd {...args} />;

const defaultArgs = {
};

export const Default = getComponenent(Template, { ...defaultArgs });
