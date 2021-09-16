import React from 'react';
import PropTypes from 'prop-types';

import './ExampleCard.css'
import { Button, Card } from 'semantic-ui-react';

const ExampleCard = ({ diagType, description, diagUrl, onView, onImport }) => {
    if (!onView) {
        onView = (index) => {};
    }
    return <Card className='ExampleCard' >
        <div className='ExampleCardDiagramOutter'>
            <img alt='Diagram' src={diagUrl} className='ExampleCardDiagram'/>
        </div>
        <Card.Content>
        <Card.Header>{diagType}</Card.Header>
        <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button primary onClick={() => onView()}>View</Button>
            <Button onClick={() => onImport()}>Import</Button>
        </Card.Content>
    </Card>
}

ExampleCard.propTypes = {
    diagType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    diagUrl: PropTypes.string.isRequired,
    onView: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
};

ExampleCard.defaultProps = {
    index: 1,
    diagType: 'Diagram Type',
    description: 'Description',
    diagUrl: 'https://kroki.io/blockdiag/svg/eNpdzDEKQjEQhOHeU4zpPYFoYesRxGJ9bwghMSsbUYJ4d10UCZbDfPynolOek0Q8FsDeNCestoisNLmy-Qg7R3Blcm5hPcr0ITdaB6X15fv-_YdJixo2CNHI2lmK3sPRA__RwV5SzV80ZAegJjXSyfMFptc71w==',
};

export default ExampleCard;