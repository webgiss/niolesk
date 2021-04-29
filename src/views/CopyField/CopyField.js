import React from 'react';
import classnames from 'classnames'

import './CopyField.css'

const CopyField = ({ text, onCopy, onCopyHover, isCopyHover, isCopied, scope, isMultiline }) => {
    if (!onCopy) {
        onCopy = (scope, text) => {};
    }
    if (!onCopyHover) {
        onCopyHover = (scope, isHover) => {};
    }
    
    return <div className={classnames('CopyField',{'copy-hover':isCopyHover, 'copied':isCopied})}>
        <textarea className={classnames('CopyFieldPre', {'multiline': isMultiline})} type='text' value={text} readOnly />
        <button 
            className='CopyButton' 
            onMouseEnter={()=>onCopyHover(scope, true)}
            onMouseLeave={()=>onCopyHover(scope, false)}
            onClick={()=>onCopy(scope, text)}
        >Copy</button>
    </div>
}

export default CopyField;