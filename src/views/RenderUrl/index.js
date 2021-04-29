import { connect } from 'react-redux'
import RenderUrl from './RenderUrl'
import { renderUrlChanged } from '../../actions/editor';

const mapStateToProps = (state) => {
    return {
        renderUrl: state.editor.renderUrl,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderUrlChanged: (renderUrl) => dispatch(renderUrlChanged(renderUrl)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderUrl);