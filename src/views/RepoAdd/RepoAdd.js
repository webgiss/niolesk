import React from 'react';
import PropTypes from 'prop-types';

import './RepoAdd.css'
import { Button, Container, Header, Icon, Input, Segment } from 'semantic-ui-react';

const RepoAdd = ({ name }) => {
    return <div className='RepoAdd'>
        <Container fluid>
            <Input fluid label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name' icon='folder' iconPosition='left'>{name}</Input>
        </Container>
        <Segment placeholder>
            <Header icon>
                <Icon name='folder' />
                Add a folder from your computer to be used as a repository by Niolesk.

            </Header>

            <Segment>
                <Container text textAlign='center'>
                    <p>
                        Niolesk will have the rigts to read, change, create or delete any file in this folder.
                    </p>
                </Container>
            </Segment>

            <Segment.Inline>
                <Button primary>Add a folder</Button>
                <Button>Cancel</Button>
            </Segment.Inline>

        </Segment>
    </div>
}

RepoAdd.propTypes = {
};

RepoAdd.defaultProps = {
};

export default RepoAdd;