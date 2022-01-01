import React from 'react';

import './Render.css'

const Render = ({ diagramUrl, diagramEditUrl, diagramError, onDiagramError, zenMode, height }) => {
    return <div className='Render' style={{ height: (zenMode && height) ? `${height}px` : 'auto' }}>
        <div className='RenderDiagramZone'>
        {
            diagramError ?
                <iframe className='RenderImageError' width='100%' height='600px' title='Error' src={diagramUrl}></iframe> :
                <img alt='Diagram' className='RenderImage' src={diagramUrl} onError={(e) => { onDiagramError(diagramUrl) }} />
        }
        </div>
        <p className='RenderEditMessage'><a href={diagramEditUrl}>Edit this diagram.</a></p>
    </div>
}

export default Render;