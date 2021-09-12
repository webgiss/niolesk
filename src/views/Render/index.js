import Internal from './Render'
import { useSelector } from 'react-redux'

const Render = () => {
    const diagramUrl= useSelector((state) => state.editor.diagramUrl)
    const diagramEditUrl= useSelector((state) => state.editor.diagramEditUrl)
    return <Internal {...{ diagramUrl, diagramEditUrl }} />
}

export default Render;