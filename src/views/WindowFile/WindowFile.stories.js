import React from 'react';
import WindowFile from './WindowFile';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/WindowFile',
    component: WindowFile,
};

const Template = (args) => <WindowFile {...args} />;

const defaultArgs = {
    open: true,
};

const repoAdd = {
    name: 'poide'
}

const fileSelect = {
    path: [
        createRootPath('Root', '/'),
        createRepoPath('repo01', '/repo01'),
        createPartPath('a', '/repo01/a'),
        createPartPath('test', '/repo01/a/test', true),
        createPartPath('mank', '/repo01/a/test/mank', false, true),
    ],
    fileGroups: [
        [
            createFolder('poide'),
            createFolder('praf'),
            createFolder('pido'),
            createFolder('mank', true),
            createFile('plaf.plantuml'),
            createFile('element01.plantuml'),
            createFile('element02.plantuml'),
            createFile('element03.plantuml'),
            createFile('element04.plantuml'),
            createFile('element05.plantuml'),
        ],
        [
            createFile('element06.plantuml'),
            createFile('element07.plantuml'),
            createFile('element08.plantuml'),
            createFile('element09.plantuml'),
            createFile('element10.plantuml'),
            createFile('element11.plantuml'),
            createFile('element12.plantuml'),
            createFile('element13.plantuml'),
            createFile('element14.plantuml'),
            createFile('element15.plantuml'),
        ],
        [
            createFile('element16.plantuml'),
            createFile('element17.plantuml'),
        ],
    ],
}

export const Default = getComponenent(Template, { ...defaultArgs });
export const WithRepoAdd = getComponenent(Template, { ...defaultArgs, repoAdd });
// export const WithFileSelect = getComponenent(Template, { ...defaultArgs, fileSelect });
