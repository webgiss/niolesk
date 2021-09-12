import React from 'react';
import DiagramType from './DiagramType';
import { getComponenent } from '../storybook/stories'

export default {
    title: 'Components/DiagramType',
    component: DiagramType,
};

const Template = (args) => <DiagramType {...args} />;

const defaultDiagramTypes = {
    'type 1': { name: 'Type 1', unusedData: 'not used' },
    'type 2': { name: 'Type 2' },
    'type 3': { name: 'Type 3', otherTypeOfUnusedData: 'also not used' },
};

const lotOfDataDiagramTypes = [...Array(100).keys()]
    .map((e, i) => [`type ${i}`, { name: `Name ${i}` }])
    .reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue[0]]: currentValue[1] }), {});

const defaultArgs = {
    diagramTypes: defaultDiagramTypes,
    diagramType: 'type 2',
};

export const Default = getComponenent(Template, { ...defaultArgs })
export const UnknownType = getComponenent(Template, { ...defaultArgs, diagramType: 'Unknown' })
export const LotOfData = getComponenent(Template, { ...defaultArgs, diagramTypes: lotOfDataDiagramTypes })
