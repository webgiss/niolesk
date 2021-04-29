import React from 'react';

import './Editor.css'

const Editor = ({ text, onTextChanged }) => {
    let changeHandler = null;
    if (onTextChanged) { 
        changeHandler = (event)=>onTextChanged(event.target.value); 
    }

    return <div className='Editor'>
        <textarea 
            className='EditorTextArea' 
            value={text} 
            onChange={changeHandler}
        />
    </div>
}

export default Editor;