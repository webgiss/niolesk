import React from 'react';
import Window from '../Window'
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'semantic-ui-react';

import './WindowImportUrl.css'

const WindowImportUrl = ({ open, onClose, onImportUrl, onUrlChange, url }) => {
    const onChange = (event, data) => onUrlChange(data.value);

    return <Window
        className='WindowImportUrl'
        open={open}
        title='Import a new diagram using its URL'
        isContentCentered={true}
        onClose={onClose}
        actions={<Button primary onClick={() => onImportUrl(url)}>Import URL</Button>}
    >
        <Form onSubmit={()=>onImportUrl(url)}>
            <Input
                placeholder='https://kroki.io/diagramType/data=='
                onChange={onChange}
                value={url}
                ref={(element) => open && element && element.focus()}
                fluid={true}
            />
        </Form>
    </Window>
}

WindowImportUrl.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onImportUrl: PropTypes.func.isRequired,
    onUrlChange: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
};

WindowImportUrl.defaultProps = {
};

export default WindowImportUrl;