import { useDispatch, useSelector } from 'react-redux'
import Internal from './WindowExampleDetail'
import { closeExample, importExample } from '../../actions/example';
import { decode } from '../../kroki/coder';

const WindowExampleDetail = () => {
    const dispatch = useDispatch();
    const examples = useSelector((state)=> state.example.examples)
    const exampleIndex = useSelector((state)=> state.example.exampleIndex)
    
    const onClose = () => dispatch(closeExample());
    const onImport = () => dispatch(importExample(decode(examples[exampleIndex].example), examples[exampleIndex].diagramType));
    const open = useSelector((state) => state.example.windowExampleDetailsOpened)
    return <Internal {...{ open, onClose, onImport }} />
}

export default WindowExampleDetail;