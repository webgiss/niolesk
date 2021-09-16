import React from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Grid, Icon, Segment } from 'semantic-ui-react';

import Title from '../Title';
import SubTitle from '../SubTitle';
import Columns from '../Columns';
import Editor from '../Editor';
import Render from '../Render';
import CopyZone from '../CopyZone';
import DiagramType from '../DiagramType';
import RenderUrl from '../RenderUrl';
import WindowExampleCards from '../WindowExampleCards';
import WindowExampleDetail from '../WindowExampleDetail';

import 'semantic-ui-css/semantic.min.css'
import './App.css'

const App = ({ onExamples }) => {
    if (!onExamples) {
        onExamples = () => { };
    }
    return <div className='App'>
        <Title />

        <Segment basic>
        <Form className='diagramParams'>
            <Form.Field>
                <SubTitle />
            </Form.Field>
            <Form.Field>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <DiagramType />
                        </Grid.Column>
                        <Grid.Column >
                            <Button floated='right' onClick={() => onExamples()}><Icon name='list alternate outline' />Examples</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Form.Field>
            <Form.Field>
                <RenderUrl />
            </Form.Field>
        </Form>
        </Segment>
        <Columns>
            <Editor />
            <Render />
        </Columns>
        <CopyZone />
        <WindowExampleCards />
        <WindowExampleDetail />
    </div>
}

App.propTypes = {
    onExamples: PropTypes.func.isRequired,
};

export default App;