import exampleData from '../examples/data';

const krokiInfo = exampleData.filter(example => example.default).reduce((previous, current) => {
    previous[current.diagramType] = { name: current.title, example: current.example, language: current.language }
    return previous;
}, {});

export default krokiInfo;