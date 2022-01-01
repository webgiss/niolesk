import React from 'react';
import Window from '../Window'
import ExampleDetail from '../ExampleDetail'
import PropTypes from 'prop-types';

import './WindowExampleDetail.css'
import { Button } from 'semantic-ui-react';

const WindowExampleDetail = ({ open, onClose, onImport, onPrevExample, onNextExample }) => {
    return <Window
        className='WindowExampleCards'
        open={open}
        title='Examples'
        isContentCentered={true}
        onClose={onClose}
        actions={<Button primary onClick={() => onImport()}>Import</Button> }
        headerButtons={<>
            <Button primary icon='left arrow' onClick={() => onPrevExample()}/>
            <Button primary icon='right arrow' onClick={() => onNextExample()}/>
        </>}
    >
        <ExampleDetail />
    </Window>
}

WindowExampleDetail.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
};

WindowExampleDetail.defaultProps = {
};

export default WindowExampleDetail;
