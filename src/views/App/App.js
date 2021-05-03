import React from 'react';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Columns from '../Columns';
import Editor from '../Editor';
import Render from '../Render';
import CopyZone from '../CopyZone';
import DiagramType from '../DiagramType';
import RenderUrl from '../RenderUrl';

import './App.css'

const App = () => {
    return <div className='App'>
        <Title />
        <SubTitle />
        <DiagramType />
        <RenderUrl />
        <Columns>
            <Editor />
            <Render />
        </Columns>
        <CopyZone />
    </div>
}

export default App;
