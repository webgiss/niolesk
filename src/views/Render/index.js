import Internal from './Render'
import { useDispatch, useSelector } from 'react-redux'
import { diagramHasError, changeTool, changeValue, setTextHeight } from '../../actions/editor'

const Render = () => {
    const dispatch = useDispatch();
    const diagramUrl = useSelector((state) => state.editor.diagramUrl)
    const diagramEditUrl = useSelector((state) => state.editor.diagramEditUrl)
    const diagramError = useSelector((state) => state.editor.diagramError)
    const onDiagramError = (url) => dispatch(diagramHasError(url))

    const use_pan_zool = useSelector((state) => state.editor.pan_zoom_use)
    const tool = useSelector((state) => state.editor.pan_zoom_tool)
    const value = useSelector((state) => state.editor.pan_zoom_value)
    const onChangeTool = (tool) => dispatch(changeTool(tool))
    const onChangeValue = (value) => dispatch(changeValue(value))

    const zenMode = useSelector((state) => state.editor.zenMode);
    const height = useSelector((state) => state.editor.editorHeight);
    const textHeight = useSelector((state) => state.editor.textHeight);
    const diagramHeight = height - textHeight - 2;
    const changeTextHeight = (height) => dispatch(setTextHeight(height))

    return <Internal {...{ diagramUrl, diagramEditUrl, diagramError, onDiagramError, zenMode, height, textHeight, diagramHeight, use_pan_zool, changeTextHeight, tool, value, onChangeTool, onChangeValue }} />
}

export default Render;