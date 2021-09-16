import App from './App';
import { getComponenent } from '../storybook/stories'
import { getReduxMockDecorator } from '../storybook/store';
import diagramTypes from "../../kroki/krokiInfo";
import { decode } from "../../kroki/coder";
import exampleData from "../../examples/data";

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
        renderUrl: 'https://kroki.io/',
        diagramUrl: 'https://kroki.io/blockdiag/svg/eNpdzDEKQjEQhOHeU4zpPYFoYesRxGJ9bwghMSsbUYJ4d10UCZbDfPynolOek0Q8FsDeNCestoisNLmy-Qg7R3Blcm5hPcr0ITdaB6X15fv-_YdJixo2CNHI2lmK3sPRA__RwV5SzV80ZAegJjXSyfMFptc71w==',
        diagramEditUrl: 'https://niolesk.top/#https://kroki.io/blockdiag/svg/eNpdzDEKQjEQhOHeU4zpPYFoYesRxGJ9bwghMSsbUYJ4d10UCZbDfPynolOek0Q8FsDeNCestoisNLmy-Qg7R3Blcm5hPcr0ITdaB6X15fv-_YdJixo2CNHI2lmK3sPRA__RwV5SzV80ZAegJjXSyfMFptc71w==',
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
    },
    example: { 
        windowExampleCardsOpened: false,
        windowExampleDetailsOpened: true,
        exampleIndex: 2,
        examples: exampleData,
    }
};


const Template = (args) => {
    const { setState, decorator } = getReduxMockDecorator()

    setState(defaultState)
    return decorator(() => <App {...args} />)
};

const defaultArgs = {
}

export const Default = getComponenent(Template, { ...defaultArgs })
