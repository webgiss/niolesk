import React from 'react';

import './Render.css'

const Render = ({ diagramUrl, diagramEditUrl }) => {
    return <div className='Render'>
        <img alt='Diagram' className='RenderImage' src={diagramUrl} />
        <p><a href={diagramEditUrl}>Edit this diagram.</a></p>
    </div>
}

export default Render;