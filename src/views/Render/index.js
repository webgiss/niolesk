import Internal from './Render'
import { useDispatch, useSelector } from 'react-redux'
import { diagramHasError } from '../../actions/editor'

const Render = () => {
    const dispatch = useDispatch();
    const diagramUrl= useSelector((state) => state.editor.diagramUrl)
    const diagramEditUrl= useSelector((state) => state.editor.diagramEditUrl)
    const diagramError = useSelector((state) => state.editor.diagramError)
    const onDiagramError = (url) => dispatch(diagramHasError(url))

    return <Internal {...{ diagramUrl, diagramEditUrl, diagramError, onDiagramError }} />
}

export default Render;