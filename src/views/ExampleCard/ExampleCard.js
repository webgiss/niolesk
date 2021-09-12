import React from 'react';
import PropTypes from 'prop-types';

import './ExampleCard.css'
import { Button, Card, Placeholder } from 'semantic-ui-react';

const ExampleCard = ({ }) => {
    return <Card className='ExampleCard' >
        <Placeholder>
            <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
        <Card.Header>Poide</Card.Header>
        <Card.Description>Description</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button primary>View</Button>
            <Button>Import</Button>
        </Card.Content>
    </Card>
}

ExampleCard.propTypes = {
};

ExampleCard.defaultProps = {
};

export default ExampleCard;