import { openExamples } from '../../actions/example'
import { openImportUrl } from '../../actions/editor'
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Internal from './App'

const App = () => {
    // const opened = useSelector((state) => state.example.opened)
    const dispatch = useDispatch();
    const onExamples = () => dispatch(openExamples());
    const onImportUrl = () => dispatch(openImportUrl());

    return Internal({ onExamples, onImportUrl });

}

export default App;
