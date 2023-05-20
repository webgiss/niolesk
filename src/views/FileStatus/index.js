import { useDispatch, useSelector } from 'react-redux'
import Internal from './FileStatus'
import { setFile } from '../../actions/editor';

const FileStatus = () => {
    const dispatch = useDispatch();
    // const data  = useSelector((state)=> state.reducerName.data)
    // const onEvent = (input) => dispatch(eventRaised(input))

    const path  = useSelector((state)=> state.editor.fullFilenamePath)
    const sourceStatus = useSelector((state)=> state.editor.diagramSourceStatus)
    const renderStatus = useSelector((state)=> state.editor.diagramImageStatus)
    const diagramStatus = useSelector((state)=> state.editor.diagramDiskStatus)
    const onCloseFile = () => dispatch(setFile(null))

    return <Internal {...{ path, sourceStatus, renderStatus, diagramStatus, onCloseFile }} />
}

export default FileStatus;