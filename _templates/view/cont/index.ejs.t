---
to: src/views/<%= name %>/index.js
---
import actions from '../../actions'
import { connect } from 'react-redux'
import <%= name %> from './<%= name %>'

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= name %>);