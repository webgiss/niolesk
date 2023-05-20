import Internal from './Render'
import { useDispatch, useSelector } from 'react-redux'
import { diagramHasError, onRenderEditSizeChanged } from '../../actions/editor'
import { useEffect, useRef } from 'react';

const Render = () => {
    const dispatch = useDispatch();
    const prevRedrawIndexRef = useRef()

    const diagramUrl = useSelector((state) => state.editor.diagramUrl)
    const diagramImage = useSelector((state) => state.editor.diagramImage)
    const diagramEditUrl = useSelector((state) => state.editor.diagramEditUrl)
    const diagramError = useSelector((state) => state.editor.diagramError)
    const onDiagramError = (url) => dispatch(diagramHasError(url))

    const height = useSelector((state) => state.editor.renderHeight);
    const width = useSelector((state) => state.editor.renderWidth);
    const onEditSizeChanged = (width, height) => dispatch(onRenderEditSizeChanged(width, height))
    const redrawIndex = useSelector((state) => state.editor.redrawIndex)
    const shouldRedraw = useSelector((state) => state.editor.redrawIndex !== prevRedrawIndexRef.current)
    useEffect(() => {
        prevRedrawIndexRef.current = redrawIndex
    }, [redrawIndex])

    return <Internal {...{ diagramUrl, diagramImage, diagramEditUrl, diagramError, onDiagramError, height, width, onEditSizeChanged, shouldRedraw }} />
}

export default Render;