import React from 'react';
import PropTypes from 'prop-types';

import './FileStatus.css'
import { Button, Divider, Icon, Popup, Table, TableCell } from 'semantic-ui-react';

const statusToColor = (status) => {
    switch (status) {
        case 'SAVED': return 'green'
        case 'SAVING': return 'orange'
        case 'CHANGED': return 'red'
        default: return 'grey'
    }
}

const FileStatus = ({ path, sourceStatus, renderStatus, diagramStatus, onCloseFile }) => {
    const sourceColor = statusToColor(sourceStatus)
    const renderColor = statusToColor(renderStatus)
    const diagramColor = statusToColor(diagramStatus)
    if (! path) {
        return null
    }
    return <div className='FileStatus'>
        <Button.Group fluid active='active'>
            <Button.Group fluid basic active='active'>
                <Button basic disabled color='grey'>
                    {path}
                </Button>
            </Button.Group>
            <Divider content='&nbsp;' />
            <Popup
                className='FileStatusPopup'
                trigger={<Button.Group>
                    <Button active color={sourceColor} icon>
                        <Icon name='text file' />
                    </Button>
                    <Button active color={renderColor} icon>
                        <Icon name='image' />
                    </Button>
                    <Button active color={diagramColor} icon>
                        <Icon name='disk' />
                    </Button>
                </Button.Group>
                }
                content={
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Icon</Table.HeaderCell>
                                <Table.HeaderCell>Legend</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell><Button color='green' icon active><Icon name='text file' /></Button></Table.Cell>
                                <TableCell>The diagram source is save on disk.</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Button color='orange' icon active><Icon name='text file' /></Button></Table.Cell>
                                <TableCell>The diagram source is currently saving on disk.</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Button color='red' icon active><Icon name='text file' /></Button></Table.Cell>
                                <TableCell>The diagram source is not yet saved on disk.</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Button color='green' icon active><Icon name='image' /></Button></Table.Cell>
                                <TableCell>The diagram correpond to the source.</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Button color='orange' icon active><Icon name='image' /></Button></Table.Cell>
                                <TableCell>The diagram rendering has started.</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Button color='red' icon active><Icon name='image' /></Button></Table.Cell>
                                <TableCell>The diagram rendering hasn't started yet.</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Button color='green' icon active><Icon name='disk' /></Button></Table.Cell>
                                <TableCell>The diagram on disk correpond to the source.</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Button color='orange' icon active><Icon name='disk' /></Button></Table.Cell>
                                <TableCell>Saving the diagram on disk has started.</TableCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><Button color='red' icon active><Icon name='disk' /></Button></Table.Cell>
                                <TableCell>Saving the diagram on disk hasn't started yet.</TableCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                }
                position='bottom right'
            />
            <Divider content='&nbsp;' />
            <Button.Group>
                <Button icon color='red' onClick={onCloseFile}><Icon name='x' className='FileStatusClose'/></Button>
            </Button.Group>
        </Button.Group>
    </div>
}

FileStatus.propTypes = {
    path: PropTypes.string.isRequired,
    sourceStatus: PropTypes.string.isRequired,
    renderStatus: PropTypes.string.isRequired,
    diagramStatus: PropTypes.string.isRequired,
};

FileStatus.defaultProps = {
};

export default FileStatus;