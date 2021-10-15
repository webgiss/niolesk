import React from 'react';
import PropTypes from 'prop-types';

import './ExampleCards.css'
import { Card } from 'semantic-ui-react';
import ExampleCard from '../ExampleCard/ExampleCard';

const ExampleCards = ({ cards }) => {
    return <Card.Group>
        {cards.map((card,index) => <ExampleCard {...card} key={index} />)}
    </Card.Group>
}

ExampleCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        diagType: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        diagUrl: PropTypes.string.isRequired,
    })).isRequired,
};

ExampleCards.defaultProps = {
};

export default ExampleCards;