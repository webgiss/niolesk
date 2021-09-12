---
to: src/views/<%= name %>/<%= name %>.js
---
import React from 'react';
import PropTypes from 'prop-types';

import './<%= name %>.css'

const <%= name %> = ({ }) => {
    return <div className='<%= name %>'>
    </div>
}

<%= name %>.propTypes = {
};

<%= name %>.defaultProps = {
};

export default <%= name %>;