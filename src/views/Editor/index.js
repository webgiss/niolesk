import { connect } from 'react-redux'
import Editor from './Editor'
import { diagramChanged } from '../../actions/editor';

const mapStateToProps = (state) => {
    return {
        text: state.editor.diagramText,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTextChanged: (text) => dispatch(diagramChanged(text)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);