import { openExamples } from '../../actions/example'
import { openImportUrl, keyPressed, onWindowResized, changeZenMode } from '../../actions/editor'
import { useDispatch, useSelector } from 'react-redux'
import Internal from './App'
import WindowExampleCards from '../WindowExampleCards'

const App = () => {
    const zenMode = useSelector((state) => state.editor.zenMode)
    const dispatch = useDispatch();
    const onExamples = () => dispatch(openExamples());
    const onImportUrl = () => dispatch(openImportUrl());
    const onKey = (keyInfo) => dispatch(keyPressed(keyInfo));
    const onResize = (width, height) => dispatch(onWindowResized(width, height));
    const onSetZenMode = () => dispatch(changeZenMode(true));

    window.dispatch = dispatch

    return Internal({ onExamples, onImportUrl, zenMode, onKey, onResize, onSetZenMode });

}

export default App;
