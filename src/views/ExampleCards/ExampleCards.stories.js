import React from 'react';
import ExampleCards from './ExampleCards';
import { getComponenent } from '../storybook/stories';
import exampleData from '../../examples/data';
import { createKrokiUrl } from '../../kroki/utils';

export default {
    title: 'Components/ExampleCards',
    component: ExampleCards,
};

const Template = (args) => <ExampleCards {...args} />;

const defaultArgs = {
    cards:exampleData.map((example)=>({ 
        diagType: example.title,
        description: example.description,
        diagUrl: createKrokiUrl('https://kroki.io/', example.diagramType, 'svg', example.example),
        onView: () => {},
        onImport: () => {},
    })),
};

export const Default = getComponenent(Template, { ...defaultArgs });
