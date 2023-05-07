import actions from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import Internal from './FileStatus'

const FileStatus = () => {
    const dispatch = useDispatch();
    // const data  = useSelector((state)=> state.reducerName.data)
    // const onEvent = (input) => dispatch(eventRaised(input))
    return <Internal {...{ }} />
}

export default FileStatus;