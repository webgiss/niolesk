import React from 'react';
import WindowImportUrl from './WindowImportUrl';
import { getComponenent } from '../storybook/stories';
import { getReduxMockDecorator } from '../storybook/store';

export default {
    title: 'Components/WindowImportUrl',
    component: WindowImportUrl,
};

const defaultState = {
    editor: {
        renderUrl: 'https://kroki.io/',
        windowImportUrlOpened: true,
        windowImportUrl: 'https://kroki.example.com/diagramX/data==',
    },
    example: {
        windowExampleCardsOpened: false,
        windowExampleDetailsOpened: false,
    }
};

const Template = (args) => {
    const { setState, decorator } = getReduxMockDecorator()
    let state = defaultState

    setState(state)
    return decorator(() => <WindowImportUrl {...args} />)
};

const defaultArgs = {
    open: true,
    url: '',
};

export const Default = getComponenent(Template, { ...defaultArgs });
export const WithSomeData = getComponenent(Template, { ...defaultArgs, url: 'htt' })
export const WithLotsOfData = getComponenent(Template, { ...defaultArgs, url: 'https://kroki.io/graphviz/svg/eNp9kM0KgzAQhO8-xZIHaKlX6Ulp6S-FPoDEuGhqbML6cyl594JVGyv1OMPMt8ukMiNucojg5QFUTfKRQjVVjRSbzgZQPEEFW2An0oVkQWfO0mLTx53CHalF6hsAO6kwQV4PesbIRPylOJxIiwJp_YMDOPKWD8ouQP0F6AWp5DJ1qOyqU1w9Kte6NcZgjZPrLMxJl8imH9g_8_jzecLzYSzvteLPLBgR1rNvJ7Rwmw==' })
