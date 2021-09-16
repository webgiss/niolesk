import React from 'react';
import Window from '../Window'
import ExampleCards from '../ExampleCards'
import PropTypes from 'prop-types';

import './WindowExampleCards.css'

const WindowExampleCards = ({ open, onClose }) => {
    return <Window className='WindowExampleCards' open={open} title='Examples' isContentCentered={true} onClose={onClose}>
        <ExampleCards />
    </Window>
}

WindowExampleCards.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

WindowExampleCards.defaultProps = {
};

export default WindowExampleCards;