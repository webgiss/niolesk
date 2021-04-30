import React from 'react';

import './SubTitle.css'

const SubTitle = () => {
    return <div className='SubTitle'>
        <div>Edit <b>diagrams</b> from <b>textual</b> descriptions! : A <a href='https://kroki.io'>kroki</a> interface.</div>
        <div className='SubTitleSmall'>Github project page: <a href='https://github.com/webgiss/niolesk/'>https://github.com/webgiss/niolesk/</a> - Version { process.env.REACT_APP_VERSION }</div>
    </div>
}

export default SubTitle;
