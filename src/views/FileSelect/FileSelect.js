import React from 'react';
import PropTypes from 'prop-types';

import './FileSelect.css'
import { Breadcrumb, Button, Container, Grid, Icon, Input, List, Segment } from 'semantic-ui-react';
import classNames from 'classnames';

const FileSelect = ({ path, fileGroups, onChangePath, onChangeSelect, onValidate }) => {
    return <div className='FileSelect'>
        <Segment>
            <Breadcrumb>
                {
                    path.map(
                        (pathInfo, index) => {
                            const isLast = index === path.length - 1
                            return <>
                                <Breadcrumb.Section
                                    className={classNames({ link: pathInfo.current ? null : true, active: pathInfo.current })}
                                >{
                                    pathInfo.current ?
                                    <>
                                        <Icon name={pathInfo.type} />
                                        {pathInfo.name}
                                    </>
                                    :
                                    <Button icon {... pathInfo.active ? {primary:true} : null} onClick={()=>onChangePath(pathInfo.fullname)}>
                                        <Icon name={pathInfo.type} />
                                        {pathInfo.name}
                                    </Button>
                                }

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
                                    file ? 
                                    <List.Item
                                        key={file.name}
                                        onClick={file.active ? () => onValidate(file.name) : () => onChangeSelect(file.name)}
                                        className={classNames({ FileSelectActive: file.active })}
                                    >
                                        <List.Icon name={file.type} />
                                        <List.Content>{file.name}</List.Content>
                                    </List.Item>
                                    :
                                    <List.Item>&nbsp;</List.Item>
                                    )
                            }
                        </List>
                    </Segment>
                )
            }
        </Segment.Group>
    </div>
}

FileSelect.propTypes = {
    path: PropTypes.arrayOf(
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
    onChangePath: PropTypes.func.isRequired,
    onChangeSelect: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
};

FileSelect.defaultProps = {
    path: [],
    fileGroups: [[]],
};

export default FileSelect;