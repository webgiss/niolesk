import React from 'react';
import ExampleCard from './ExampleCard';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/ExampleCard',
    component: ExampleCard,
};

const Template = (args) => <ExampleCard {...args} />;

const defaultArgs = {
    diagType: 'Diagram Type',
    description: 'Description',
    diagUrl: 'https://kroki.io/blockdiag/svg/eNpdzDEKQjEQhOHeU4zpPYFoYesRxGJ9bwghMSsbUYJ4d10UCZbDfPynolOek0Q8FsDeNCestoisNLmy-Qg7R3Blcm5hPcr0ITdaB6X15fv-_YdJixo2CNHI2lmK3sPRA__RwV5SzV80ZAegJjXSyfMFptc71w==',
};

export const Default = getComponenent(Template, { ...defaultArgs });
export const WithOtherDiagram = getComponenent(Template, { ...defaultArgs, diagUrl: 'https://kroki.io/actdiag/svg/eNpVTjkOwkAM7POK0fa8AEFDQUGNKBCFCdbKItmVjCFIKH9nj4Sj81yeodYuQh6vBhhUjLFYo43hwWr5lJ48N0nsKDDuN9ZizfjMHVZw-8S5QtX88aMcEpbgYfw0d1oWT_n349myIQ9Q6qtWjePcuNN4lalynvVNbyYmN8Di_4fxDQA-Q4A=' });
export const WithLongDiagram = getComponenent(Template, { ...defaultArgs, diagUrl: 'https://kroki.io/plantuml/svg/eNplj0FvwjAMhe_5FVZP40CgaNMuUGkcdttp3Kc0NSVq4lRxGNKm_fe1HULuuD37-bOfuXPUm2QChEjRnlIMCDmdUfHNSYY6xh42a9Fsegflk-yYlOLlcHK2I2SGtX4WZm9sZ1o8uOzxxbuWAlIGj8cshs6M1jDuY2owyU2P8jAezdnn10j53X0hlBsZFW021Pq7HaVSNw-KN-OogG8F8BAGqT8dXhZjxW4cyJEW6kcC-yHWFagHqW0MfaThhYmaVyE26P_x27qaDmXeruqqAMMw1h-ZlRI4aF3dX7hOwm5XzfIKDctlNcshPT1tFa8JPYAj-Zf5F065sqM=' });

