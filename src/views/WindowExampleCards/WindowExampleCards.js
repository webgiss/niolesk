import React from 'react';
import Window from '../Window'
import ExampleCards from '../ExampleCards'
import PropTypes from 'prop-types';


import './WindowExampleCards.css'
import { Input } from 'semantic-ui-react';

const WindowExampleCards = ({ open, onClose, onSearchChange, search }) => {
    const onChange = (event, data) => onSearchChange(data.value);

    return <Window 
                className='WindowExampleCards' 
                open={open} 
                title='Examples' 
                isContentCentered={true} 
                onClose={onClose}
                headerComponent={
                    <span className='WindowExampleCardsSearch'>
                        <Input 
                            className='WindowExampleCardsSearch' 
                            icon='search' 
                            placeholder='Search...' 
                            size='mini' 
                            ref={(element) => open && element && element.focus()}
                            onChange={onChange}
                            value={search}
                            />

                    </span>
                }
            >
        <ExampleCards />
    </Window>
}

WindowExampleCards.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

WindowExampleCards.defaultProps = {
};

export default WindowExampleCards;