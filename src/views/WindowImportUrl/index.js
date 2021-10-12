import { useDispatch, useSelector } from 'react-redux'
import Internal from './WindowImportUrl'
import { importUrl, closeImportUrl, updateUrl } from '../../actions/editor';

const WindowImportUrl = () => {
    const dispatch = useDispatch();
    
    const onClose = () => dispatch(closeImportUrl());
    const open = useSelector((state) => state.editor.windowImportUrlOpened)
    const url = useSelector((state) => state.editor.windowImportUrl)
    const onImportUrl = (url) => dispatch(importUrl(url));
    const onUrlChange = (url) => dispatch(updateUrl(url));

    return <Internal {...{ open, onClose, onImportUrl, onUrlChange, url }} />
}

export default WindowImportUrl;