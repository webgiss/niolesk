import { useDispatch, useSelector } from 'react-redux'
import { createKrokiUrl } from '../../kroki/utils';
import Internal from './ExampleCards'
import {viewExample,importExample } from '../../actions/example'
import { decode } from '../../kroki/coder';

const ExampleCards = () => {
    const dispatch = useDispatch();
    const examples = useSelector((state)=> state.example.examples)
    const renderUrl = useSelector((state) => state.editor.renderUrl)
    
    const cards = examples.map((example, index)=>({
        diagType: example.title,
        description: example.description,
        diagUrl: createKrokiUrl(renderUrl, example.diagramType, 'svg', example.example),
        onView: () => dispatch(viewExample(index)),
        onImport: () => dispatch(importExample(decode(example.example), example.diagramType)),
    }))

    return <Internal {...{ cards }} />
}

export default ExampleCards;