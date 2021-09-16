import { changeExampleIndex } from '../../actions/example'
import { useDispatch, useSelector } from 'react-redux'
import { decode } from "../../kroki/coder";
import Internal from './ExampleDetail'
import { createKrokiUrl } from '../../kroki/utils';

const ExampleDetail = () => {
    const dispatch = useDispatch();
    const examples = useSelector((state) => state.example.examples)
    const items = examples.map((example) => [example.title, example.description])
    const renderUrl = useSelector((state) => state.editor.renderUrl)

    let itemIndex = useSelector((state) => state.example.exampleIndex);
    console.log('ExampleDetail', { itemIndex, examples })
    if (itemIndex < 0 || itemIndex >= examples.length) {
        itemIndex = 0;
    }

    const diagramType = examples[itemIndex].diagramType;
    const description = examples[itemIndex].description;
    const codedDiagramTextText = examples[itemIndex].example;
    const doc = examples[itemIndex].doc;
    const diagramText = decode(codedDiagramTextText);
    const diagUrl = createKrokiUrl(renderUrl, diagramType, 'svg', codedDiagramTextText);
    const onSelectItem = (index) => dispatch(changeExampleIndex(index))

    return <Internal {...{ diagramType, description, diagUrl, diagramText, items, itemIndex, onSelectItem, doc }} />
}

export default ExampleDetail;