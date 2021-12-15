import React from 'react';
import { Button, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import './Window.css'
import classNames from 'classnames';

const Window = ({ title, children, open, isContentCentered, actions, headerButtons, onClose }) => {
    return <Modal
        centered={true}
        className='Window'
        open={open}
        size='fullscreen'
        onClose={onClose}
    >
        <Modal.Header>
            {title}
            {headerButtons ? <span className='WindowHeaderButtons'>{headerButtons}</span> : null}
        </Modal.Header>
        <Modal.Content scrolling={true} className={classNames({WindowContent: true, 'window-centered-content': isContentCentered})} >{children}</Modal.Content>
        <Modal.Actions>
            {actions}
            <Button onClick={()=>onClose()}>Close</Button>
        </Modal.Actions>
    </Modal>
}

Window.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    open: PropTypes.bool.isRequired,
    isContentCentered: PropTypes.bool.isRequired,
    actions: PropTypes.element,
    onClose: PropTypes.func.isRequired,
};

Window.defaultProps = {
};

export default Window;