import { copyButtonHovered, copyText } from '../../actions/editor'
import { useDispatch, useSelector } from 'react-redux'
import Internal from './CopyField'

const CopyField = ({ scope }) => {
    const diagramEditUrl = useSelector((state) => state.editor.diagramEditUrl)
    const diagramUrl = useSelector((state) => state.editor.diagramUrl)
    let text = '';
    switch (scope) {
        case 'image': text = diagramUrl; break;
        case 'edit': text = diagramEditUrl; break;
        case 'markdown': text = `![Diagram](${diagramUrl})\n\n[Edit this diagram](${diagramEditUrl})\n`; break;
        default:
    }
    const isMultiline = scope === 'markdown';
    const isCopyHover = useSelector((state) => state.editor.scopes[scope].isHover)
    const isCopied = useSelector((state) => state.editor.scopes[scope].isCopied)
    const dispatch = useDispatch();
    const onCopyHover = (scope, isHover) => dispatch(copyButtonHovered(scope, isHover));
    const onCopy = (scope, text) => dispatch(copyText(scope, text));

    return Internal({ text, scope, isCopyHover, isCopied, isMultiline, onCopyHover, onCopy });
}

export default CopyField;
