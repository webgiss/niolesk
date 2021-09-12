import { useDispatch, useSelector } from 'react-redux'
import { diagramTypeChanged } from '../../actions/editor';
import Internal from './DiagramType'

const DiagramType = () => {
    const dispatch = useDispatch();
    const diagramTypes  = useSelector((state)=> state.editor.diagramTypes)
    const diagramType = useSelector((state) => state.editor.diagramType)
    const onDiagramTypeChanged = (diagramType) => dispatch(diagramTypeChanged(diagramType))
    return <Internal {...{ diagramType, diagramTypes, onDiagramTypeChanged }} />
}

export default DiagramType;