import { openExamples } from '../../actions/example'
import { openImportUrl, keyPressed, onWindowResized, changeZenMode, togglePanZoom } from '../../actions/editor'
import { useDispatch, useSelector } from 'react-redux'
import Internal from './App'

const App = () => {
    const zenMode = useSelector((state) => state.editor.zenMode)
    const dispatch = useDispatch();
    const onExamples = () => dispatch(openExamples());
    const onImportUrl = () => dispatch(openImportUrl());
    const onKey = (keyInfo) => dispatch(keyPressed(keyInfo));
    const onResize = (width, height) => dispatch(onWindowResized(width, height));
    const onSetZenMode = () => dispatch(changeZenMode(true));
    const onTogglePanZoom = () => dispatch(togglePanZoom(true));

    return Internal({ onExamples, onImportUrl, zenMode, onKey, onResize, onSetZenMode, onTogglePanZoom });

}

export default App;
