import React from 'react';
import App from './App';
import { getComponenent } from '../storybook/stories'
import { getReduxMockDecorator } from '../storybook/store';
import diagramTypes from "../../kroki/krokiInfo";
import { encode, decode } from "../../kroki/coder";

export default {
    title: 'Pages/App',
    component: App,
};

const defaultDiagramType = 'plantuml';

const defaultState = {
    editor: {
        baseUrl: window.location.origin + window.location.pathname,
        hash: null,
        diagramType: defaultDiagramType,
        diagramText: decode(diagramTypes[defaultDiagramType].example),
        filetype: 'svg',
        diagramTypes,
        renderUrl: 'https://kroki.example.com/',
        diagramUrl: 'https://kroki.example.com/example kroki url',
        diagramEditUrl: 'https://kroki.example.com/example edit url',
        scopes: {
            'image': {
                isHover: false,
                isCopied: false,
            },
            'edit': {
                isHover: false,
                isCopied: false,
            },
            'markdown': {
                isHover: false,
                isCopied: false,
            },
        }
    }
};


const Template = (args) => {
    const { setState, decorator } = getReduxMockDecorator()

    setState(defaultState)
    return decorator(App)
};

const defaultArgs = {
}

export const Default = getComponenent(Template, { ...defaultArgs })
