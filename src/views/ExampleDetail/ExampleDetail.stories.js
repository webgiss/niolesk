import React from 'react';
import ExampleDetail from './ExampleDetail';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/ExampleDetail',
    component: ExampleDetail,
};

const Template = (args) => <ExampleDetail {...args} />;

const defaultArgs = {
    diagramType: 'Diagram Type',
    description: 'Description',
    diagUrl: 'https://kroki.io/blockdiag/svg/eNpdzDEKQjEQhOHeU4zpPYFoYesRxGJ9bwghMSsbUYJ4d10UCZbDfPynolOek0Q8FsDeNCestoisNLmy-Qg7R3Blcm5hPcr0ITdaB6X15fv-_YdJixo2CNHI2lmK3sPRA__RwV5SzV80ZAegJjXSyfMFptc71w==',
    diagramText: [
        'blockdiag {',
        '  Kroki -> generates -> "Block diagrams";',
        '  Kroki -> is -> "very easy!";',
        '',
        '  Kroki [color = "greenyellow"];',
        '  "Block diagrams" [color = "pink"];',
        '  "very easy!" [color = "orange"];',
        '}'
    ].join('\n'),
    items: [['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description']],
    itemIndex: 1,
};

export const Default = getComponenent(Template, { ...defaultArgs });
