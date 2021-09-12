import React from 'react';

import GitInfo from 'react-git-info/macro';

import './SubTitle.css'

const gitInfo = GitInfo();
const version = `${process.env.REACT_APP_VERSION}-${gitInfo.commit.hash.substr(0, 8)}`;

const SubTitle = () => {
    return <div className='SubTitle' basic>
        <div>Edit <b>diagrams</b> from <b>textual</b> descriptions! : A <a href='https://kroki.io'>kroki</a> interface.</div>
        <div className='SubTitleSmall'>Github project page: <a href='https://github.com/webgiss/niolesk/'>https://github.com/webgiss/niolesk/</a> - Version {version}</div>
    </div>
}

export default SubTitle;
