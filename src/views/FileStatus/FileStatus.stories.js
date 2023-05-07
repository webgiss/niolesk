import React from 'react';
import FileStatus from './FileStatus';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/FileStatus',
    component: FileStatus,
};

const Template = (args) => <FileStatus {...args} />;

const defaultArgs = {
    path: '/repo01/a/test/element03.plantuml',
    sourceStatus: 'SAVED',
    renderStatus: 'SAVING',
    diagramStatus: 'CHANGED',
};

export const Default = getComponenent(Template, { ...defaultArgs });
export const Normal = getComponenent(Template, { ...defaultArgs, sourceStatus: 'SAVED', renderStatus: 'SAVED', diagramStatus:'SAVED' });
export const AChangeIsOccuring = getComponenent(Template, { ...defaultArgs, sourceStatus: 'CHANGED', renderStatus: 'CHANGED', diagramStatus:'CHANGED' });
export const WhileSaving = getComponenent(Template, { ...defaultArgs, sourceStatus: 'SAVING', renderStatus: 'CHANGED', diagramStatus:'CHANGED' });
export const WhileSaving2 = getComponenent(Template, { ...defaultArgs, sourceStatus: 'SAVING', renderStatus: 'SAVING', diagramStatus:'CHANGED' });
export const WhileSaving3 = getComponenent(Template, { ...defaultArgs, sourceStatus: 'SAVED', renderStatus: 'SAVING', diagramStatus:'CHANGED' });
export const WhileSaving4 = getComponenent(Template, { ...defaultArgs, sourceStatus: 'SAVED', renderStatus: 'SAVED', diagramStatus:'SAVING' });
export const WhileSaving5 = getComponenent(Template, { ...defaultArgs, sourceStatus: 'SAVED', renderStatus: 'SAVED', diagramStatus:'SAVED' });
