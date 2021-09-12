import React from 'react';
import PropTypes from 'prop-types';

import './ExampleCards.css'
import { Card } from 'semantic-ui-react';
import ExampleCard from '../ExampleCard/ExampleCard';

const ExampleCards = ({ }) => {
    return <Card.Group>
        <ExampleCard/>
        <ExampleCard/>
        <ExampleCard/>
        <ExampleCard/>
        <ExampleCard/>
    </Card.Group>
}

ExampleCards.propTypes = {
};

ExampleCards.defaultProps = {
};

export default ExampleCards;