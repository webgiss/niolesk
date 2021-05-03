import GitInfo from 'react-git-info/macro';
import React from 'react';

import './SubTitle.css'

const gitInfo = GitInfo();
const version = `${process.env.REACT_APP_VERSION}-${gitInfo.commit.hash.substr(0,8)}`;


const SubTitle = () => {
    return <div className='SubTitle'>
        <p>Edit <b>diagrams</b> from <b>textual</b> descriptions!<wbr/> A <a href='https://kroki.io'>Kroki</a> interface.</p>
        <p className='SubTitleSmall'>Github project page: <a href='https://github.com/webgiss/niolesk/'>https://github.com/webgiss/niolesk/</a><br/><span className='Version'>Version <code>{ version }</code></span></p>
    </div>
}

export default SubTitle;
