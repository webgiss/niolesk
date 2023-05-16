import React from 'react';
import Window from '../Window'
import PropTypes from 'prop-types';

import './WindowFile.css'
import RepoAdd from '../RepoAdd/RepoAdd';
import FileSelect from '../FileSelect/FileSelect';
import { Button } from 'semantic-ui-react';

const WindowFile = ({ open, repoAdd, fileSelect, onValidate, onClose, onNextExample, onPrevExample }) => {
    return <Window
        className='WindowFile'
        open={open}
        title={repoAdd ? 'A new repository' : (fileSelect ? 'Select a file' : 'Gne?')}
        isContentCentered={true}
        onClose={onClose}
        actions={<Button primary onClick={() => onValidate()}>Validate</Button> }
        headerButtons={<>
            <Button primary icon='left arrow' onClick={() => onPrevExample()}/>
            <Button primary icon='right arrow' onClick={() => onNextExample()}/>
            </>}
    >{
        repoAdd ? <RepoAdd {...repoAdd}/> : (fileSelect ? <FileSelect {...fileSelect}/> : null)
    }</Window>
}

WindowFile.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
};

WindowFile.defaultProps = {
};

export default WindowFile;