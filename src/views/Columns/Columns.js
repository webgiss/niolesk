import React from 'react';

import './Columns.css'

const Columns = ({ children }) => {
    return <div className='Columns'>
        {children}
    </div>
}

export default Columns;