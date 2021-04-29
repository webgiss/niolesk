// import actions from '../../actions'
import { connect } from 'react-redux'
import { diagramTypeChanged } from '../../actions/editor';
import DiagramType from './DiagramType'

const mapStateToProps = (state) => {
    return {
        diagramTypes : state.editor.diagramTypes,
        diagramType: state.editor.diagramType,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDiagramTypeChanged: (diagramType) => dispatch(diagramTypeChanged(diagramType)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagramType);