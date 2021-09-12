import React from 'react';
import { Grid } from 'semantic-ui-react';

import './Columns.css'

const Columns = ({ children }) => {
    return <Grid columns={2} stackable>
    <Grid.Row verticalAlign='top'>
        <Grid.Column>
            {children[0]}
        </Grid.Column>
        <Grid.Column  textAlign='center'>
            {children[1]}
        </Grid.Column>
    </Grid.Row>
    </Grid>
    
}

export default Columns;