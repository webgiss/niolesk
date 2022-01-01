import React from 'react';
import Window from './Window';
import { getComponenent } from '../storybook/stories';
import ExampleCards from '../ExampleCards/ExampleCards'
import ExampleDetail from '../ExampleDetail/ExampleDetail'
import { Button } from 'semantic-ui-react';

export default {
    title: 'Components/Window',
    component: Window,
};

const Template = (args) => <Window {...args} />;

const defaultArgs = {
    title: "This is a title",
    children: <p>This is a content</p>,
    open: true,
    isContentCentered: true,
    actions: null,
};

export const Default = getComponenent(Template, { ...defaultArgs });
export const WithExampleCards = getComponenent(Template, { ...defaultArgs, children: <ExampleCards /> });
export const WithExampleCardsNotCentered = getComponenent(Template, { ...defaultArgs, children: <ExampleCards />, isContentCentered: false });
export const WithExampleCardsWithAction = getComponenent(Template, { ...defaultArgs, children: <ExampleCards />, actions: <Button color='green'>Test</Button> });
export const WithExampleCardsWithActions = getComponenent(Template, { ...defaultArgs, children: <ExampleCards />, actions: [<Button color='green'>Test</Button>, <Button color='violet'>Test2</Button>] });
export const WithExampleDetail = getComponenent(Template, { ...defaultArgs, children: <ExampleDetail /> });
export const WithExampleDetailWithImportButton = getComponenent(Template, { ...defaultArgs, children: <ExampleDetail />, actions: <Button color='primary'>Import</Button> });
