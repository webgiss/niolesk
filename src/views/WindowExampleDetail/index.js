import { useDispatch, useSelector } from 'react-redux'
import Internal from './WindowExampleDetail'
import { closeExample, importExample, prevExample, nextExample } from '../../actions/example';
import { decode } from '../../kroki/coder';

const WindowExampleDetail = () => {
    const dispatch = useDispatch();
    const examples = useSelector((state)=> state.example.examples)
    const exampleIndex = useSelector((state)=> state.example.exampleIndex)
    
    const onClose = () => dispatch(closeExample());
    const onImport = () => dispatch(importExample(decode(examples[exampleIndex].example), examples[exampleIndex].diagramType));
    const open = useSelector((state) => state.example.windowExampleDetailsOpened)
    const onPrevExample = () => dispatch(prevExample());
    const onNextExample = () => dispatch(nextExample());
    return <Internal {...{ open, onClose, onImport, onPrevExample, onNextExample }} />
}

export default WindowExampleDetail;