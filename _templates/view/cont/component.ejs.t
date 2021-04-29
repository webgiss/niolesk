---
to: src/views/<%= name %>/<%= name %>.js
---
import React from 'react';

import './<%= name %>.css'

const <%= name %> = ({ }) => {
    return <div className='<%= name %>'>
    </div>
}

export default <%= name %>;