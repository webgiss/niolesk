import React from 'react';
import { Form } from 'semantic-ui-react';

import Title from '../Title';
import SubTitle from '../SubTitle';
import Columns from '../Columns';
import Editor from '../Editor';
import Render from '../Render';
import CopyZone from '../CopyZone';
import DiagramType from '../DiagramType';
import RenderUrl from '../RenderUrl';

import 'semantic-ui-css/semantic.min.css'
import './App.css'

const App = () => {
    return <div className='App'>
        <Title />

        <Form className='diagramParams'>
            <Form.Field>
                <SubTitle />
            </Form.Field>
            <Form.Field>
                <DiagramType />
            </Form.Field>
            <Form.Field>
                <RenderUrl />
            </Form.Field>
        </Form>
        <Columns>
            <Editor />
            <Render />
        </Columns>
        <CopyZone />
    </div>
}

export default App;