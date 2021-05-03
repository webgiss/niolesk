import React from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';
import './Editor.css'

const Editor = ({ text, onTextChanged }) => {
    return <div className='Editor'>
        <MonacoEditor 
            language="plaintext"
            onChange={onTextChanged}
            value={text}
            
            options={{
                theme: 'vs',
                automaticLayout: false,
            }}
            height='700px'
        />
    </div>
}

export default Editor;