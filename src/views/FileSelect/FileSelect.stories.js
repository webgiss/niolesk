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

const createItem = (type, dir, name, active) => ({ type, name, active: active ? true : false, fullname: dir + name })
const createRepo = (dir, name, active) => createItem('database', dir, name, active)
const createFolder = (dir, name, active) => createItem('folder', dir,name, active)
const createFile = (dir, name, active) => createItem('text file', dir,name, active)

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
            createFolder('/repo01/a/test/', 'poide'),
            createFolder('/repo01/a/test/', 'praf'),
            createFolder('/repo01/a/test/', 'pido'),
            createFolder('/repo01/a/test/', 'mank', true),
            createFile('/repo01/a/test/', 'plaf.plantuml'),
            createFile('/repo01/a/test/', 'element01.plantuml'),
            createFile('/repo01/a/test/', 'element02.plantuml'),
            createFile('/repo01/a/test/', 'element03.plantuml'),
            createFile('/repo01/a/test/', 'element04.plantuml'),
            createFile('/repo01/a/test/', 'element05.plantuml'),
        ],
        [
            createFile('/repo01/a/test/', 'element06.plantuml'),
            createFile('/repo01/a/test/', 'element07.plantuml', true),
            createFile('/repo01/a/test/', 'element08.plantuml'),
            createFile('/repo01/a/test/', 'element09.plantuml'),
            createFile('/repo01/a/test/', 'element10.plantuml'),
            createFile('/repo01/a/test/', 'element11.plantuml'),
            createFile('/repo01/a/test/', 'element12.plantuml'),
            createFile('/repo01/a/test/', 'element13.plantuml'),
            createFile('/repo01/a/test/', 'element14.plantuml'),
            createFile('/repo01/a/test/', 'element15.plantuml'),
        ],
        [
            createFile('/repo01/a/test/', 'element16.plantuml'),
            createFile('/repo01/a/test/', 'element17.plantuml'),
        ],
    ],
};

const rootArgs = {
    path: [
        createRootPath('Root', '/', true),
    ],
    fileGroups: [
        [
            createRepo('/', 'repo01'),
            createRepo('/', 'repo02'),
            createRepo('/', 'repo03'),
            createRepo('/', 'repo04'),
            null, null, null, null, null, null,
        ],
    ],
}

const rootArgs2 = {
    path: [
        createRootPath('Root', '/', true),
        createRepoPath('repo02', '/repo02', false, true),
    ],
    fileGroups: [
        [
            createRepo('/', 'repo01'),
            createRepo('/', 'repo02', true),
            createRepo('/', 'repo03'),
            createRepo('/', 'repo04'),
            null, null, null, null, null, null,
        ],
    ],
}

export const Default = getComponenent(Template, { ...defaultArgs });
export const Root = getComponenent(Template, { ...defaultArgs, ...rootArgs });
export const Root2 = getComponenent(Template, { ...defaultArgs, ...rootArgs2 });
export const fewItems = getComponenent(Template, { ...defaultArgs, path: [...defaultArgs.path.slice(0, -1), createPartPath('praf', '/repo01/a/test/praf', false, true)], fileGroups: [[...defaultArgs.fileGroups[0].slice(0, 3).map((item) => ({ ...item, active: item.name === 'praf' })), null, null, null, null, null, null, null,]] });
export const moreItems = getComponenent(Template, { ...defaultArgs, fileGroups: [[...defaultArgs.fileGroups[0].slice(0, 6), null, null, null, null,]] });
export const someItems = getComponenent(Template, { ...defaultArgs, fileGroups: [defaultArgs.fileGroups[0], [...defaultArgs.fileGroups[1].slice(0, 3), null, null, null, null, null, null, null,]] });
