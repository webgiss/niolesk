import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';

import './CopyField.css'

const CopyField = ({ text, onCopy, onCopyHover, isCopyHover, isCopied, scope, isMultiline }) => {
    if (!onCopy) {
        onCopy = (scope, text) => { };
    }
    if (!onCopyHover) {
        onCopyHover = (scope, isHover) => { };
    }

    return <div className={classnames('CopyField', { 'copy-hover': isCopyHover, 'copied': isCopied })}>
        <textarea className={classnames('CopyFieldPre', { 'multiline': isMultiline })} type='text' value={text} readOnly />
        <button
            className='CopyButton'
            onMouseEnter={() => onCopyHover(scope, true)}
            onMouseLeave={() => onCopyHover(scope, false)}
            onClick={() => onCopy(scope, text)}
        >Copy</button>
    </div>
}

CopyField.propTypes = {
    text: PropTypes.string.isRequired,
    onCopy: PropTypes.func.isRequired,
    onCopyHover: PropTypes.func.isRequired,
    isCopyHover: PropTypes.bool.isRequired,
    isCopied: PropTypes.bool.isRequired,
    scope: PropTypes.string.isRequired,
    isMultiline: PropTypes.bool.isRequired,
};

CopyField.defaultProps = {
    text: '',
    isCopyHover: false,
    isCopied: false,
    scope: 'image',
    isMultiline: false,
};

export default CopyField;