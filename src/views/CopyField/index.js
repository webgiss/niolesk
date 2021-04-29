import { copyButtonHovered, copyText } from '../../actions/editor'
import { connect } from 'react-redux'
import CopyField from './CopyField'

const mapStateToProps = (state, ownProps) => {
    const { scope } = ownProps;
    const { diagramEditUrl, diagramUrl } = state.editor;
    let text = 'poide';
    switch (scope) {
        case 'image': text = diagramUrl; break;
        case 'edit': text = diagramEditUrl; break;
        case 'markdown': text = `![Diagram](${diagramUrl})\n\n[Edit this diagram](${diagramEditUrl})\n`; break;
        default:
            text = '';
    }
    return {
        text,
        scope: scope,
        isCopyHover: state.editor.scopes[scope].isHover,
        isCopied: state.editor.scopes[scope].isCopied,
        isMultiline: scope === 'markdown',
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCopyHover: (scope, isHover) => dispatch(copyButtonHovered(scope, isHover)),
        onCopy: (scope, text) => dispatch(copyText(scope, text))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyField);