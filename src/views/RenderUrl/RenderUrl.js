import React from 'react';

import './RenderUrl.css'

const RenderUrl = ({ renderUrl, renderUrlChanged }) => {
    let changeHandler = null;
    if (renderUrlChanged) {
        changeHandler = (event) => renderUrlChanged(event.target.value);
    }

    return <div className='RenderUrl'>
        <input className='RenderUrlInput' value={renderUrl} onChange={changeHandler} aria-label='Render URL engine'></input>
    </div>
}

export default RenderUrl;