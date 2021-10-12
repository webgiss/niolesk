import React from 'react';
import { Grid, Header, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './ExampleDetail.css'

const ExampleDetail = ({ diagramText, diagramType, description, diagUrl, items, itemIndex, onSelectItem, doc }) => {
    const iconName = 'pie graph'
    if (!onSelectItem) {
        onSelectItem = (index) => { };
    }
    // console.log('items', items)
    return <Grid columns={2} stackable stretched>
        <Grid.Row verticalAlign='top'>
            <Grid.Column width={4}>
                <List divided relaxed selection={true}>
                    {items.map((item, index) => <List.Item key={index} active={itemIndex === index ? true : false} onClick={() => onSelectItem(index)}>
                        <List.Icon name={iconName} size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header>{item[0]}</List.Header>
                            <List.Description>{item[1]}</List.Description>
                        </List.Content>
                    </List.Item>)}
                </List>
            </Grid.Column>
            <Grid.Column textAlign='center' width={12}>
                <Header as='h1'>{diagramType}</Header>
                <Header as='h2'>{description}</Header>
                {
                    doc ? <a target='_blank' rel='noreferrer' href={doc}>Documentation : {doc}</a> : null
                }
                <img alt='Diagram' src={diagUrl} />
                <Segment>
                    <pre className='ExampleDetailCode'>{diagramText}</pre>
                </Segment>
                {
                    doc ? <a target='_blank' rel='noreferrer' href={doc}>Documentation : {doc}</a> : null
                }
            </Grid.Column>
        </Grid.Row>
    </Grid>
}

ExampleDetail.propTypes = {
    diagramText: PropTypes.string.isRequired,
    diagramType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    diagUrl: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    itemIndex: PropTypes.number.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    doc: PropTypes.string,
};

ExampleDetail.defaultProps = {
    diagramType: 'Diagram Type',
    description: 'Description',
    diagUrl: 'https://kroki.io/blockdiag/svg/eNpdzDEKQjEQhOHeU4zpPYFoYesRxGJ9bwghMSsbUYJ4d10UCZbDfPynolOek0Q8FsDeNCestoisNLmy-Qg7R3Blcm5hPcr0ITdaB6X15fv-_YdJixo2CNHI2lmK3sPRA__RwV5SzV80ZAegJjXSyfMFptc71w==',
    diagramText: [
        'blockdiag {',
        '  Kroki -> generates -> "Block diagrams";',
        '  Kroki -> is -> "very easy!";',
        '',
        '  Kroki [color = "greenyellow"];',
        '  "Block diagrams" [color = "pink"];',
        '  "very easy!" [color = "orange"];',
        '}'
    ].join('\n'),
    items: [['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description'], ['Poide', 'Description']],
    itemIndex: 1,
};

export default ExampleDetail;