import React from 'react';
import FileSelect from './FileSelect';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/FileSelect',
    component: FileSelect,
};

const Template = (args) => <FileSelect {...args} />;

const createSubPath = (type, name, fullname, current, active) => ({ type, name, fullname, current: current ? true : false, active: active ? true : false })
const createRootPath = (name, fullname, current, active) => createSubPath('dont', name, fullname, current, active)
const createRepoPath = (name, fullname, current, active) => createSubPath('database', name, fullname, current, active)
const createPartPath = (name, fullname, current, active) => createSubPath('folder', name, fullname, current, active)

const createItem = (type, name, active) => ({ type, name, active: active ? true : false })
const createRepo = (name, active) => createItem('database', name, active)
const createFolder = (name, active) => createItem('folder', name, active)
const createFile = (name, active) => createItem('text file', name, active)

const defaultArgs = {
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
};

const rootArgs = {
    path: [
        defaultArgs.path[0]
    ],
    fileGroups: [
        [
            createRepo('repo01'),
            createRepo('repo02', true),
            createRepo('repo03'),
            createRepo('repo04'),
            null, null, null, null, null, null,
        ],
    ],
}

export const Default = getComponenent(Template, { ...defaultArgs });
export const Root = getComponenent(Template, { ...defaultArgs, ...rootArgs });
export const fewItems = getComponenent(Template, { ...defaultArgs, path: [...defaultArgs.path.slice(0, -1), createPartPath('praf', '/repo01/a/test/praf', false, true)], fileGroups: [[...defaultArgs.fileGroups[0].slice(0, 3).map((item) => ({ ...item, active: item.name === 'praf' })), null, null, null, null, null, null, null,]] });
export const moreItems = getComponenent(Template, { ...defaultArgs, fileGroups: [[...defaultArgs.fileGroups[0].slice(0, 6), null, null, null, null,]] });
export const someItems = getComponenent(Template, { ...defaultArgs, fileGroups: [defaultArgs.fileGroups[0], [...defaultArgs.fileGroups[1].slice(0, 3), null, null, null, null, null, null, null,]] });
