import React from 'react';
import CopyField from '../CopyField'
import './CopyZone.css'

const CopyZone = () => {
    return <div className='CopyZone'>
        <p className='CopyZoneTitle'>Image url</p>
        <CopyField scope='image'/>
        <p className='CopyZoneTitle'>Edit url</p>
        <CopyField scope='edit'/>
        <p className='CopyZoneTitle'>Markdown content</p>
        <CopyField scope='markdown'/>
    </div>
}

CopyZone.propTypes = {
}

export default CopyZone;