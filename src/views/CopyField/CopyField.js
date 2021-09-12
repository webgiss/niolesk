import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';

import './CopyField.css'
import { Button, Form, Input, TextArea } from 'semantic-ui-react';

const CopyField = ({ text, onCopy, onCopyHover, isCopyHover, isCopied, scope, isMultiline }) => {
    if (!onCopy) {
        onCopy = (scope, text) => { };
    }
    if (!onCopyHover) {
        onCopyHover = (scope, isHover) => { };
    }

    return <div className={classnames('CopyField', { 'copy-hover': isCopyHover, 'copied': isCopied })}>
        <TextArea
            fluid
            className={classnames('CopyFieldPre', 'code', { 'multiline': isMultiline })}
            multiline={isMultiline}
            type='text'
            value={text}
            focus={isCopyHover}
            rows={isMultiline ? 4 : 1}
            readOnly
        />
        <Button
            className='CopyButton'
            color={isCopied ? 'green' : 'primary'}
            labelPosition={'right'}
            icon={isCopied ? 'check' : 'copy'}
            content={isCopied ? 'Copied' : 'copy'}
            onMouseEnter={() => onCopyHover(scope, true)}
            onMouseLeave={() => onCopyHover(scope, false)}
            onClick={() => onCopy(scope, text)}
        />
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