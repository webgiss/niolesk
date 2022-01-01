import React from 'react';
import PropTypes from 'prop-types';

import './ShrinkableButton.css'
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';

const ShrinkableButton = ({ floated, icon, text, textAlt, onClick }) => {
    return <Button className={classNames('ShrinkableButton')} floated={floated} onClick={onClick}>
        <Icon name={icon} />
        <span className='ShrinkableText'>{text}</span>
        <span className='ShrinkableTextAlt'>{textAlt}</span>
    </Button>
}

ShrinkableButton.propTypes = {
    floated: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textAlt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

ShrinkableButton.defaultProps = {
    floated: undefined,
    icon: '',
    text: '',
    textAlt: '',
};

export default ShrinkableButton;