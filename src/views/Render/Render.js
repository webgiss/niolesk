import React from 'react';

import './Render.css'

const Render = ({ diagramUrl, diagramEditUrl, diagramError, onDiagramError }) => {
    return <div className='Render'>
        {
            diagramError ?
                <iframe className='RenderImageError' width='100%'  height='600px' title='Error' src={diagramUrl}></iframe> :
                <img alt='Diagram' className='RenderImage' src={diagramUrl} onError={(e) => { onDiagramError(diagramUrl) }} />
        }
        <p><a href={diagramEditUrl}>Edit this diagram.</a></p>
    </div>
}

export default Render;