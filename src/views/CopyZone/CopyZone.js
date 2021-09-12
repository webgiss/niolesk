import React from 'react';
import { Divider, Form, Segment } from 'semantic-ui-react'
import CopyField from '../CopyField'
import './CopyZone.css'

const CopyZone = () => {
    return <Segment className='CopyZone' basic>
    <Divider/>
        <Form>
            <Form.Field>
                <label>Image url</label>
                <CopyField scope='image' />
            </Form.Field>
            <Form.Field>
                <label>Edit url</label>
                <CopyField scope='edit' />
            </Form.Field>
            <Form.Field>
                <label>Markdown content</label>
                <CopyField scope='markdown' />
            </Form.Field>
        </Form>
    </Segment>
}

CopyZone.propTypes = {
}

export default CopyZone;