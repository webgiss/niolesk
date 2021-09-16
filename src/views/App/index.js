import { openExamples } from '../../actions/example'
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Internal from './App'

const App = () => {
    // const opened = useSelector((state) => state.example.opened)
    const dispatch = useDispatch();
    const onExamples = () => dispatch(openExamples());

    return Internal({ onExamples });

}

export default App;
