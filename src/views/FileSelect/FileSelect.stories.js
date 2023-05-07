import React from 'react';
import FileSelect from './FileSelect';
import { getComponenent } from '../storybook/stories';

export default {
    title: 'Components/FileSelect',
    component: FileSelect,
};

const Template = (args) => <FileSelect {...args} />;

const defaultArgs = {
    xpath: [
        {
            type: 'folder',
            name: 'poide',
            fullname: 'poide',
        },
        {
            type: 'folder',
            name: 'a',
            fullname: 'poide/a',
        },
        {
            type: 'folder',
            name: 'test',
            fullname: 'poide/a/test',
        },
    ],
    fileGroups: [
        [
            {
                type: 'folder',
                name: 'Poide',
                active: false,
            },
            {
                type: 'folder',
                name: 'praf',
                active: false,
            },
            {
                type: 'folder',
                name: 'pido',
                active: false,
            },
            {
                type: 'folder',
                name: 'mank',
                active: true,
            },
            {
                type: 'file',
                name: 'plaf.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element01.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element02.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element03.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element04.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element05.plantuml',
                active: false,
            },
        ],
        [
            {
                type: 'file',
                name: 'element06.vegalite',
                active: false,
            },
            {
                type: 'file',
                name: 'element07.vegalite',
                active: false,
            },
            {
                type: 'file',
                name: 'element08.vegalite',
                active: false,
            },
            {
                type: 'file',
                name: 'element09.vegalite',
                active: false,
            },
            {
                type: 'file',
                name: 'element10.vegalite',
                active: false,
            },
            {
                type: 'file',
                name: 'element11.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element12.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element13.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element14.plantuml',
                active: false,
            },
            {
                type: 'file',
                name: 'element15.plantuml',
                active: false,
            },
        ],
        [
            {
                type: 'file',
                name: 'element16.vegalite',
                active: false,
            },
            {
                type: 'file',
                name: 'element17.vegalite',
                active: false,
            },
        ],
    ],
};

export const Default = getComponenent(Template, { ...defaultArgs });
