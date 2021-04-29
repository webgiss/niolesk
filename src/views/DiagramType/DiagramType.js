import React from 'react';

import './DiagramType.css'

const DiagramType = ({ diagramTypes, diagramType, onDiagramTypeChanged }) => {
    if (!diagramTypes) {
        diagramTypes = {}
    }
    let changeHandler = null;
    if (onDiagramTypeChanged) {
        changeHandler = (event) => onDiagramTypeChanged(event.target.value);
    }

    return <div className='DiagramType'>
        <div className='DiagramTypeSelectOutter'>
            <select id='select-diagram' className='DiagramTypeSelect' aria-label='Diagram' value={diagramType} onChange={changeHandler} >
                {
                    Object.keys(diagramTypes).map(
                        (diagramType) => <option value={diagramType} key={diagramType}>{diagramTypes[diagramType].name}</option>
                    )
                }
            </select>
        </div>
    </div>
}

export default DiagramType;