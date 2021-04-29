import { connect } from 'react-redux'
import Render from './Render'

const mapStateToProps = (state) => {
    return {
        diagramUrl: state.editor.diagramUrl,
        diagramEditUrl: state.editor.diagramEditUrl,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Render);