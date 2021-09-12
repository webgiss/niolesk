import React from 'react';
import { Input } from 'semantic-ui-react'

const RenderUrl = ({ renderUrl, renderUrlChanged }) => {
    let changeHandler = null;
    if (renderUrlChanged) {
        changeHandler = (event) => renderUrlChanged(event.target.value);
    }

    return <Input
        fluid
        value={renderUrl}
        onChange={changeHandler}
        icon='cogs'
        iconPosition='left'
        placeholder='Render URL engine...'
        aria-label='Render URL engine'
    />
}

export default RenderUrl;