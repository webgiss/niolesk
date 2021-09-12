import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import './DiagramType.css'

const DiagramType = ({ diagramTypes, diagramType, onDiagramTypeChanged }) => {
    if (!diagramTypes) {
        diagramTypes = {}
    }
    let changeHandler = null;
    if (onDiagramTypeChanged) {
        changeHandler = (event, data) => onDiagramTypeChanged(data.value);
    }

    return <Dropdown
        id='select-diagram'
        className='DiagramType DiagramTypeSelect'
        placeholder='Select a diagram type...'
        aria-label='Diagram'
        options={Object.keys(diagramTypes).map((diagramType) => ({ key: diagramType, value: diagramType, text: diagramTypes[diagramType].name }))}
        value={diagramType}
        onChange={changeHandler}
        selection={true}
        search={true}
    />
}

DiagramType.propTypes = {
    diagramTypes: PropTypes.objectOf(PropTypes.shape({ name: PropTypes.string })),
    diagramType: PropTypes.string.isRequired,
    onDiagramTypeChanged: PropTypes.func,
};

export default DiagramType;