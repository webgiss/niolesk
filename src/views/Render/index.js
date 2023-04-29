import Internal from './Render'
import { useDispatch, useSelector } from 'react-redux'
import { diagramHasError, onRenderEditSizeChanged } from '../../actions/editor'

const Render = () => {
    const dispatch = useDispatch();
    const diagramUrl= useSelector((state) => state.editor.diagramUrl)
    const diagramEditUrl= useSelector((state) => state.editor.diagramEditUrl)
    const diagramError = useSelector((state) => state.editor.diagramError)
    const onDiagramError = (url) => dispatch(diagramHasError(url))

    const height = useSelector((state) => state.editor.renderHeight);
    const width = useSelector((state) => state.editor.renderWidth);
    const onEditSizeChanged = (width, height) => dispatch(onRenderEditSizeChanged(width, height))

    return <Internal {...{ diagramUrl, diagramEditUrl, diagramError, onDiagramError , height, width, onEditSizeChanged }} />
}

export default Render;