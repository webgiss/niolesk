import React from 'react';
import PropTypes from 'prop-types';

import './FileSelect.css'
import { Breadcrumb, Button, Container, Grid, Icon, Input, List, Segment } from 'semantic-ui-react';
import classNames from 'classnames';

const FileSelect = ({ xpath, fileGroups, onChangeSelect, onValidate }) => {
    return <div className='FileSelect'>
        <Segment>
            <Breadcrumb icon='right angle'>
                {
                    xpath.map(
                        (path, index) => {
                            const isLast = index === xpath.length - 1

                            return <>
                                <Breadcrumb.Section 
                                    className={classNames({ link: isLast ? null : () => { }, active: isLast })}
                                >
                                    <Icon name={path.type} />
                                    {path.name}
                                </Breadcrumb.Section>
                                {isLast ? null : <Breadcrumb.Divider icon='right angle' />}
                            </>
                        }
                    )
                }
            </Breadcrumb>
        </Segment>
        <Segment.Group horizontal>
            {
                fileGroups.map((fileGroup) =>
                    <Segment>
                        <List>
                            {
                                fileGroup.map((file) =>
                                    <List.Item 
                                        key={file.name} 
                                        onClick={file.active ? ()=>onValidate(file.name) : ()=>onChangeSelect(file.name)} 
                                        className={classNames({ FileSelectActive: file.active })}
                                    >
                                        <List.Icon name={file.type} />
                                        <List.Content>{file.name}</List.Content>
                                    </List.Item>)
                            }
                        </List>
                    </Segment>
                )
            }
        </Segment.Group>
    </div>
}

FileSelect.propTypes = {
    xpath: PropTypes.arrayOf(
        PropTypes.objectOf({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            fullname: PropTypes.string.isRequired,
        })
    ).isRequired,
    fileGroups: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.objectOf({
                type: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                active: PropTypes.bool.isRequired,
            })
        )
    ).isRequired,
    onChangeSelect: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
};

FileSelect.defaultProps = {
    xpath: [],
    fileGroups: [[]],
};

export default FileSelect;