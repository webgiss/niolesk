import Internal from './RenderUrl'
import { renderUrlChanged } from '../../actions/editor';
import { useDispatch, useSelector } from 'react-redux'

const RenderUrl = () => {
    const dispatch = useDispatch();
    const renderUrl = useSelector((state) => state.editor.renderUrl)
    const renderUrlChangedAction = (renderUrl) => dispatch(renderUrlChanged(renderUrl))
    return <Internal {...{ renderUrl, renderUrlChanged: renderUrlChangedAction }}/>
}

export default RenderUrl;